import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";

import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const token = localStorage.getItem("token");
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAuth");
    navigate("/");
  };
  const isAuth = localStorage.getItem("isAuth");
  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative shadow-lg bg-white shadow-lg") +
          " flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className={
                (props.transparent ? "text-white" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              href="/"
            >
              Job Reach
            </a>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-white" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <HashLink
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  scroll={(el) => el.scrollIntoView({ behavior: "smooth" })}
                  to={"/#feedback"}
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />{" "}
                  Contact us
                </HashLink>
              </li>
            </ul>

            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isAuth ? (
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/activities"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    Activities
                  </a>
                </li>
              ) : (
                ""
              )}
              {isAuth ? (
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/documents"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    Documents
                  </a>
                </li>
              ) : (
                ""
              )}

              {isAuth ? (
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/notes"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    Notes
                  </a>
                </li>
              ) : (
                ""
              )}

              {isAuth ? (
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/mycontacts"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg "
                      }
                    />
                    Contacts
                  </a>
                </li>
              ) : (
                ""
              )}

              {isAuth ? (
                <li className="flex items-center">
                  <a
                    className={
                      (props.transparent
                        ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                        : "text-gray-800 hover:text-gray-600") +
                      " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                    }
                    href="/profile"
                  >
                    <i
                      className={
                        (props.transparent
                          ? "lg:text-gray-300 text-gray-500"
                          : "text-gray-500") +
                        " far fa-file-alt text-lg leading-lg mr-2"
                      }
                    />{" "}
                    Profile
                  </a>
                </li>
              ) : (
                ""
              )}

              <li className="flex items-center">
                {token ? (
                  <div className="m-2">
                    <Button name="Logout" onClick={() => logout()} />
                  </div>
                ) : (
                  <a
                    className={
                      (props.transparent
                        ? "bg-white text-gray-800 active:bg-gray-100"
                        : "bg-pink-500 text-white active:bg-pink-600") +
                      " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                    }
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    href="/login"
                  >
                    <i className="fas fa-arrow-alt-circle-down"></i> Login
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
