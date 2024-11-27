import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../assets/img/19873.jpg";
// import Navbar from "../components/Navbar.js";
export default function Login() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let url = "http://localhost:5000/api/auth/createuser";
    if (credentials.password === credentials.repassword) {
      let options = {
        method: "POST",
        url: url,
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        },
      };
      let response = await axios(options);
      let responseOK =
        response && response.status === 200 && response.statusText === "OK";
      let responseNotOK =
        response &&
        response.status === 400 &&
        response.statusText === "Bad Request";
      if (responseOK) {
        let data = await response.data;

        localStorage.setItem("token", data.authtoken);
        navigate("/activities");
        if (localStorage.getItem("token")) {
          await axios.post(
            "http://localhost:5000/api/jobtracker/adduser",
            {
              name: credentials.name,
              mobileno: "",
              designation: "",
              working: "",
              about: "",
              location: "",
              email:""
            },
            {
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            }
          );
        }
      }
      if (responseNotOK) {
        alert("Invalid credentials");
      }
    } else {
      alert("Enter the correct password");
    }
  };

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <section className="absolute w-full h-full">
          <div
            className=" absolute w-full h-full opacity-00 bg-gray-900"
            style={{
              backgroundImage: `url(${bg})`,
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container mx-auto px-10 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-5/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        {/* Sign up with */}
                      </h6>
                    </div>
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={handleSubmit}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Full Name"
                          value={credentials.name}
                          onChange={onChange}
                          id="name"
                          name="name"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          value={credentials.email}
                          onChange={onChange}
                          id="email"
                          name="email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          value={credentials.password}
                          onChange={onChange}
                          name="password"
                          id="password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          value={credentials.repassword}
                          onChange={onChange}
                          name="repassword"
                          id="repassword"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          value="register"
                          style={{ transition: "all .15s ease" }}
                        >
                          Register
                        </button>
                        <a href="/Login" className="text-Black-300 font-bold ">
                          Already have an account? Login
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
