import React from "react";
import Button from "../../components/Button";
import Main from "../../components/Main";

const Lines = () => (
  <Main>
    <section className="pb-8 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md">
      <div className="flex items-center justify-between px-4">
        <h2 className="mb-4 mt-6 p-4 text-center text-gray-700 text-2xl font-medium">
          노선 관리
        </h2>
        <Button type="button" size="medium">
          등록
        </Button>
      </div>
      <ul className="mt-4">
        <li className="flex items-center justify-between mt-5 mx-6 pb-1 text-gray-600 text-xl border-b">
          <div className="flex items-center">
            <span className="block mr-2 w-5 h-5 bg-blue-400 rounded-full" />
            <span>강남역</span>
          </div>
          <Button size="small" type="button" theme="round">
            삭제
          </Button>
        </li>
        <li className="flex items-center justify-between mt-5 mx-6 pb-1 text-gray-600 text-xl border-b">
          <div className="flex items-center">
            <span className="block mr-2 w-5 h-5 bg-blue-400 rounded-full" />
            <span>강남역</span>
          </div>
          <Button size="small" type="button" theme="round">
            삭제
          </Button>
        </li>
        <li className="flex items-center justify-between mt-5 mx-6 pb-1 text-gray-600 text-xl border-b">
          <div className="flex items-center">
            <span className="block mr-2 w-5 h-5 bg-blue-400 rounded-full" />
            <span>강남역</span>
          </div>
          <Button size="small" type="button" theme="round">
            삭제
          </Button>
        </li>
      </ul>
    </section>
  </Main>
);

export default Lines;
