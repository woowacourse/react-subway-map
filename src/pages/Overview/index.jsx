import React from "react";
import Loading from "../../components/@shared/Loading";
import Main from "../../components/@shared/Main";

const Overview = () => (
  <>
    <Loading isLoading={false} />
    <Main>
      <section className="flex flex-col flex-wrap pb-8 px-4 w-144 border-t-8 border-yellow-300 rounded-sm shadow-md overflow-x-auto">
        <h2 className="text-start mb-4 mt-6 p-4 text-gray-700 text-2xl font-medium">
          전체 보기
        </h2>
        <div className="flex flex-col">
          <ul className="flex h-20">
            <div className="-mr-1 pl-3 w-16 h-6 text-white bg-line2 rounded-xl">
              2호선
            </div>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line2">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line2 rounded-full" />
              <span className="mt-1">성수</span>
              <span className="absolute -mt-6 ml-10 text-gray-400 text-xs">
                10km
              </span>
            </li>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line2">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line2 rounded-full" />
              <span className="mt-1">잠실</span>
              <span className="absolute -mt-6 ml-10 text-gray-400 text-xs">
                10km
              </span>
            </li>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line2">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line2 rounded-full" />
              <span className="mt-1">잠실</span>
              <span className="absolute -mt-6 ml-10 text-gray-400 text-xs">
                10km
              </span>
            </li>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line2">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line2 rounded-full" />
              <span className="mt-1">잠실</span>
              <span className="absolute -mt-6 ml-10 text-gray-400 text-xs">
                10km
              </span>
            </li>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line2">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line2 rounded-full" />
              <span className="mt-1">잠실</span>
            </li>
            <div className="-ml-1 pl-3 w-16 h-6 text-white bg-line2 rounded-xl">
              2호선
            </div>
          </ul>

          <ul className="flex h-20">
            <div className="-mr-1 pl-3 w-16 h-6 text-white bg-line8 rounded-xl">
              8호선
            </div>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line8">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line8 rounded-full" />
              <span className="mt-1">몽촌토성</span>
            </li>
            <li className="relative flex flex-col items-center mt-2 pt-2 w-20 h-2 bg-line8">
              <div className="absolute -my-3 mx-0.5 w-4 h-4 bg-white border-2 border-line8 rounded-full" />
              <span className="mt-1">잠실</span>
            </li>

            <div className="-ml-1 pl-3 w-16 h-6 text-white bg-line8 rounded-xl">
              8호선
            </div>
          </ul>
        </div>
      </section>
    </Main>
  </>
);

export default Overview;
