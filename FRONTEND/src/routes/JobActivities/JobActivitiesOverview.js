import React from "react";
import { useState, useEffect } from "react";
import JobActivityCard from "./JobActivityCard/JobActivityCard";
import JobActivityAdd from "./JobActivityAdd/JobActivityAdd";
import Navbar from "../../components/Navbar";
import SelectInputBox from "../../components/SelectInputBox";
import axios from "axios";
const categories = ["Wishlist", "Applied", "Rejected"];

export default function JobActivitiesOverview() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [select, setSelect] = useState();
  const [jobApplications, setJobApplications] = useState([]);

  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/jobtracker/getApplication", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setJobApplications(...res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="JobActivitiesOverview">
        <button
          className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 m-5 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Job
        </button>
        {/* <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <SelectInputBox
            title="Category"
            name="category"
            data={categories}
            value={select}
            textHandler={handleChange}
          />
        </div> */}
        <div className="flex flex-wrap">
          {jobApplications.map((job) => (
            <div className="m-5">
              <JobActivityCard data={job} key={job._id} />
            </div>
          ))}
        </div>
      </div>
      {isModalOpen ? <JobActivityAdd setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
