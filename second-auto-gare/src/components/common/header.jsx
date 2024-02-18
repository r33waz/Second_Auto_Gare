import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/kidmfond.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { postData } from "../../service/axiosservice";
import { toast } from "react-toastify";
import { logout } from "../../pages/auth/loginslice";

function Header() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = location.pathname;
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //*Storing the links in form of array of object
  const Links = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Category",
      link: "/category",
    },
    {
      name: "Booking",
      link: "/booking",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact",
      link: "/contact",
    },
  ];

  const page = [
    {
      name: "Login",
      link: "/login",
    },
    {
      name: "signup",
      link: "/signup",
    },
  ];
  const handelOpen = () => {
    setIsMobile(!isMobile)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsMobile(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    const resp = await postData("/api/v1/logout");
    if (resp.status) {
      dispatch(logout(resp.data));
      navigate("/login");
      toast.success(resp.message);
    }
  };
  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 py-4 bg-white shadow-md lg:justify-around md:justify-around">
        <NavLink to="/home">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 h-16 rounded-full drop-shadow-2xl"
            title="Second Auto Gare"
          />
        </NavLink>
        <nav className="justify-between hidden gap-10 uppercase md:flex lg:flex">
          {/* Maping the above array of links */}
          {Links.map((i, idx) => {
            return (
              <NavLink
                key={idx}
                to={i.link}
                className={
                  i.link === pathname
                    ? "text-purple hover:text-purple font-medium underline underline-offset-4"
                    : ""
                }
              >
                {i.name}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center justify-end">
          <button onClick={handelOpen} className={`lg:hidden md:hidden duration-1000 ${isMobile ? "rotate-180" : ""}`}>
            {isMobile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="transition-all duration-1000 "
              >
                <path
                  fill="currentColor"
                  d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="transition-all duration-1000 "
              >
                <path
                  fill="currentColor"
                  d="M4 18q-.425 0-.712-.288T3 17q0-.425.288-.712T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8z"
                />
              </svg>
            )}
          </button>
          {user?.islogin === true ? (
            <div className="w-56 text-right top-2 right-20">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="justify-center w-full px-4 py-2 text-sm font-medium text-white rounded-md ">
                    {user?.photo ? (
                      <img
                        src={user?.photo}
                        alt="image"
                        className="rounded-full w-14 h-14"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-dasharray="20"
                          stroke-dashoffset="20"
                          stroke-linecap="round"
                          stroke-width="2"
                        >
                          <path d="M6 19V18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18V19">
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.4s"
                              values="20;0"
                            />
                          </path>
                          <path d="M12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z">
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.5s"
                              dur="0.4s"
                              values="20;0"
                            />
                          </path>
                        </g>
                      </svg>
                    )}
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 p-1 mt-2 origin-top-right bg-gray-200 divide-y divide-gray-100 rounded-md shadow-lg w-72 ring-1 ring-black/5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        <div className="flex gap-2 ">
                          {user?.photo ? (
                            <img
                              src={user?.photo}
                              alt="image"
                              className="rounded-full w-14 h-14"
                            />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-dasharray="20"
                                stroke-dashoffset="20"
                                stroke-linecap="round"
                                stroke-width="2"
                              >
                                <path d="M6 19V18C6 15.7909 7.79086 14 10 14H14C16.2091 14 18 15.7909 18 18V19">
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    dur="0.4s"
                                    values="20;0"
                                  />
                                </path>
                                <path d="M12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8C15 9.65685 13.6569 11 12 11Z">
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.5s"
                                    dur="0.4s"
                                    values="20;0"
                                  />
                                </path>
                              </g>
                            </svg>
                          )}
                          <div className="flex flex-col">
                            <h1 className="text-lg font-semibold">
                              {user?.firstname + "" + user?.lastname}
                            </h1>
                            <span>{user?.email}</span>
                          </div>
                        </div>
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-purple text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2  gap-2 text-lg mt-6`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-dasharray="28"
                                stroke-dashoffset="28"
                                stroke-linecap="round"
                                stroke-width="2"
                              >
                                <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    dur="0.4s"
                                    values="28;0"
                                  />
                                </path>
                                <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.5s"
                                    dur="0.4s"
                                    values="28;0"
                                  />
                                </path>
                              </g>
                            </svg>
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-purple text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2  gap-2 text-lg mt-2`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              >
                                <path
                                  stroke-dasharray="20"
                                  stroke-dashoffset="20"
                                  d="M3 21H21"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    dur="0.3s"
                                    values="20;0"
                                  />
                                </path>
                                <path
                                  stroke-dasharray="44"
                                  stroke-dashoffset="44"
                                  d="M7 17V13L17 3L21 7L11 17H7"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.4s"
                                    dur="0.6s"
                                    values="44;0"
                                  />
                                </path>
                                <path
                                  stroke-dasharray="8"
                                  stroke-dashoffset="8"
                                  d="M14 6L18 10"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="1s"
                                    dur="0.2s"
                                    values="8;0"
                                  />
                                </path>
                              </g>
                            </svg>
                            Eidit Account
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-purple text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2  gap-2 text-lg mt-2`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              >
                                <rect
                                  width="16"
                                  height="16"
                                  x="4"
                                  y="4"
                                  stroke-dasharray="64"
                                  stroke-dashoffset="64"
                                  rx="1"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    dur="0.5s"
                                    values="64;0"
                                  />
                                </rect>
                                <path
                                  stroke-dasharray="6"
                                  stroke-dashoffset="6"
                                  d="M7 4V2M17 4V2"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.5s"
                                    dur="0.2s"
                                    values="6;0"
                                  />
                                </path>
                                <path
                                  stroke-dasharray="12"
                                  stroke-dashoffset="12"
                                  d="M7 11H17"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.8s"
                                    dur="0.2s"
                                    values="12;0"
                                  />
                                </path>
                                <path
                                  stroke-dasharray="9"
                                  stroke-dashoffset="9"
                                  d="M7 15H14"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="1s"
                                    dur="0.2s"
                                    values="9;0"
                                  />
                                </path>
                              </g>
                              <rect
                                width="14"
                                height="0"
                                x="5"
                                y="5"
                                fill="currentColor"
                              >
                                <animate
                                  fill="freeze"
                                  attributeName="height"
                                  begin="0.5s"
                                  dur="0.2s"
                                  values="0;3"
                                />
                              </rect>
                            </svg>
                            Booking
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${active ? "bg-purple text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2  gap-2 text-lg mt-2`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="32"
                              height="32"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              >
                                <g
                                  stroke-dasharray="10"
                                  stroke-dashoffset="10"
                                  stroke-width="2"
                                >
                                  <path d="M3 5L5 7L9 3">
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      dur="0.2s"
                                      values="10;0"
                                    />
                                  </path>
                                  <path d="M3 12L5 14L9 10">
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.5s"
                                      dur="0.2s"
                                      values="10;0"
                                    />
                                  </path>
                                  <path d="M3 19L5 21L9 17">
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="1s"
                                      dur="0.2s"
                                      values="10;0"
                                    />
                                  </path>
                                </g>
                                <g stroke-dasharray="22" stroke-dashoffset="22">
                                  <rect
                                    width="9"
                                    height="3"
                                    x="11.5"
                                    y="3.5"
                                    rx="1.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.2s"
                                      dur="0.5s"
                                      values="22;0"
                                    />
                                  </rect>
                                  <rect
                                    width="9"
                                    height="3"
                                    x="11.5"
                                    y="10.5"
                                    rx="1.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="0.7s"
                                      dur="0.5s"
                                      values="22;0"
                                    />
                                  </rect>
                                  <rect
                                    width="9"
                                    height="3"
                                    x="11.5"
                                    y="17.5"
                                    rx="1.5"
                                  >
                                    <animate
                                      fill="freeze"
                                      attributeName="stroke-dashoffset"
                                      begin="1.2s"
                                      dur="0.5s"
                                      values="22;0"
                                    />
                                  </rect>
                                </g>
                              </g>
                            </svg>
                            Watchlist
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${active ? "bg-purple text-white" : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2  gap-2 text-lg mt-2 `}
                          >
                            Logout
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="30"
                              height="30"
                              viewBox="0 0 24 24"
                              className="rotate-180"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              >
                                <path
                                  stroke-dasharray="20"
                                  stroke-dashoffset="20"
                                  d="M3 3V21"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    dur="0.3s"
                                    values="20;0"
                                  />
                                </path>
                                <path
                                  stroke-dasharray="15"
                                  stroke-dashoffset="15"
                                  d="M21 12H7.5"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.4s"
                                    dur="0.2s"
                                    values="15;0"
                                  />
                                </path>
                                <path
                                  stroke-dasharray="12"
                                  stroke-dashoffset="12"
                                  d="M7 12L14 19M7 12L14 5"
                                >
                                  <animate
                                    fill="freeze"
                                    attributeName="stroke-dashoffset"
                                    begin="0.6s"
                                    dur="0.2s"
                                    values="12;0"
                                  />
                                </path>
                              </g>
                            </svg>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <div className="flex gap-1 ">
              {page.map((i, idx) => {
                return (
                  <NavLink
                    key={idx}
                    to={i?.link}
                    className="p-2 text-sm text-white uppercase rounded-sm lg:text-lg md:text-lg hover:scale-105 bg-purple"
                  >
                    {i.name}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>

      </div>
      {
        isMobile && <>
          <div className={`sticky z-50 p-3 bg-white top-20 duration-1000 transition-all ${isMobile ? "h-40" : "h-0"}`}>
            <nav className="flex flex-col gap-3 uppercase ">
              {/* Maping the above array of links */}
              {Links.map((i, idx) => {
                return (
                  <NavLink
                    key={idx}
                    to={i.link}
                    className={i.link === pathname
                      ? "text-purple hover:text-purple font-medium underline underline-offset-4 w-20"
                      : ""}
                  >
                    {i.name}
                  </NavLink>
                );
              })}
            </nav>

          </div></>
      }
    </>
  );
}

export default Header;
