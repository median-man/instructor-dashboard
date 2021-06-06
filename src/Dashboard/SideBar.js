import { useState } from "react";
import { Link, NavLink, useLocation, useRouteMatch } from "react-router-dom";
import { classNamesFromArray } from "../util";

function SideBar({ cohorts, currentCohort }) {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-dark bg-light shadow"
      style={{ width: "13rem" }}
    >
      <div>{currentCohort?.name || "Select Cohort"}</div>
      <hr />
      {currentCohort && (
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              className="nav-link link-dark"
              exact
              to={`/${currentCohort.enrollmentId}`}
            >
              Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              className="nav-link link-dark"
              to={`/${currentCohort.enrollmentId}/assignments`}
            >
              Assignments
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
}

export default SideBar;
