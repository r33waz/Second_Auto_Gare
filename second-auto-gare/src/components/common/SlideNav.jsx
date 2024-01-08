import { useEffect, useState } from "react";
import logo from "../../assets/kidmfond.svg";
import { NavLink, useLocation } from "react-router-dom";
function SideNav() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const Menus = [
    {
      name: "Dashboard",
      link: "/admin",
      svg: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            className="p-1 lg:p-0 md:p-0"
          >
            <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
          </svg>
        </>
      ),
    },
    {
      name: "Users",
      link: "/admin/user",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
          className="p-1 lg:p-0 md:p-0"
        >
          <path
            fill="currentColor"
            d="M6.196 17.485q1.275-.918 2.706-1.451Q10.335 15.5 12 15.5q1.667 0 3.098.534q1.43.533 2.706 1.45q.99-1.024 1.593-2.42Q20 13.666 20 12q0-3.355-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.667.603 3.063q.603 1.397 1.593 2.422m5.805-4.985q-1.264 0-2.133-.868Q9 10.765 9 9.501t.868-2.133q.867-.868 2.131-.868t2.133.868Q15 8.235 15 9.499q0 1.264-.868 2.133q-.867.868-2.131.868M12 21q-1.883 0-3.535-.701q-1.642-.7-2.858-1.916q-1.215-1.216-1.916-2.858Q3 13.883 3 12t.701-3.535q.7-1.642 1.916-2.858q1.216-1.215 2.858-1.916Q10.117 3 12 3t3.535.701q1.642.7 2.858 1.916q1.215 1.216 1.916 2.858Q21 10.117 21 12t-.701 3.535q-.7 1.642-1.916 2.858q-1.216 1.215-2.858 1.916Q13.883 21 12 21m0-1q1.383 0 2.721-.484q1.339-.483 2.314-1.354q-.975-.782-2.356-1.237Q13.499 16.5 12 16.5q-1.498 0-2.788.445q-1.29.445-2.247 1.247q.975.84 2.314 1.354Q10.617 20 12 20m0-8.5q.842 0 1.421-.579Q14 10.342 14 9.5q0-.842-.579-1.421Q12.842 7.5 12 7.5q-.842 0-1.421.579Q10 8.658 10 9.5q0 .842.579 1.421q.579.579 1.421.579m0 6.75"
          />
        </svg>
      ),
    },
    ,
    {
      name: "Vehicles",
      link: "/admin/vehicle",
      svg: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            className="p-1 lg:p-0 md:p-0"
          >
            <path
              fill="currentColor"
              d="M16 6H6l-5 6v3h2a3 3 0 0 0 3 3a3 3 0 0 0 3-3h6a3 3 0 0 0 3 3a3 3 0 0 0 3-3h2v-3c0-1.11-.89-2-2-2h-2zM6.5 7.5h4V10h-6zm5.5 0h3.5l1.96 2.5H12zm-6 6A1.5 1.5 0 0 1 7.5 15A1.5 1.5 0 0 1 6 16.5A1.5 1.5 0 0 1 4.5 15A1.5 1.5 0 0 1 6 13.5m12 0a1.5 1.5 0 0 1 1.5 1.5a1.5 1.5 0 0 1-1.5 1.5a1.5 1.5 0 0 1-1.5-1.5a1.5 1.5 0 0 1 1.5-1.5"
            />
          </svg>
        </>
      ),
    },
    ,
    {
      name: "Bookings",
      link: "/admin/bookings",
      svg: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            className="p-1 lg:p-0 md:p-0"
          >
            <path
              fill="currentColor"
              d="M10 21H5c-1.11 0-2-.89-2-2V5c0-1.11.89-2 2-2h14c1.11 0 2 .89 2 2v5.33c-.3-.12-.63-.19-.96-.19c-.37 0-.72.08-1.04.23V5H5v14h5.11l-.11.11zM7 9h10V7H7zm0 8h5.11L14 15.12V15H7zm0-4h9.12l.88-.88V11H7zm14.7.58l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1l2.05 2.05l1-1a.55.55 0 0 0 0-.77M12 22h2.06l6.05-6.07l-2.05-2.05L12 19.94z"
            />
          </svg>
        </>
      ),
    },
  ];

  return (
    <>
      <section className="flex gap-6">
        <div className="sticky left-0 z-50 flex gap-4">
          <div
            className={`min-h-screen bg-sideNav ${
              open ? "lg:w-72 md:w-60 w-48" : "lg:w-16 md:w-16 w-10"
            } duration-700`}
          >
            <div
              className={`text-white flex cursor-pointer py-2 ${
                !open ? "justify-center" : "justify-end pr-3"
              } `}
              title={open ? "Close Menu" : "Open Menu"}
              onClick={() => setOpen(!open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`text-white cursor-pointer bg-purple rounded-full p-1 duration-500 w-6 h-6 ${
                  !open ? "" : "rotate-180"
                } `}
              >
                <g fill="none">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="m15.06 5.283l5.657 5.657a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 0 1-2.122-2.122l3.096-3.096H4.5a1.5 1.5 0 0 1 0-3h11.535L12.94 7.404a1.5 1.5 0 0 1 2.122-2.121Z"
                  />
                </g>
              </svg>
            </div>

            <div className="relative flex flex-col gap-4 lg:p-2 md:p-2">
              {Menus.map((i, idx) => {
                return (
                  <NavLink
                    title={i?.name}
                    key={idx}
                    to={i.link}
                    className={`flex items-center text-sm gap-3.5 font-medium text-white lg:p-2 md:p-2  group ${
                      i.link === pathname
                        ? "bg-purple rounded text-white"
                        : "hover:bg-purple/50 rounded"
                    }`}
                  >
                    <span>{i.svg}</span>
                    <h1
                      className={`duration-500 text-lg font-semibold ${
                        !open && "opacity-0 translate-x-28 overflow-hidden"
                      }`}
                    >
                      {i.name}
                    </h1>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default SideNav;
