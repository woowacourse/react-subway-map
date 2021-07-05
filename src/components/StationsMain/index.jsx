import React from "react";
import Main from "../@shared/Main";
import StationsForm from "../StationsForm";
import StationsList from "../StationsList";

const StationsMain = () => (
  <Main className="relative">
    <section className="relative pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        지하철 역 관리
      </h2>
      <StationsForm />
    </section>
    <StationsList />
  </Main>
);

export default StationsMain;
