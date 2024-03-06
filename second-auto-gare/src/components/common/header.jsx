import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/kidmfond.jpg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../service/axiosservice";
import { toast } from "react-toastify";
import { logout } from "../../redux/loginslice/loginslice";
import { Primary_btn } from "./button";

function Header() {
  const location = useLocation();
  const [isOpen, setIsopen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = location.pathname;
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //*Storing the links in form of array of object
  const Links = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "Vehicle",
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
      name: "Signup",
      link: "/signup",
    },
  ];
  const handelOpen = () => {
    setIsMobile(!isMobile);
  };

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
      window.location.reload();
      navigate("/login");
    }
  };
  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-between gap-4 px-5 py-4 bg-white shadow-md lg:justify-around md:justify-around">
        <NavLink to="/home">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 h-16 rounded-full shadow-md"
            title="Second Auto Gare"
          />
        </NavLink>
        <nav className="justify-between hidden gap-10 md:flex lg:flex">
          {/* Maping the above array of links */}
          {Links.map((i, idx) => {
            return (
              <NavLink
                key={idx}
                to={i.link}
                className={
                  i.link === pathname
                    ? "text-purple hover:text-purple font-medium underline underline-offset-4 text-sm tracking-widest"
                    : "text-sm tracking-widest"
                }
              >
                {i.name}
              </NavLink>
            );
          })}
        </nav>
        <div className="flex items-center justify-end">
          <button
            onClick={handelOpen}
            className={`lg:hidden md:hidden duration-1000 ${
              isMobile ? "rotate-180" : ""
            }`}
          >
            {isMobile ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="transition-all duration-700 "
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
                className="transition-all duration-700 "
              >
                <path
                  fill="currentColor"
                  d="M4 18q-.425 0-.712-.288T3 17q0-.425.288-.712T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8z"
                />
              </svg>
            )}
          </button>
          {user?.login?.islogin === true ? (
            <>
              <div className="relative">
                <button onClick={() => setIsopen(!isOpen)}>
                  {/* <img src="/images/avatar" alt="img" /> */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
                    />
                    <path
                      fill="currentColor"
                      d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0m13.993-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
                    />
                  </svg>
                </button>
                <div
                  className={`absolute z-50 duration-500 border-2 right-5 rounded-lg  bg-white ${
                    isOpen
                      ? "h-[18rem] w-[250px] p-1.5 "
                      : "h-0 w-[250px] hidden"
                  }`}
                >
                  <div className="flex flex-col divide-y">
                    <div className="flex items-center gap-2 py-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5m0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3"
                        />
                        <path
                          fill="currentColor"
                          d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2m-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0m13.993-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0"
                        />
                      </svg>
                      <div className="flex flex-col">
                        <h1>
                          {user?.login.firstname}
                          {user?.login.lastname}
                        </h1>
                        <small>{user?.login.email}</small>
                      </div>
                    </div>
                    <div className="flex flex-col py-1.5">
                      <div className="flex items-center w-full gap-2 py-2 rounded-md hover:bg-purple hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M20 22h-2v-2a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v2H4v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5zm-8-9a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                          />
                        </svg>
                        <Link to="/profile" className="w-full">
                          Profile
                        </Link>
                      </div>
                      <div className="flex items-center w-full gap-2 py-2 rounded-md hover:bg-purple hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M26 4h-4V2h-2v2h-8V2h-2v2H6c-1.1 0-2 .9-2 2v20c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 22H6V12h20zm0-16H6V6h4v2h2V6h8v2h2V6h4z"
                          />
                        </svg>
                        <Link className="w-full">Booking</Link>
                      </div>
                      <div className="flex items-center w-full gap-2 py-2 rounded-md hover:bg-purple hover:text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                        >
                          <g fill="currentColor">
                            <path d="M10 4a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2h-4zM7.17 4A3.001 3.001 0 0 1 10 2h4c1.306 0 2.418.835 2.83 2H18a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1.17zm0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1.17A3.001 3.001 0 0 1 14 8h-4a3.001 3.001 0 0 1-2.83-2zM7 11a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1zm0 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1z" />
                          </g>
                        </svg>
                        <Link className="w-full">Posts</Link>
                      </div>
                      <div className="flex items-center gap-2 py-2 rounded-md hover:bg-purple hover:text-white ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M24 4v22.75l-7.1-3.59l-.9-.45l-.9.45L8 26.75V4zm0-2H8a2 2 0 0 0-2 2v26l10-5l10 5V4a2 2 0 0 0-2-2"
                          />
                        </svg>
                        <Link className="w-full">Watchlist</Link>
                      </div>
                    </div>
                    <div className="flex items-center w-full gap-2 py-2 rounded-md hover:bg-purple hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 32 32"
                      >
                        <path
                          fill="currentColor"
                          d="M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2"
                        />
                        <path
                          fill="currentColor"
                          d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6z"
                        />
                      </svg>
                      <button
                        className="w-full text-start"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden gap-1 md:flex ">
              {page.map((i, idx) => {
                return (
                  <Primary_btn key={idx}>
                    <NavLink to={i?.link}>{i.name}</NavLink>
                  </Primary_btn>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {
        <div
          className={` bg-white z-50 fixed top-24   shadow-[0_3px_10px_rgb(0,0,0,0.2)] duration-500  ${
            isMobile ? "   h-60 w-full p-4 " : "h-0 w-full"
          }
              rounded-lg overflow-hidden`}
        >
          <nav className="flex flex-col items-center justify-center gap-3 text-lg">
            {/* Maping the above array of links */}
            {Links.map((i, idx) => {
              return (
                <NavLink
                  key={idx}
                  to={i.link}
                  className={
                    i.link === pathname
                      ? "text-purple hover:text-purple  font-medium underline underline-offset-4 "
                      : ""
                  }
                >
                  {i.name}
                </NavLink>
              );
            })}
          </nav>
          {user?.islogin === true ? (
            ""
          ) : (
            <div className="flex mt-2 gap-x-4">
              {page.map((i, idx) => {
                return (
                  <Primary_btn key={idx}>
                    <NavLink to={i?.link}>{i.name}</NavLink>
                  </Primary_btn>
                );
              })}
            </div>
          )}
        </div>
      }
    </>
  );
}

export default Header;
