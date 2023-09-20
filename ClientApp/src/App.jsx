import React from "react";
import TopNavBar from "./components/topNavBar";
import SideNavBar from "./components/sideNavBar";
import GridComponent from "./components/grid";

const App = () => (
  <div className="container-fluid">
    <TopNavBar />
    <div className="container-fluid page-wrapper">
      <div className="row flex-nowrap">
        <SideNavBar />
        <GridComponent />
      </div>
    </div>
  </div>
);

export default App;
