import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import "./ContactAdd.css";
import axios from "axios";
export default function ContactAdd(props) {
  const [inputs, setInputs] = useState({});

  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function ContactPost() {
    axios
      .post("http://localhost:5000/api/jobtracker/addContact", inputs, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then(() => {
        window.alert("Contact Added Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  return (
    <Modal
      className="contactAdd"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="contactAddForm">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Contact Details
        </h1>
        <div className="inputboxes m-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Name"
              type="text"
              name="name"
              value={inputs.name}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Designation"
              type="text"
              name="designation"
              value={inputs.designation}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Email"
              type="email"
              name="email"
              value={inputs.email}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Mobile"
              type="text"
              name="phoneno"
              value={inputs.phoneno}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Location"
              type="text"
              name="location"
              value={inputs.location}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="LinkedIn Url"
              type="text"
              name="linkedin"
              value={inputs.linkedin}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Github Url"
              type="text"
              name="github"
              value={inputs.github}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Portfolio Url"
              type="text"
              name="portfolio"
              value={inputs.portfolio}
              textHandler={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit" onClick={() => ContactPost()} />
          </div>
        </div>
      </form>
    </Modal>
  );
}
