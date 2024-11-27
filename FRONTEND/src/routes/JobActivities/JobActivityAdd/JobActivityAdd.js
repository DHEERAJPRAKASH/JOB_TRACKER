import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import SelectInputBox from "../../../components/SelectInputBox";
import "./JobActivityAdd.css";
import axios from "axios";
const categories = ["Wishlist", "Applied", "Rejected"];

export default function JobActivityAdd(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  function JobPost() {
    axios
      .post(
        "http://localhost:5000/api/jobtracker/addApplication",
      inputs,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Job Added Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  return (
    <Modal
      className="jobAdd"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <div className="jobAddForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Job Details
        </h1>
        <div className="inputboxes m-7 ">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Company"
              name="company"
              value={inputs.company}
              type="text"
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Job Title"
              name="title"
              value={inputs.title}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Salary"
              name="salary"
              value={inputs.salary}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Location"
              name="location"
              value={inputs.location}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Deadline"
              name="deadline"
              value={inputs.deadline}
              type="date"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Interview"
              name="interviewDate"
              value={inputs.interviewDate}
              type="date"
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Website Url"
              name="urlUsed"
              value={inputs.urlUsed}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Website's UserName"
              name="usernameUsed"
              value={inputs.usernameUsed}
              type="text"
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Website's Password"
              type="text"
              name="pwdUsed"
              value={inputs.pwdUsed}
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <SelectInputBox
              title="Category"
              name="category"
              data={categories}
              value={inputs.category}
              textHandler={handleChange}
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Description"
              name="description"
              value={inputs.description}
              type="text"
              textHandler={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit" onClick={() => JobPost()} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
