import React from "react";
import Main from "../../components/@shared/Main";
import Select from "../../components/@shared/Select";

const Sections = () => (
  <Main>
    <section className="pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
        구간 관리
      </h2>
      <Select>
        <option hidden>노선 선택</option>
        <option>신분당선</option>
        <option>1호선</option>
      </Select>
      <div className="relative">
        <hr className="-mx-4 my-12" />
        <button
          type="button"
          className="absolute -top-7 right-0 w-14 h-14 text-3xl bg-yellow-300 hover:bg-yellow-400 rounded-full focus:outline-none shadow-md"
        >
          +
        </button>
      </div>
      <div className="border rounded-md">
        <h3 className="pl-4 py-2 text-gray-800 text-xl bg-line2 rounded-t-md">
          2호선
        </h3>
        <ul className="py-2 text-gray-600">
          <li className="flex justify-between px-8 py-4">
            <span>강남역</span>
            <button
              type="button"
              className="focus:text-black focus:outline-none focus:opacity-100 opacity-60"
            >
              🗑
            </button>
          </li>
          <li className="flex justify-between px-8 py-4">
            <span>강남역</span>
            <button
              type="button"
              className="focus:text-black focus:outline-none focus:opacity-100 opacity-60"
            >
              🗑
            </button>
          </li>
        </ul>
      </div>
    </section>
  </Main>
);

export default Sections;
