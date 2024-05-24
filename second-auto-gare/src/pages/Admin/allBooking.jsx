import { Button } from "../../shadcn_ui/ui/button";
import Loading from "../../components/common/loading";
import SideNav from "../../components/common/SlideNav";
import { GetAllBooking } from "../../redux/booking/bookingthunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import ErrorImage from "../../assets/images/ErrorImage.png";

function AllBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [itemsPerPage] = useState(20);
  const [itemOffset, setItemOffset] = useState(0);

  const { data, isLoading } = useSelector((state) => state.booking);
  console.log(data);

  useEffect(() => {
    dispatch(GetAllBooking());
  }, [dispatch]);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentItems?.length / itemsPerPage);
  console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const viewDetails = (id) => {
    console.log(id);
    navigate(`/admin/booking_detail/${id}`);
  };

  return (
    <>
      <div className="flex justify-between w-full h-full">
        <SideNav />
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-screen">
            <Loading />
          </div>
        ) : (
          <section className="flex flex-col w-full gap-5 p-4 overflow-x-auto">
            <h1 className="text-4xl">Booking Details </h1>
            <div className={`w-full pt-10 overflow-x-auto overflow-y-auto `}>
              <table
                className={`w-full mb-4 bg-white border rounded shadow-md ${
                  currentItems.length > 20 ? "h-20" : "h-20"
                }`}
              >
                <thead className="border-b-2">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                      Image
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                      Booked By
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                      Vehicle Brand
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase">
                      Vehicle Model
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-center text-gray-500 uppercase"></th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light divide-y divide-gray-200 dark:divide-gray-700">
                  {currentItems?.map((e) => {
                    return (
                      <>
                        <tr className="text-center">
                          <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                            <img
                              src={
                                e?.user?.photo?.url
                                  ? e?.user?.photo?.url
                                  : ErrorImage
                              }
                              alt="img"
                              className="w-10 h-10 rounded-full"
                            />
                          </td>
                          <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                            {e?.user?.firstname && e.user?.lastname
                              ? e?.user?.firstname + " " + e.user?.lastname
                              : "-"}
                          </td>
                          <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                            {e?.startDate}
                          </td>
                          <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                            {e?.endDate}
                          </td>
                          <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                            {e?.vehicle?.brand || "-"}
                          </td>
                          <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                            {e?.vehicle?.model || "-"}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-blue whitespace-nowrap text-end">
                            <Button
                              onClick={() => viewDetails(e?._id)}
                              type="button"
                              className="text-sm font-semibold text-center text-blue-600 rounded-lg cursor-pointer gap-x-2"
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
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
                containerClassName="flex items-center justify-end mt-2 gap-4 "
                pageClassName="border rounded-full block hover:bg-purple hover:text-white w-10 h-10 flex justify-center items-center "
                pageLinkClassName="page-link"
                activeClassName="bg-purple text-white"
              />
            </div>
          </section>
        )}
      </div>
    </>
  );
}

export default AllBooking;
