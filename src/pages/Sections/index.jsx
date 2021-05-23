import React from "react";
import Main from "../../components/@shared/Main";
import Modal from "../../components/@shared/Modal";
import Select from "../../components/@shared/Select";
import Button from "../../components/@shared/Button";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";

const Sections = () => (
  <>
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
    <Modal>
      <form className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl">
        <h2 className="mb-4 pb-6 text-center text-2xl">구간 추가</h2>

        <Select>
          <option hidden>노선 선택</option>
          <option>신분당선</option>
          <option>1호선</option>
        </Select>

        <div className="flex mx-4 my-10 w-full">
          <Select>
            <option hidden>상행역</option>
            <option>강남역</option>
            <option>잠실역</option>
          </Select>
          <span className="mx-6 text-gray-400 text-3xl">⬌</span>
          <Select>
            <option hidden>하행역</option>
            <option>신도림역</option>
            <option>왕십리역</option>
          </Select>
        </div>

        <FloatingLabelInput type="number" id="line-distance" label="거리" />

        <div className="flex justify-end mr-4 mt-14 w-full space-x-4">
          <Button type="button" size="medium" theme="secondary">
            취소
          </Button>
          <Button type="submit" size="medium">
            확인
          </Button>
        </div>
      </form>
    </Modal>
  </>
);

export default Sections;
