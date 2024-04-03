import { GetSingleUserBooking } from "../../../redux/booking/bookingthunk";
import { GetSingleUser } from "../../../redux/userslice/userthunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { CarCard } from "../../../components/common/card";

function UserBooking() {
  const dispatch = useDispatch();
  const { login: user } = useSelector((state) => state.login);
  const { data: vehicles } = useSelector((state) => state?.booking);

  console.log("Single data", vehicles);

  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(12);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = vehicles
    ?.filter((vehicle) => vehicle)
    .slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentItems?.length / itemsPerPage);
  console.log("currentItems", currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % vehicles?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(GetSingleUserBooking({ id: user?.id }));
  }, [dispatch, user?.id]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen px-2 mt-8 md:mt-16 lg:px-12 md:px-12">
        <section className="flex items-center">
          <Link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-purple "
            >
              <path
                fill="currentColor"
                d="m12 15.288l.688-.688l-2.1-2.1H15.5v-1h-4.912l2.1-2.1L12 8.712L8.712 12zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
              />
            </svg>
          </Link>
          <span className="text-lg font-light uppercase text-purple">
            {user?.firstname}/Bookings/History
          </span>
        </section>
        <section className="mt-4 md:mt-8">
          {currentItems.length <= 0 ? (
            <div className="flex justify-center text-lg text-gray-400">
              {user?.firstname} have no bookings
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4 ">
                {currentItems?.map((e) => {
                  return (
                    <CarCard key={e.id}>
                      <div className="relative flex flex-col">
                        <img
                          src={e.vehicle?.imageUrl[0]?.url}
                          alt={`Image`}
                          className="object-cover h-48 rounded-tr-2xl rounded-tl-2xl"
                        />
                        <div className="flex flex-col py-2 px-2.5 gap-3">
                          <NavLink
                            to={`/vehicle/${e.vehicle?._id}`}
                            className="text-lg font-medium text-white hover:underline hover:underline-offset-4"
                          >
                            {e.vehicle?.model + " - " + e.vehicle?.year}
                          </NavLink>
                          <p className="text-sm text-white">
                            {e.vehicle?.description
                              ? e.vehicle?.description.slice(0, 40) + "..."
                              : "..."}
                          </p>
                          <hr></hr>
                          <div className="flex justify-between py-2">
                            <div className="flex flex-col items-center text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                                className=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M12 16a3 3 0 0 1-3-3c0-1.12.61-2.1 1.5-2.61l9.71-5.62l-5.53 9.58c-.5.98-1.51 1.65-2.68 1.65m0-13c1.81 0 3.5.5 4.97 1.32l-2.1 1.21C14 5.19 13 5 12 5a8 8 0 0 0-8 8c0 2.21.89 4.21 2.34 5.65h.01c.39.39.39 1.02 0 1.41c-.39.39-1.03.39-1.42.01A9.969 9.969 0 0 1 2 13A10 10 0 0 1 12 3m10 10c0 2.76-1.12 5.26-2.93 7.07c-.39.38-1.02.38-1.41-.01a.996.996 0 0 1 0-1.41A7.95 7.95 0 0 0 20 13c0-1-.19-2-.54-2.9L20.67 8C21.5 9.5 22 11.18 22 13"
                                />
                              </svg>
                              <span className="text-xs">
                                {e.vehicle?.mileage}km
                              </span>
                            </div>
                            {/*  */}
                            <div className="flex flex-col items-center text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="m19.616 6.48l.014-.017l-4-3.24l-1.26 1.554l2.067 1.674a2.99 2.99 0 0 0-1.395 3.058c.149.899.766 1.676 1.565 2.112c.897.49 1.685.446 2.384.197L18.976 18a.996.996 0 0 1-1.39.922a.995.995 0 0 1-.318-.217a.996.996 0 0 1-.291-.705L17 16a2.98 2.98 0 0 0-.877-2.119A3 3 0 0 0 14 13h-1V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2v-4h1c.136 0 .267.027.391.078a1.028 1.028 0 0 1 .531.533A.994.994 0 0 1 15 16l-.024 2c0 .406.079.799.236 1.168c.151.359.368.68.641.951a2.97 2.97 0 0 0 2.123.881c.406 0 .798-.078 1.168-.236c.358-.15.68-.367.951-.641A2.983 2.983 0 0 0 20.976 18L21 9a2.997 2.997 0 0 0-1.384-2.52M4 5h7l.001 4H4zm0 14v-8h7.001l.001 8zm14-9a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                                />
                              </svg>
                              <span className="text-xs">
                                {e.vehicle?.fule_type}
                              </span>
                            </div>
                            {/*  */}
                            <div className="flex flex-col items-center text-white">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="25"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M4 21q-1.25 0-2.125-.875T1 18q0-.975.563-1.75T3 15.175v-6.35q-.875-.3-1.437-1.075T1 6q0-1.25.875-2.125T4 3q1.25 0 2.125.875T7 6q0 .975-.562 1.75T5 8.825V11h6V8.825q-.875-.3-1.437-1.075T9 6q0-1.25.875-2.125T12 3q1.25 0 2.125.875T15 6q0 .975-.562 1.75T13 8.825V11h5q.425 0 .713-.287T19 10V8.825q-.875-.3-1.437-1.075T17 6q0-1.25.875-2.125T20 3q1.25 0 2.125.875T23 6q0 .975-.562 1.75T21 8.825V10q0 1.25-.875 2.125T18 13h-5v2.175q.875.3 1.438 1.075T15 18q0 1.25-.875 2.125T12 21q-1.25 0-2.125-.875T9 18q0-.975.563-1.75T11 15.175V13H5v2.175q.875.3 1.438 1.075T7 18q0 1.25-.875 2.125T4 21m0-2q.425 0 .713-.288T5 18q0-.425-.288-.712T4 17q-.425 0-.712.288T3 18q0 .425.288.713T4 19M4 7q.425 0 .713-.288T5 6q0-.425-.288-.712T4 5q-.425 0-.712.288T3 6q0 .425.288.713T4 7m8 12q.425 0 .713-.288T13 18q0-.425-.288-.712T12 17q-.425 0-.712.288T11 18q0 .425.288.713T12 19m0-12q.425 0 .713-.288T13 6q0-.425-.288-.712T12 5q-.425 0-.712.288T11 6q0 .425.288.713T12 7m8 0q.425 0 .713-.288T21 6q0-.425-.288-.712T20 5q-.425 0-.712.288T19 6q0 .425.288.713T20 7m0-1"
                                />
                              </svg>
                              <span className="text-xs">
                                {e.vehicle?.transmission}
                              </span>
                            </div>
                          </div>
                          <hr></hr>
                          <div className="flex justify-between py-2 text-white">
                            <p>
                              Rs{":"}
                              <span className="font-semibold ">
                                {e.vehicle?.price}
                              </span>
                            </p>
                            <NavLink to={`/vehicle/${e.vehicle?._id}`}>
                              View Details →
                            </NavLink>
                          </div>
                        </div>
                        <button className="absolute top-3 right-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            className="p-1 bg-white rounded-full h-7 w-7"
                          >
                            <path
                              fill="currentColor"
                              d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3zm2-3.05l5-2.15l5 2.15V5H7zM7 5h10z"
                            />
                          </svg>
                        </button>
                      </div>
                    </CarCard>
                  );
                })}
              </div>
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
            </>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserBooking;
