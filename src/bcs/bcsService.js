import * as idb from "idb-keyval";
import * as bcsApi from "./bcsApi";

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
      const { name, startDate, endDate, id } = enrollment.course;
      return { name, startDate, endDate, id };
    });
    db.set("cohorts", result);
    return { result };
  } catch (error) {
    return { error };
  }
};
