import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../../../components/Button";
import axios from "axios";
import "./NoteEdit.css";
import InputBox from "../../../components/InputBox";
export default function NoteEdit(props) {
  const [inputs, setInputs] = useState({});
  const noteData = props.data;
  const handleChange = (e) =>
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  function NoteDelete() {
    axios
      .delete(
        `http://localhost:5000/api/jobtracker/deleteNote/${noteData._id}`,
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
  function NoteUpdate() {
    axios
      .put(
        `http://localhost:5000/api/jobtracker/updateNote/${noteData._id}`,
        inputs,
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        window.alert("Note Updated Successfully");
        props.setModalOpen(false);
        window.location.reload();
      });
  }
  return (
    <Modal
      className="noteEdit"
      isOpen={true}
      onRequestClose={() => props.setModalOpen(false)}
      ariaHideApp={false}
      overlayClassName="overlay"
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center m-5">
        Note
        <button
          className="inline-flex float-right items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md"
          onClick={() => NoteDelete()}
        >
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
      <div className="noteinputboxes m-7">
        <div className="w-full px-3 mb-6 md:mb-0">
          <InputBox
            title="Title"
            type="text"
            name="title"
            value={inputs.title ? inputs.title : noteData.title}
            textHandler={handleChange}
          />
        </div>
        <div className="w-full ">
          <InputBox
            title="Description"
            name="descriptions"
            rows={10}
            value={
              inputs.descriptions ? inputs.descriptions : noteData.descriptions
            }
            type="text"
            textHandler={handleChange}
          />
        </div>
        <div className="color-picker">
          <input
            type="radio"
            name="color"
            value="pink"
            id="color1"
            onChange={handleChange}
          />
          <label
            htmlFor="color1"
            style={{ backgroundColor: "#F06292" }}
          ></label>
          <input
            type="radio"
            name="color"
            value="purple"
            id="color2"
            onChange={handleChange}
          />
          <label
            htmlFor="color2"
            style={{ backgroundColor: "#BA68C8" }}
          ></label>
          <input
            type="radio"
            name="color"
            value="yellow"
            id="color3"
            onChange={handleChange}
          />
          <label
            htmlFor="color3"
            style={{ backgroundColor: "#FFD54F" }}
          ></label>
          <input
            type="radio"
            name="color"
            value="sky"
            id="color4"
            onChange={handleChange}
          />
          <label
            htmlFor="color4"
            style={{ backgroundColor: "#4FC3F7" }}
          ></label>
          <input
            type="radio"
            name="color"
            value="green"
            id="color5"
            onChange={handleChange}
          />
          <label
            htmlFor="color5"
            style={{ backgroundColor: "#AED581" }}
          ></label>
        </div>
      </div>

      <div className="buttons">
        <div className="m-5">
          <Button name="Cancel" onClick={() => props.setModalOpen(false)} />
        </div>
        <div className="m-5">
          <Button name="Submit" onClick={() => NoteUpdate()} />
        </div>
      </div>
    </Modal>
  );
}
