import React, { useEffect, useRef, useState } from "react";
import { HeroSubtitle } from "../../components/common/title";
import Loading from "../../components/common/loading";
import { getData } from "../../service/axiosservice";
import { Link, NavLink, useParams } from "react-router-dom";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { CarCard } from "../../components/common/card";

function Category() {
  const category = useParams();
  const [selectedValue, setSelectedValue] = useState(null);
  console.log(selectedValue);
  const [vehicle, setVehicle] = useState([]);
  const [itemsPerPage] = useState(12);
  const inputRef = useRef();

  const { data, isLoading } = useSWR(
    `api/v1/vehicle/category/?category=${
      category?.vehicle
    }&max=${""}&min=${""}`,
    (url) => getData(url).then((res) => res)
  );
  // console.log(vehicle);

  const handelOpen = () => {
    const inputField = inputRef.current;
    const currentWidth = inputField.offsetWidth;

    if (currentWidth === 0) {
      inputField.style.width = "200px";
      inputField.style.border = "gray";
    } else {
      inputField.style.width = "0";
      inputField.style.border = "none";
    }
  };

 

  useEffect(() => {
    setVehicle(data?.data);
  }, [data]);

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = vehicle
    ?.filter((vehicle) => vehicle.status === "sell")
    .slice(itemOffset, endOffset);
  const pageCount = Math.ceil(vehicle?.length / itemsPerPage);
  console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % vehicle?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* <div className="relative">
        <button
          className="w-full px-4 py-2 text-left bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={toggleDropdown}
        >
          <svg
            className="w-5 h-5 ml-2 -mr-1 text-gray-400"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 10l4 4 4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <li
              className="relative py-2 pl-3 text-gray-900 cursor-default select-none pr-9"
              aria-disabled="true"
              tabIndex="-1"
            >
              -- Select an option --
            </li>

            <li
              value="Hello"
              className="cursor-pointer"
              onClick={(e) => setSelectedValue(e.target.value)}
            >
              Category 1
            </li>

            <li
              value="Car"
              className="cursor-pointer"
              onClick={(e) => setSelectedValue(e.target.value)}
            >
              Category 2
            </li>

            <li
              value="Jeep"
              className="cursor-pointer"
              onClick={(e) => setSelectedValue(e.target.value)}
            >
              Category 3
            </li>
          </ul>
        )}
      </div> */}
      <div className="px-2 md:mt-16 lg:px-12 md:px-12">
        <div className="flex items-center justify-start gap-3">
          <Link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-purple"
            >
              <path
                fill="currentColor"
                d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12m18 0c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M8 12l4-4l1.41 1.41L11.83 11H16v2h-4.17l1.59 1.59L12 16z"
              />
            </svg>
          </Link>
          <span className="text-xs font-light uppercase text-purple">
            Vehicles / {category?.vehicle}
          </span>
        </div>
        <section className="flex justify-center">
          <div className="bg-white flex items-center lg:flex-nowrap gap-4 md:flex-nowrap flex-wrap lg:w-[1000px] md:w-[900-px] w-full  justify-between border-2 shadow-md border-gray-400 lg:rounded-full py-4 px-6">
            <div className="w-full border-b-2 border-gray-500 lg:border-r-2 md:border-r-2 lg:border-b-0 md:border-b-0">
              <select className="w-full bg-white">
                <option value="" disabled selected>
                  Model
                </option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>
            {/* for model */}
            <div className="w-full border-b-2 border-gray-500 lg:border-r-2 md:border-r-2 lg:border-b-0 md:border-b-0">
              <select className="w-full bg-white">
                <option value="" disabled selected>
                  Brand
                </option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>

            {/* for category */}
            <div className="w-full border-b-2 border-gray-500 lg:border-r-2 md:border-r-2 lg:border-b-0 md:border-b-0">
              <select className="w-full bg-white">
                <option value="" disabled selected>
                  Transmission
                </option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>
            {/*for more option*/}
            <div className="w-full border-b-2 border-gray-500 lg:border-r-2 md:border-r-2 lg:border-b-0 md:border-b-0">
              <select className="w-full bg-white">
                <option value="" disabled selected>
                  Fule type
                </option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>
            <div className="w-full ">
              <select className="w-full bg-white">
                <option value="" disabled selected>
                  More filter
                </option>
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </div>
            <div>
              <input
                ref={inputRef}
                type="text"
                className="w-0 outline-none placeholder-purple"
                placeholder="Search vehicle"
              />
            </div>
            <button
              className="text-white rounded-full bg-purple"
              onClick={handelOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                className="p-1"
              >
                <path
                  fill="currentColor"
                  d="M15.096 5.904a6.5 6.5 0 1 0-9.192 9.192a6.5 6.5 0 0 0 9.192-9.192M4.49 4.49a8.5 8.5 0 0 1 12.686 11.272l5.345 5.345l-1.414 1.414l-5.345-5.345A8.501 8.501 0 0 1 4.49 4.49"
                />
              </svg>
            </button>
          </div>
        </section>
        <section className="mt-4 md:mt-8">
          <div className="flex flex-col gap-4">
            <HeroSubtitle className="hidden md:visible ">
              Collection of{" "}
              <span className="uppercase text-purple">{category?.vehicle}</span>
            </HeroSubtitle>
            <p className="text-sm">
              Showing all {vehicle ? vehicle.length : 0} results{" "}
            </p>
          </div>
        </section>

        {/*  */}
        {!vehicle ? (
          <div className="flex justify-center md:text-3xl">
            No vehicle found
          </div>
        ) : (
          <section className="mt-4 md:mt-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {currentItems.map((e) => {
                return (
                  <CarCard key={e.id}>
                    <div className="relative flex flex-col">
                      <img
                        src={e.imageUrl[0]?.url}
                        alt={`Image`}
                        className="object-cover h-48 rounded-tr-2xl rounded-tl-2xl"
                      />
                      <div className="flex flex-col py-2 px-2.5 gap-3">
                        <NavLink
                          to={`/vehicle/${e._id}`}
                          className="text-lg font-medium text-white hover:underline hover:underline-offset-4"
                        >
                          {e?.model + " - " + e?.year}
                        </NavLink>
                        <p className="text-sm text-white">
                          {e?.description
                            ? e?.description.slice(0, 40) + "..."
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
                            <span className="text-xs">{e?.kilometer}km</span>
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
                              {capitalizeFirstLetter(e?.fule_type)}
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
                              {capitalizeFirstLetter(e?.transmission)}
                            </span>
                          </div>
                        </div>
                        <hr></hr>
                        <div className="flex justify-between py-2 text-white">
                          <p>
                            Rs{":"}
                            <span className="font-semibold ">{e?.price}</span>
                          </p>
                          <NavLink to={`/vehicle/${e._id}`}>View Details →</NavLink>
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
          </section>
        )}
      </div>
    </div>
  );
}

export default Category;
