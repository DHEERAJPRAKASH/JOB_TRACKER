import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import Button from "../../components/Button";
export default function Documents() {
  const [documents, setDocuments] = useState([]);

  const [file, setFile] = useState();
  function DocPost() {
    const formData = new FormData();
		formData.append('File',file);
    for (var key of formData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    axios
      .post(`http://localhost:5000/api/jobtracker/uploadDoc/${documents.user}`, {
        formData,
        // headers: {
        //   "Content-Type": "application/json",
        //   "auth-token": localStorage.getItem("token"),
        // },
      })
      .then(() => {
        window.alert("Documents Added Successfully");
        window.location.reload();
      });
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:5000/api/jobtracker/getDoc", {
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setDocuments(...res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);
  console.log(documents);
  return (
    <div>
      <Navbar />
      <form className="m-5">
        <label className="w-48 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type="file" name="file" className="hidden" onChange={handleFileChange} />
        </label>
      </form>
      <Button type="submit" onClick={() => DocPost()} name = "Upload" />
    </div>
  );
}
