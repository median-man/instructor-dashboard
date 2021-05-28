import * as idb from "idb-keyval";
import * as bcsApi from "./bcsApi";
import pick from "lodash/pick";
import jwtDecode from "jwt-decode";

const BCS_DB_NAMESPACE = "bcs";
const bcsDbKey = (key) => `${BCS_DB_NAMESPACE}:${key}`;

const db = {
  set(key, val) {
    return idb.set(bcsDbKey(key), val);
  },
  get(key) {
    return idb.get(bcsDbKey(key));
  },
  del(key) {
    return idb.del(bcsDbKey(key));
  },
  async clear() {
    const keys = await idb.keys();
    if (!keys) return 0;
    const bcsKeyRe = new RegExp(`^${BCS_DB_NAMESPACE}:`);
    const delManyPromise = keys
      .filter((key) => bcsKeyRe.test(key))
      .map((key) => idb.del(key));
    await Promise.all(delManyPromise);
    return delManyPromise.length;
  },
};

export const token = () => db.get("token");

// Unix ts in MS of the token exp.
export const tokenExpAt = async () => {
  const authToken = await token();
  if (!authToken) {
    return -1;
  }
  const { minutesTimeout, creationTime } = jwtDecode(token);
  return minutesTimeout * 60 * 1000 + Date.parse(creationTime);
};

export const isLoggedIn = async () => {
  try {
    return (await tokenExpAt()) > Date.now();
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const signOut = () => db.clear();

export const login = async ({ email, password }) => {
  try {
    const { errorCode, authenticationInfo } = await bcsApi.login({
      email,
      password,
    });
    if (errorCode) {
      throw new Error(errorCode);
    }
    await db.set("token", authenticationInfo.authToken);
    return { result: true };
  } catch (error) {
    await db.del("token");
    return { error };
  }
};

export const cohorts = async () => {
  try {
    const authToken = await token();
    if (!authToken) {
      throw new Error("You must be logged in to access cohorts.");
    }
    let result = await db.get("cohorts");
    if (result) {
      return { result };
    }
    const { Enrollments: enrollments } = await bcsApi.me({ authToken });
    if (!enrollments) {
      throw new Error("You don't have any cohorts.");
    }
    result = enrollments.map((enrollment) => {
      const enrollmentId = enrollment.id;
      const { name, startDate, endDate, id: courseId } = enrollment.course;
      return { name, startDate, endDate, courseId, enrollmentId };
    });
    db.set("cohorts", result);
    return { result };
  } catch (error) {
    if (error.status === 401) {
      error.message = "You must login.";
      await signOut();
    }
    return { error };
  }
};

export const students = async ({ cohortId }) => {
  try {
    const authToken = await token();
    if (!authToken) {
      throw new Error("You must be logged in to access cohorts.");
    }
    let result = await db.get(`students:${cohortId}`);
    if (result) {
      return { result };
    }
    const enrollmentId = parseInt(cohortId);
    const [sessions, assignments] = await Promise.all([
      bcsApi.sessions({
        authToken,
        enrollmentId,
      }),
      bcsApi.assignments({
        authToken,
        enrollmentId,
      }),
    ]);
    const studentMap = new Map();

    // fetch session details for each session to compile the attendance of each student
    const academicSess = sessions.calendarSessions
      .filter((session) => session.context.contextCode === "academic")
      .map((session) => session.session.id);

    const sessionDetails = await Promise.all(
      academicSess.map((sessionId) =>
        bcsApi.sessionDetail({ authToken, sessionId })
      )
    );

    // populate studentAttendance with students and attendance data.
    sessionDetails.forEach((sessDetails) => {
      sessDetails.students.forEach((stuDetails) => {
        const key = stuDetails.student.id;
        let student = studentMap.get(key);
        if (!student) {
          student = pick(stuDetails.student, [
            "id",
            "email",
            "firstName",
            "lastName",
            "active",
          ]);
          student.attendance = [];
          student.totalAbsent = 0;
          student.excusedAbsent = 0;
          student.grades = [];
          studentMap.set(key, student);
        }

        const attendance = {
          absent: !!stuDetails.absence,
          startTime: sessDetails.session.session.startTime,
          excused: stuDetails.absence?.excused || false,
        };
        if (attendance.absent && attendance.excused) {
          student.excusedAbsent += 1;
        }
        if (attendance.absent) {
          student.totalAbsent += 1;
        }
        student.attendance.push(attendance);
      });
    });

    // fetch assignment details to compile homework records for each student
    const requiredAssignmentIds = assignments.calendarAssignments
      .filter((assignment) => assignment.required)
      .map((assignment) => assignment.id);

    const assignmentDetails = await Promise.all(
      requiredAssignmentIds.map((assignmentId) =>
        bcsApi.assignmentDetail({ authToken, assignmentId })
      )
    );

    assignmentDetails.forEach((assDetail) => {
      const assignment = pick(assDetail.assignment, [
        "id",
        "dueDate",
        "effectiveDueDate",
        "title",
      ]);
      assignment.type = /project/i.test(assignment.title)
        ? "project"
        : "homework";

      assDetail.students.forEach((student) => {
        const { id } = student.student;
        const letterGrade = student.grade?.grade;
        const grade = {
          assignment,
          status: letterGrade
            ? "graded"
            : student.submission
            ? "ungraded"
            : "not_submitted",
          mark: letterGrade || "",
        };
        const studentRecord = studentMap.get(id);
        studentRecord.grades.push(grade);
      });
    });

    await db.set(`students:${cohortId}`, studentMap);

    return { result: studentMap };
  } catch (error) {
    return { error };
  }
};
