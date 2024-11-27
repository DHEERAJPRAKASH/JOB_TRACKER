import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing.js";
import Login from "./routes/Login.js";
import SignUp from "./routes/SignUp.js";
import Profile from "./routes/Profile/Profile.js";
import JobActivitiesOverview from "./routes/JobActivities/JobActivitiesOverview.js";
import NotesApp from "./routes/notes/Notes.js";
import MyContacts from "./routes/MyContacts/MyContacts.js";
import Documents from "./routes/Documents/Documents.js";
import ProtectedRoute from "./ProtectedRoute";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/activities" element={<JobActivitiesOverview />} />
          <Route path="/notes" element={<NotesApp />} />
          <Route path="/mycontacts" element={<MyContacts />} />
          <Route path="/documents" element={<Documents />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
