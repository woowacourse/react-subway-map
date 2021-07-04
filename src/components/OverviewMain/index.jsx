import React from "react";
import Main from "../@shared/Main";
import OverviewList from "../OverviewList";

const OverviewMain = () => (
  <Main className="relative">
    <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        전체 보기
      </h2>
      <OverviewList />
    </section>
  </Main>
);

export default OverviewMain;
