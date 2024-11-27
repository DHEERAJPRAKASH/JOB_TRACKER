import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import "./ContactEdit.css";
import axios from "axios";
export default function ContactEdit(props) {
  const contactInfo = props.data;
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function ContactDelete() {
    axios
      .delete(
        `http://localhost:5000/api/jobtracker/deleteContact/${contactInfo._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Note Deleted Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  function ContactUpdate() {
    axios
      .put(
        `http://localhost:5000/api/jobtracker/updateContact/${contactInfo._id}`,
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Contact Updated Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  return (
    <Modal
      className="contactEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="contactForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Contact Details
          <button className="inline-flex float-right items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
          onClick={() => ContactDelete()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </h1>
        <div className="inputboxes m-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Name"
              type="text"
              name="name"
              value={inputs.name ? inputs.name : contactInfo.name}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Designation"
              type="text"
              name="designation"
              value={
                inputs.designation
                  ? inputs.designation
                  : contactInfo.designation
              }
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Email"
              type="email"
              name="email"
              value={inputs.email ? inputs.email : contactInfo.email}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Mobile"
              type="text"
              name="phoneno"
              value={inputs.phoneno ? inputs.phoneno : contactInfo.phoneno}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Location"
              type="text"
              name="location"
              value={inputs.location ? inputs.location : contactInfo.location}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="LinkedIn Url"
              type="text"
              name="linkedin"
              value={inputs.linkedin ? inputs.linkedin : contactInfo.linkedin}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Github Url"
              type="text"
              name="github"
              value={inputs.github ? inputs.github : contactInfo.github}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Portfolio Url"
              type="text"
              name="portfolio"
              value={
                inputs.portfolio ? inputs.portfolio : contactInfo.portfolio
              }
              textHandler={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit" onClick={() => ContactUpdate()} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
