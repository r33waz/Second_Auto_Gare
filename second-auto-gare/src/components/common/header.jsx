import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/kidmfond.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../../service/axiosservice";
import { toast } from "react-toastify";
import { logout } from "../../pages/auth/loginslice";
import { Primary_btn } from "./button";

function Header() {
  const location = useLocation();
  const [isOpen, setIsopen] = useState(false);
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
      navigate("/login");
      toast.success(resp.message);
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
          {user?.islogin === true ? (
            <>
              <div className="relative">
                <button onClick={() => setIsopen(!isOpen)}>button</button>
                <div
                  className={`absolute z-50 duration-500 border-2 rounded-lg overflow-hidden ${
                    isOpen ? "h-60 w-full p-4 " : "h-0"
                  }`}
                >
                  adad
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
            isMobile ? "   h-60 w-full p-4 " : "h-0"
          }
              rounded-lg overflow-hidden`}
        >
          <nav className="flex flex-col gap-3 ">
            {/* Maping the above array of links */}
            {Links.map((i, idx) => {
              return (
                <NavLink
                  key={idx}
                  to={i.link}
                  className={
                    i.link === pathname
                      ? "text-purple hover:text-purple font-medium underline underline-offset-4 w-20"
                      : ""
                  }
                >
                  {i.name}
                </NavLink>
              );
            })}
          </nav>
          <div className="flex mt-2 gap-x-4">
            {page.map((i, idx) => {
              return (
                <Primary_btn key={idx}>
                  <NavLink to={i?.link}>{i.name}</NavLink>
                </Primary_btn>
              );
            })}
          </div>
        </div>
      }
    </>
  );
}

export default Header;
