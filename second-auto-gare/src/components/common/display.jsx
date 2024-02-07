import React from 'react';
import { Card } from "./card";
import { useEffect, useState } from "react";
import { getData } from "../../service/axiosservice";

function Display() {
  const [users, setUser] = useState([]);
  const User = async () => {
    const resp = await getData("/api/v1/users");
    //    console.log(resp);
    setUser(resp.data);
  };

  useEffect(() => {
    User();
  }, []);
  return (
    <div className="relative z-50 w-full h-40 bg-purple">
      <div className="absolute grid w-full gap-8 px-1 pt-10 lg:top-20 md:top-12 top-12 lg:grid-cols-4 lg:px-2 md:px-2 md:gris-cols-4 sm:grid-cols-1 place-items-center">
        <Card>
          <div className="flex flex-col animate__animated animate__fadeInUp">
            <div className="flex justify-between">
              <h1 className="text-2xl"> Normal User</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
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
            </div>
            <h1 className="text-5xl text-purple">
              {users.filter((user) => user.role === "user").length}
            </h1>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col animate__animated animate__fadeInUp">
            <div className="flex justify-between">
              <h1 className="text-2xl">Dealers</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
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
            </div>
            <h1 className="text-5xl text-purple">
              {users.filter((user) => user.role === "dealer").length}
            </h1>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col animate__animated animate__fadeInUp">
            <div className="flex justify-between">
              <h1 className="text-2xl">Total Users</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
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
            </div>
            <h1 className="text-5xl text-purple">10</h1>
          </div>
        </Card>
        <Card>
          <div className="flex flex-col animate__animated animate__fadeInUp">
            <div className="flex justify-between">
              <h1 className="text-2xl">Total Users</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
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
            </div>
            <h1 className="text-5xl text-purple">10</h1>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Display;
