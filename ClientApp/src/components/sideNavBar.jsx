import React from "react";

function SideNavBar() {
  return (
    <div className="col-auto col-md-2 col-xl-2 px-sm-2 ">
      <div className="sidebar d-flex flex-column align-items-center align-items-sm-start pt-2 text-dark min-vh-100">
        <button
          className="dropdown-item btn-secondary text-uppercase font-weight-bold py-1 "
          type="button"
        >
          <span className="ri:truck-fill px-2" />
          {"Loads"}
        </button>
      </div>
    </div>
  );
}

export default SideNavBar;
