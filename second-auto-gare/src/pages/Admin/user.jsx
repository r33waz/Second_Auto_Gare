import React, { useRef } from "react";
import { useState, useEffect } from "react";
import SideNav from "../../components/common/SlideNav";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading";
import { Card } from "../../components/common/card";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
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
import { Loader } from "lucide-react";
import { Fade } from "react-awesome-reveal";

function User() {
  const [itemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const Userref = useRef();
  const [searchValue, setSearchvalue] = useState();
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
        navigate("/admin/user");
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

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = user?.list?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentItems?.length / itemsPerPage);
  console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % user?.list.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handelUserSearch = () => {
    const user = searchValue;
    console.log("userSearch", user);
    dispatch(SearchUser(user));
  };

  return (
    <>
      <div className="flex w-full">
        <SideNav />
        <div className="flex flex-col w-full pt-5">
          <h2 className="text-4xl">User Table</h2>
          <div className="w-full pt-10">
            <div className="flex items-center gap-3 md:justify-between">
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
              <div className="flex items-center ">
                <input
                  onChange={(e) => setSearchvalue(e.target?.value)}
                  type="text"
                  className="w-40 h-10 pl-2 mt-2 ml-3 border-2 border-gray-500 rounded-lg outline-none lg:w-60 md:w-60 placeholder:text-gray-500"
                  placeholder="Serach user"
                />
                <Button onClick={handelUserSearch}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 256 256"
                    className="rounded-md bg-purple p-1.5 text-white"
                  >
                    <path
                      fill="currentColor"
                      d="m226.83 221.17l-52.7-52.7a84.1 84.1 0 1 0-5.66 5.66l52.7 52.7a4 4 0 0 0 5.66-5.66M36 112a76 76 0 1 1 76 76a76.08 76.08 0 0 1-76-76"
                    />
                  </svg>
                </Button>
              </div>
            </div>
            <section>
              <div className="flex flex-col px-2">
                <div className="overflow-x-auto">
                  <div className="w-full pt-10 overflow-x-auto overflow-y-auto h-[700px]">
                    {isLoading ? (
                      <div className="flex justify-center">
                        <Loading />
                      </div>
                    ) : (
                      <table className="w-full mb-4 bg-white border divide-y divide-gray-200 rounded shadow-md dark:divide-gray-700">
                        <thead className="border-b-2">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Firstname
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Lastname
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Email
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Role
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 font-medium text-gray-500 uppercase text-end"
                            ></th>
                            <th
                              scope="col"
                              className="px-6 py-3 font-medium text-gray-500 uppercase text-end"
                            ></th>
                          </tr>
                        </thead>

                        <tbody className="w-full text-sm font-light text-center divide-y divide-gray-200 dark:divide-gray-700">
                          {currentItems?.map((e) => {
                            return (
                              <>
                                <tr>
                                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                    {e?.firstname}
                                  </td>
                                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                    {e?.lastname}
                                  </td>
                                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                    {e?.email}
                                  </td>
                                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                    {e?.role}
                                  </td>
                                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap "></td>
                                  <td className="px-6 py-4 text-gray-800 whitespace-nowrap "></td>
                                  <td className="px-6 py-4 whitespace-nowrap text-end">
                                    <Dialog>
                                      <DialogTrigger>
                                        <button
                                          type="button"
                                          className="inline-flex items-center text-sm font-semibold cursor-pointer text-red gap-x-2"
                                        >
                                          Delete User
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
                                            will permanently delete user account
                                            and remove your data from our
                                            servers.
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
                                              onClick={() => deletUeser(e?._id)}
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
                                    <Button
                                      onClick={() => EiditUser(e?._id)}
                                      type="button"
                                      className="text-sm font-semibold text-center text-blue-600 rounded-lg cursor-pointer gap-x-2"
                                    >
                                      View User
                                    </Button>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                    <ReactPaginate
                      previousLabel={
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 1024 1024"
                            className="p-1 rounded-full h-7 w-7 active:bg-purple active:text-white"
                          >
                            <path
                              fill="currentColor"
                              d="m272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 0 0 0 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9z"
                            />
                          </svg>
                        </span>
                      }
                      nextLabel={
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 1024 1024"
                            className="p-1 rounded-full h-7 w-7 active:bg-purple active:text-white"
                          >
                            <path
                              fill="currentColor"
                              d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512L181.7 851.1A7.98 7.98 0 0 0 188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5m304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512L485.7 851.1A7.98 7.98 0 0 0 492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5"
                            />
                          </svg>
                        </span>
                      }
                      // breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName="flex items-center justify-center my-8 gap-4 "
                      pageClassName="border rounded-full block hover:bg-purple hover:text-white w-10 h-10 flex justify-center items-center "
                      pageLinkClassName="page-link"
                      activeClassName="bg-purple text-white"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
export default User;
