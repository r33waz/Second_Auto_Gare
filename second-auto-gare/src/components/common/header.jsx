import { useState } from "react";
import Logo from "../../assets/images/kidmfond.jpg";
import { Link, NavLink } from "react-router-dom";

function Header() {
  //*Storing the links in form of array of object
  const [islogin, setIslogin] = useState(false);
  // eslint-disable-next-line no-sparse-arrays
  const Links = [
    {
      name: "Home",
      link: "/home",
    },
    {
      name: "About",
      link: "/about",
    },
    ,
    {
      name: "Booking",
      link: "/booking",
    },
    ,
    {
      name: "Category",
      link: "/category",
    },
    ,
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
  return (
    <>
      <div className="sticky top-0 z-50 flex items-center justify-around p-4 bg-white shadow-md :bg--bg :shadow-sm :shadow-white">
        <div>
          <NavLink to="/">
            <img
              src={Logo}
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full drop-shadow-2xl"
              title="Second Auto Gare"
            />
          </NavLink>
        </div>

        <nav className="flex gap-16 uppercase">
          {/* Maping the above array of links */}
          {Links.map((i, idx) => {
            return (
              <NavLink
                key={idx}
                to={i.link}
                className={
                  i.link ? "text-blue hover:text-blue font-medium" : ""
                }
              >
                {i.name}
              </NavLink>
            );
          })}
        </nav>

        <div>
          {islogin === true ? (
            <div>user photo</div>
          ) : (
            <div className="flex gap-4">
              {page.map((i, idx) => {
                return (
                  <NavLink
                    key={idx}
                    to={i?.link}
                    className="p-2 font-semibold text-white uppercase rounded-sm hover:scale-105 bg-blue"
                  >
                    {i.name}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;
