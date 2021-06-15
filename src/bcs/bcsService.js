import * as idb from "idb-keyval";
import { bcsClient } from "./bcsClient";
import pick from "lodash/pick";

// clear keyval store which could contain sensitive data from previous version
// of the client.
idb
  .keys()
  .then((keys) =>
    keys.filter((key) => /^bcs/.test(key)).forEach((key) => idb.del(key))
  );

export const signOut = () => bcsClient.signOut();

export const isLoggedIn = () => bcsClient.isLoggedIn;

export const login = async ({ email, password }) => {
  try {
    await bcsClient.login(email, password);
    return { result: true };
  } catch (error) {
    signOut();
    return { error };
  }
};

export const cohorts = async () => {
  try {
    if (!bcsClient.isLoggedIn) {
      throw new Error("You must be logged in to access cohorts.");
    }
    const { Enrollments: enrollments } = await bcsClient.me();
    if (!enrollments) {
      throw new Error("You don't have any cohorts.");
    }
    const result = enrollments.map((enrollment) => {
      const enrollmentId = enrollment.id;
      const { name, startDate, endDate, id: courseId } = enrollment.course;
      return { name, startDate, endDate, courseId, enrollmentId };
    });
    return { result };
  } catch (error) {
    if (error.code === 401) {
      error.message = "You must login.";
      signOut();
    }
    return { error };
  }
};

export const students = async ({ enrollmentId }) => {
  try {
    if (!bcsClient.isLoggedIn) {
      throw new Error("You must be logged in to access cohorts.");
    }

    const [sessions, assignments] = await Promise.all([
      bcsClient.sessions(enrollmentId),
      bcsClient.assignments(enrollmentId),
    ]);
    const studentMap = new Map();

    // fetch session details for each session to compile the attendance of each student
    const academicSess = sessions.calendarSessions
      .filter((session) => session.context.contextCode === "academic")
      .map((session) => session.session.id);

    const sessionDetails = await Promise.all(
      academicSess.map((sessionId) => bcsClient.sessionDetail(sessionId))
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
        bcsClient.assignmentDetail(assignmentId)
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

    return { result: studentMap };
  } catch (error) {
    return { error };
  }
};

export const assignments = async ({ enrollmentId }) => {
  try {
    if (!bcsClient.isLoggedIn) {
      throw new Error("You must be logged in to access assignments.");
    }
    const assignments = await bcsClient.assignments(enrollmentId);
    const assignmentDetails = await Promise.all(
      assignments.calendarAssignments
        .filter((a) => a.required)
        .map((a) => bcsClient.assignmentDetail(a.id))
    );
    const gradesFromStudents = (students) => {
      let ungraded = 0;
      let unSubmitted = 0;
      let incomplete = 0;
      let grades = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        f: 0,
      };
      const gradeLetter = (grade) =>
        Object.keys(grades).find((letter) =>
          new RegExp(letter, "i").test(grade.grade)
        );
      students.forEach(({ grade, submission }) => {
        if (!submission) {
          unSubmitted += 1;
          return;
        }
        if (!grade) {
          ungraded += 1;
          return;
        }
        if (grade.grade === "I") {
          incomplete += 1;
          return;
        }
        grades[gradeLetter(grade)] += 1;
      });
      return { ungraded, unSubmitted, incomplete, grades };
    };
    const result = assignmentDetails.map(({ assignment, students }) => {
      return {
        id: assignment.id,
        dueDate: Date.parse(assignment.effectiveDueDate),
        title: assignment.title,
        expectedTotal: students.length,
        ...gradesFromStudents(students),
      };
    });
    return { error: null, result };
  } catch (error) {
    return { error, result: null };
  }
};
