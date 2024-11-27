import React from "react";
import { useState } from "react";
import JobActivityEdit from "../JobActivityEdit/JobActivityEdit";
export default function JobActivityCard(props) {
  const jobInfo = props.data;
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div className="flex flex-wrap " key={jobInfo._id}>
      <div className="block p-6 rounded-lg shadow-lg bg-white w-max">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {jobInfo.title}
        </h5>
        <p className="text-gray-700 text-base mb-4">{jobInfo.company}</p>
        <button
          type="button"
          className=" inline-block px-6 py-2.5 bg-pink-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => setModalOpen(true)}
        >
          Open
        </button>
      </div>
      {isModalOpen ? (
        <JobActivityEdit data={jobInfo} setModalOpen={setModalOpen} />
      ) : null}
    </div>
  );
}
