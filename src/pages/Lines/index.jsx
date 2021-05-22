import React from "react";
import Main from "../../components/@shared/Main";
import Modal from "../../components/@shared/Modal";
import Button from "../../components/@shared/Button";
import FloatingLabelInput from "../../components/@shared/FloatingLabelInput";
import Select from "../../components/@shared/Select";
import ColorSelect from "../../components/ColorSelect";

const Lines = () => (
  <>
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
    <Modal>
      <form className="flex flex-col items-center px-4 py-12 w-144 bg-white rounded-lg shadow-2xl">
        <h2 className="mb-4 pb-6 text-center text-2xl">노선 생성</h2>

        <FloatingLabelInput type="text" id="line-name" label="노선이름" />

        <div className="flex mx-4 my-10 w-full">
          <Select>
            <option>상행종점</option>
            <option>강남역</option>
            <option>잠실역</option>
          </Select>
          <span className="mx-6 text-gray-400 text-3xl">⬌</span>
          <Select>
            <option>하행종점</option>
            <option>신도림역</option>
            <option>왕십리역</option>
          </Select>
        </div>

        <FloatingLabelInput type="number" id="line-distance" label="거리" />

        <span className="m-6 text-gray-400">노선 색상을 선택해주세요.</span>
        <ColorSelect />
        <div className="flex items-center">
          <span className="m-6 text-gray-400">선택된 색상: </span>
          <button
            type="button"
            className="w-6 h-6 bg-gray-300 rounded-full"
            aria-label="selected-color-button"
          />
        </div>
        <Button type="submit" size="full">
          생성
        </Button>
      </form>
    </Modal>
  </>
);

export default Lines;
