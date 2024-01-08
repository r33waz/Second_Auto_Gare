import Display from "../../components/common/display";
import { useState, useEffect } from "react";
import { deleteData, getData } from "../../service/axiosservice";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function User() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);

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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <Display />
        
        <div className="w-full overflow-x-auto lg:pt-20 md:pt-[450px] pt-[500px]">
          <table className="table w-full pt-5 border-separate table-auto border-spacing-y-2">
            <thead>
              <tr className="text-xs  uppercase lg:text-xl md:text-lg text-black font-extralight ">
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>PhoneNumber</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Change</th>
              </tr>
            </thead>
            <tbody className="text-xs text-center lg:text-lg md:text-sm ">
              {userData.map((user, idx) => (
                <tr
                  key={idx}
                  className=" h-12  shadow-[0px_0px_2px_2px_#00000024] "
                >
                  <td className="">{user.firstname}</td>
                  <td className="">{user.lastname}</td>
                  <td className="">{user.email}</td>
                  <td className="">{user.phonenumber}</td>
                  <td className="uppercase ">{user.role}</td>
                  <td className="">{user.createdAt.slice(0, 10)}</td>
                  <td className="flex gap-2 py-2 justify-evenly">
                    <button
                      onClick={() => updateUser(user._id)}
                      className="w-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="w-full p-1 mt-3 text-white rounded-md bg-purple"
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
                    </button>
                    <button
                      className="w-full"
                      onClick={() => deleteUser(user._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="w-full p-1 mt-3 text-white rounded-md bg-red bg-opacity-80"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                        >
                          <path
                            stroke-dasharray="60"
                            stroke-dashoffset="60"
                            d="M18 3L16 21H7L5 3z"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              dur="0.6s"
                              values="60;0"
                            />
                          </path>
                          <path
                            stroke-dasharray="14"
                            stroke-dashoffset="14"
                            d="M6 7.67C6.6 7.3 7.22 7 8 7C10 7 11 9 13 9C14.64 9 15.6 7.66 17 7.17"
                          >
                            <animate
                              fill="freeze"
                              attributeName="stroke-dashoffset"
                              begin="0.7s"
                              dur="0.2s"
                              values="14;0"
                            />
                          </path>
                        </g>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
