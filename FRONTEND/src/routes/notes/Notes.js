import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import NoteAdd from "./NoteAdd/NoteAdd";
import axios from "axios";
import NotesCard from "./NotesCard";
export default function Notes() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [myNotes, setMyNotes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/jobtracker/notes", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setMyNotes(...res.data);
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
      <div className="notes">
        <button
          className="bg-pink-500 hover:bg-pink-300 text-white font-bold py-2 px-4 border-b-4 border-white-700 hover:border-white-500 m-5 rounded"
          onClick={() => setModalOpen(true)}
        >
          + Add Notes
        </button>
      </div>
      <div className="flex flex-wrap">
        {myNotes.map((note,key) => (
          <div className="m-5" key = {key}>
          <NotesCard note={note}  />
          </div>
        ))}
      </div>

      {isModalOpen ? <NoteAdd setModalOpen={setModalOpen} /> : null}
    </div>
  );
}
