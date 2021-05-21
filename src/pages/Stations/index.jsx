import React from "react";
import Main from "../../components/Main";
import Button from "../../components/Button/index";
import FloatingLabelInput from "../../components/FloatingLabelInput";

const Stations = () => (
  <Main>
    <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        지하철 역 관리
      </h2>
      <form className="flex px-8 w-full space-x-4">
        <FloatingLabelInput
          id="station-name"
          type="text"
          label="지하철 역 이름을 입력해주세요."
        />
        <Button type="submit" size="medium">
          추가
        </Button>
      </form>
    </section>
    <section className="pb-8 w-144 rounded-sm shadow-md">
      <div>
        <ul>
          <li>
            <span>강남역</span>
            <span>🗑</span>
          </li>
          <li>
            <span>서초역</span>
            <span>🗑</span>
          </li>
        </ul>
      </div>
    </section>
  </Main>
);

export default Stations;
