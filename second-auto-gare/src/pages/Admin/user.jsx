import Display from "../../components/common/display";
import { useState, useEffect } from "react";
import { deleteData, getData } from "../../service/axiosservice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [userSearch, setSearchUser] = useState("");
  console.log(userSearch);

  const getUser = async () => {
    try {
      const resp = await getData("/api/v1/users");
      setUserData(resp.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteUser = async (id) => {
    const resp = await deleteData(`api/v1/usersdelete/${id}`);
    console.log(resp);
    if (resp?.status) {
      toast.success(resp.message);
      getUser();
    }
  };

  const updateUser = async (id) => {
    navigate(`updateProfile/${id}`);
  };

  const searchUser = async () => {
    const resp = await getData(`api/v1/user/?email=${userSearch}`);
    console.log(resp);
    if (resp.status) {
      setUserData(resp.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const debouncing = setTimeout(() => {
      searchUser();
    }, 700);
    return () => clearTimeout(debouncing);
  }, [userSearch]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <Display />
        <div className="w-full  lg:pt-24 md:pt-[px] pt-[500px]">
          <div className="relative">
            <input
              type="text"
              className="border-2 outline-none border-gray-500 rounded-lg pl-8 h-10 ml-3 mt-2 lg:w-60 md:w-60 w-fit placeholder:text-gray-500"
              placeholder="Serach user"
              onChange={(e) => setSearchUser(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
              className="absolute top-5 left-5 text-purple"
            >
              <path
                fill="currentColor"
                d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48M38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74"
              />
            </svg>
          </div>
          <div className="w-full h-[100vh]">
            <div className="grid lg:grid-cols-5 gap-5 md:grid-cols-2 sm:grid-cols-1 mt-5 px-2">
              {userData.map((i, idx) => {
                return (
                  <div
                    key={idx}
                    className="w-full mb-6  shadow-[0px_2px_5px_1px_#00000024] p-3 rounded-xl"
                  >
                    <div className="">
                      <div className="flex justify-center">
                        {i?.photo ? (
                          <img
                            src={i?.photo}
                            alt="User Image"
                            className="h-20 w-20 shadow-soft-2xl rounded-full border-2 border-purple p-1"
                          />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="80"
                            height="80"
                            viewBox="0 0 24 24"
                            className="border-2 border-purple rounded-full"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              stroke-dasharray="28"
                              stroke-dashoffset="28"
                              stroke-linecap="round"
                              stroke-width="1"
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
                        )}
                      </div>
                      <div className="flex-auto px-1 pt-6">
                        <div className="flex justify-between">
                          <p className=" z-10 mb-2  text-transparent bg-gradient-to-tl from-gray-900 to-slate-800  bg-clip-text">
                            Full name:{" "}
                            <span className="text-base font-normal">
                              {i?.firstname +" "+ i?.lastname}
                            </span>
                          </p>
                        </div>
                        <div className="flex flex-col justify-between gap-1">
                          <p className=" z-10 mb-2 font-medium  text-transparent bg-gradient-to-tl from-gray-900 to-slate-800  bg-clip-text">
                            Role:{" "}
                            <span className="text-base font-normal">
                              {i?.role}
                            </span>
                          </p>
                          <p className=" z-10 mb-2 font-medium  text-transparent bg-gradient-to-tl from-gray-900 to-slate-800  bg-clip-text">
                            Email:{" "}
                            <span className="text-base font-normal">
                              {i?.email}
                            </span>
                          </p>
                          <p className=" z-10 mb-2  text-transparent bg-gradient-to-tl from-gray-900 to-slate-800 bg-clip-text">
                            Phone number:{" "}
                            <span className="text-base font-normal">
                              {i?.phonenumber}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between w-full">
                          <button
                            onClick={() => deleteUser(i?._id)}
                            type="button"
                            className=" flex bg-red bg-opacity-70 rounded-lg text-white items-center gap-2  px-3 py-1 text-sm  font-bold text-center uppercase align-middle transition-all "
                          >
                            Delete
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => updateUser(i?._id)}
                            type="button"
                            className=" flex bg-purple bg-opacity-70 rounded-lg text-white items-center gap-2  px-3 py-1 text-sm  font-bold text-center uppercase align-middle transition-all "
                          >
                            Eidit
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 30 30"
                            >
                              <path
                                fill="none"
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="1.5"
                                d="m30 7l-5-5L5 22l-2 7l7-2Zm-9-1l5 5ZM5 22l5 5Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default User;
