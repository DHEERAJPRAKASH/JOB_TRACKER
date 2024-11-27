import axios from "axios";
import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import InputBox from "../../../components/InputBox";
import "./ProfileEdit.css";
export default function ProfileEdit(props) {
  const profileData = props.data;
  const [inputs, setInputs] = useState({});
  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    function ProfileUpdate() {
      axios
        .put(
          `http://localhost:5000/api/jobtracker/updateuser/${profileData._id}`,
          inputs,
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          window.alert("Profile Updated Successfully");
          props.setModalOpen(false);
          window.location.reload();
        });
    }
  return (
    <Modal
      className="profileEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <form className="profileEditForm" onSubmit={() => ProfileUpdate()}>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
          Profile Details
        </h1>
        <div className="inputboxes m-7">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Name"
              type="text"
              name = "name"
              value={inputs.name ? inputs.name : profileData.name}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Location"
              type="text"
              name = "location"
              value={inputs.location ? inputs.location : profileData.location}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Designation"
              type="text"
              name = "designation"
              value={inputs.designation ? inputs.designation : profileData.designation}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Working"
              type="text"
              name = "working"
              value={inputs.working ? inputs.working : profileData.working}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Email"
              type="email"
              name = "email"
              value={inputs.email ? inputs.email : profileData.email}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="Mobile"
              type="text"
              name = "mobileno"
              value={inputs.mobileno ? inputs.mobileno : profileData.mobileno}
              textHandler={handleChange}
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <InputBox
              title="About"
              type="text"
              name = "about"
              value={inputs.about ? inputs.about : profileData.about}
              textHandler={handleChange}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="m-5">
            <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
          </div>
          <div className="m-5">
            <Button name="Submit"  />
          </div>
        </div>
      </form>
    </Modal>
  );
}
