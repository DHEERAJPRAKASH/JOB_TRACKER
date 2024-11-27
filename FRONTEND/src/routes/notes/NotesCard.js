import React, { useState } from "react";
import NoteEdit from "./NoteEdit/NoteEdit";

export default function NotesCard(props) {
  const note = props.note;
  let bg;
  if (note.color === "pink") {
    bg = "bg-pink-500";
  }
  else if (note.color === "sky") {
    bg = "bg-sky-500";
  }
  else if (note.color === "yellow") {
    bg = "bg-yellow-400";
  }
  else if (note.color === "purple") {
    bg = "bg-purple-500";
  }
  else{
    bg = "bg-green-500";
  }
  const [isModalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <div
        className={`${bg} rounded shadow border p-6 w-64`}
        onClick={() => setModalOpen(true)}
      >
        <div>
          <h5 className="text-white font-bold mb-4 mt-0 text-3xl">
            {note.title}
          </h5>
          <p className="text-gray-700 text-sm">{note.descriptions}</p>
        </div>
      </div>
      {isModalOpen ? (
        <NoteEdit setModalOpen={setModalOpen} data={note} />
      ) : null}
    </div>
  );
}
