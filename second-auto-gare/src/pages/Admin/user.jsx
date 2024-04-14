import React from "react";
import { useState, useEffect } from "react";
import SideNav from "../../components/common/SlideNav";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading";
import { Card } from "../../components/common/card";
import { Link, useNavigate } from "react-router-dom";
import {
  GetAllUser,
  DeleteUser,
  SearchUser,
} from "../../redux/userslice/userthunk";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shadcn_ui/ui/dialog";
import { Button } from "../../shadcn_ui/ui/button";

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isLoading } = useSelector((state) => state.user);
  console.log("frontend data", user);
  useEffect(() => {
    dispatch(GetAllUser());
  }, [dispatch]);

  const deletUeser = (id) => {
    console.log(id);
    if (id) {
      dispatch(DeleteUser(id)).then(() => {
        dispatch(GetAllUser());
      });
    }
  };

  const allUser = () => {
    dispatch(GetAllUser());
  };

  const EiditUser = async (id) => {
    console.log(id);
    navigate(`/admin/updateProfile/${id}`);
  };

  const handelUserSearch = (e) => {
    e.preventDefault();
    const user = e.target.value;
    setTimeout(() => {
      console.log("userSearch", user);
      dispatch(SearchUser(user));
    }, 1000);
  };

  return (
    <>
      <div className="flex w-full">
        <SideNav />
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <div className="relative z-50 w-full h-40 bg-purple">
              <div className="absolute flex flex-wrap justify-center w-full gap-8 lg:flex-nowrap md:flex-nowrap lg:top-20 md:top-12 top-12">
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
                          strokeDasharray="28"
                          strokeDashoffset="28"
                          strokeLinecap="round"
                          strokeWidth="2"
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
                      {
                        user?.list?.filter((user) => user?.role === "user")
                          .length
                      }
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
                          strokeDasharray="28"
                          strokeDashoffset="28"
                          strokeLinecap="round"
                          strokeWidth="2"
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
                      {
                        user?.list?.filter((user) => user.role === "dealer")
                          .length
                      }
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
                          strokeDasharray="28"
                          strokeDashoffset="28"
                          strokeLinecap="round"
                          strokeWidth="2"
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
                      {user?.list?.length}
                    </h1>
                  </div>
                </Card>
              </div>
            </div>
            <div className="w-full  lg:pt-16 md:pt-16 pt-[500px]">
              <div className="relative flex items-center justify-between gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 512 512"
                  onClick={allUser}
                  className="p-1 ml-4 text-white rounded-full bg-purple"
                >
                  <path
                    fill="currentColor"
                    d="M497.333 239.999H80.092l95.995-95.995l-22.627-22.627L18.837 256L153.46 390.623l22.627-22.627l-95.997-95.997h417.243z"
                  />
                </svg>
                <input
                  type="text"
                  className="h-10 pl-2 mt-2 ml-3 border-2 border-gray-500 rounded-lg outline-none lg:w-60 md:w-60 w-fit placeholder:text-gray-500"
                  placeholder="Serach user"
                  onChange={handelUserSearch}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                  className="absolute top-5 right-4 text-purple"
                >
                  <path
                    fill="currentColor"
                    d="m228.24 219.76l-51.38-51.38a86.15 86.15 0 1 0-8.48 8.48l51.38 51.38a6 6 0 0 0 8.48-8.48M38 112a74 74 0 1 1 74 74a74.09 74.09 0 0 1-74-74"
                  />
                </svg>
              </div>
              <section>
                <div className="flex flex-col px-2">
                  <div className="-m-1.5 overflow-x-auto">
                    <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead>
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                              >
                                Firstname
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                              >
                                Lastname
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end"
                              >
                                Role
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end"
                              >
                                Role
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {user?.list?.map((e) => {
                              return (
                                <>
                                  <tr>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap ">
                                      {e?.firstname}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
                                      {e?.lastname}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
                                      {e?.email}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap ">
                                      {e?.role}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                      <Dialog>
                                        <DialogTrigger>
                                          <button
                                            type="button"
                                            className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg text-red gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                          >
                                            Delete
                                          </button>
                                        </DialogTrigger>
                                        <DialogContent
                                          className={`mt-6 
                                           
                                           sm:max-w-[425px] left-[37%] p-3 border-2 rounded-md  top-60 bg-white `}
                                        >
                                          <DialogHeader>
                                            <DialogTitle>
                                              Are you absolutely sure?
                                            </DialogTitle>
                                            <DialogDescription>
                                              This action cannot be undone. This
                                              will permanently delete user
                                              account and remove your data from
                                              our servers.
                                            </DialogDescription>
                                          </DialogHeader>
                                          <DialogFooter>
                                            <div className="flex items-end justify-end w-full gap-2 text-white">
                                              <DialogClose>
                                                <Button
                                                  type="button"
                                                  className="inline-flex items-center text-sm font-semibold text-blue-600 bg-gray-500 border border-transparent border-none rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                >
                                                  Close
                                                </Button>
                                              </DialogClose>
                                              <Button
                                                onClick={() =>
                                                  deletUeser(e?._id)
                                                }
                                                type="button"
                                                className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent border-none rounded-lg bg-red gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                              >
                                                Delete
                                              </Button>
                                            </div>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-blue whitespace-nowrap text-end">
                                      <button
                                        onClick={() => EiditUser(e?._id)}
                                        type="button"
                                        className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                      >
                                        Eidit
                                      </button>
                                    </td>
                                  </tr>
                                </>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default User;
//  <button
//    onClick={() => deletUeser(e?._id)}
//    type="button"
//    className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg text-red gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
//  >
//    Delete
//  </button>;

// useEffect(() => {
//   const debouncing = setTimeout(() => {
//     searchUser();
//   }, 700);
//   return () => clearTimeout(debouncing);
// }, [userSearch]);
// const deleteUser = async (id) => {
//   const resp = await deleteData(`api/v1/usersdelete/${id}`);
//   console.log(resp);
//   if (resp?.status) {
//     toast.success(resp.message);
//   }
// };

// const updateUser = async (id) => {
//   navigate(`updateProfile/${id}`);
// };

// const searchUser = async () => {
//   const resp = await getData(`api/v1/user/?email=${userSearch}`);
//   console.log(resp);
//   if (resp.status) {
//     setUserData(resp.data);
//   }
// };
