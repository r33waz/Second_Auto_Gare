import React from "react";
import Display from "../../components/common/display";
import SideNav from "../../components/common/SlideNav";

function Dashboard() {
  return (
    <>
      <div className="flex w-full">
        <SideNav />
        <div className=" w-full">
          <Display />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
