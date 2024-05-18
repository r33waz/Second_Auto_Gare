import React, { useEffect, useRef, useState } from "react";
import { HeroSubtitle } from "../../components/common/title";
import Loading from "../../components/common/loading";
import { getData } from "../../service/axiosservice";
import { Link, NavLink, useParams } from "react-router-dom";
import useSWR from "swr";
import ReactPaginate from "react-paginate";
import { CarCard } from "../../components/common/card";
import { useForm } from "react-hook-form";
import { Button } from "../../shadcn_ui/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { SearchVehicle } from "../../redux/vehicleslice/vehiclethunk";

function Vehicle() {
  const category = useParams();
  console.log(category);
  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(true);
  const { searchVehicle, searchVehicleLoading: isLoading } = useSelector(
    (state) => state.vehicle
  );
  const [itemsPerPage] = useState(12);
  console.log("vehicle", searchVehicle);

  // console.log(vehicle);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2001; year--) {
    years.push(year);
  }

  useEffect(() => {
    dispatch(
      SearchVehicle({
        brand: "",
        category: category?.type,
        transmission: "",
        fule_type: "",
        color: "",
        year: "",
      })
    );
  }, [dispatch, category?.type]);

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = searchVehicle?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentItems?.length / itemsPerPage);
  console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchVehicle?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const { register, handleSubmit } = useForm();

  const Onsubmit = (value) => {
    dispatch(
      SearchVehicle({
        brand: value.brand ? value.brand : "",
        category: value.category ? value.category : category?.type,
        transmission: value.transmission ? value.transmission : "",
        fule_type: value.fule_type ? value.fule_type : "",
        color: value.color ? value.color : "",
        year: parseInt(value.year) ? parseInt(value.year) : "",
      })
    );
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-start gap-3"></div>
      <div className="flex gap-2 px-2">
        <section className="flex flex-col ">
          <form onSubmit={handleSubmit(Onsubmit)}>
            <div
              className={`relative flex flex-col justify-center gap-4 px-6 py-4 bg-white border border-gray-400 mt-14 ${
                isOpen ? "w-60" : "w-0 overflow-x-hidden"
              }`}
            >
              {/* <span
                className={`absolute cursor-pointer right-3 top-3 ${
                  isOpen ? "" : "rotate-180"
                }`}
                onClick={() => setOpen(!isOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 256 256"
                  className="p-0.5 text-white rounded-full bg-purple"
                >
                  <path
                    fill="currentColor"
                    d="M128 28a100 100 0 1 0 100 100A100.11 100.11 0 0 0 128 28m0 192a92 92 0 1 1 92-92a92.1 92.1 0 0 1-92 92m44-92a4 4 0 0 1-4 4H97.66l25.17 25.17a4 4 0 0 1-5.66 5.66l-32-32a4 4 0 0 1 0-5.66l32-32a4 4 0 0 1 5.66 5.66L97.66 124H168a4 4 0 0 1 4 4"
                  />
                </svg>
              </span> */}
              <div className="flex w-full pt-10">
                <select
                  id="brand"
                  {...register("brand")}
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                >
                  <option value="" className="text-gray-500">
                    Select a Brand
                  </option>
                  <option value="kia">KIA</option>
                  <option value="hundai">Hundai</option>
                  <option value="nissan">Nissan</option>
                  <option value="toyota">Toyota</option>
                  <option value="ford">Ford</option>
                  <option value="honda">Honda</option>
                  <option value="mitsubisi">Mitsubisi</option>
                  <option value="renult">Renult</option>
                  <option value="mercedes">Mercedes</option>

                  <option value="bmw">BMW</option>
                  <option value="suzuki">Suzuki</option>
                  <option value="mahendra">Mahendra</option>
                  <option value="jeep">Jeep</option>
                </select>
              </div>
              {/* for model */}
              <div className="w-full ">
                <select
                  id="category"
                  {...register("category", { value: category?.type })}
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                >
                  <option value="" className="text-gray-500">
                    Select Category
                  </option>
                  <option value="suv">SUV</option>
                  <option value="sedan">Sedan</option>
                  <option value="hatchback">Hatchback</option>
                  <option value="van">Van</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="truck">Truck</option>
                </select>
              </div>

              {/* for category */}
              <div className="w-full ">
                <select
                  id="color"
                  {...register("color")}
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                >
                  <option value="" className="text-gray-500">
                    Select Color
                  </option>
                  <option value="red">Red</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="white">White</option>
                  <option value="black">Black</option>
                  <option value="gray">Gray</option>
                </select>
              </div>
              {/*for more option*/}
              <div className="w-full ">
                <select
                  id="transmission"
                  {...register("transmission")}
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                >
                  <option value="" className="text-gray-500">
                    Select Transmission
                  </option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="w-full ">
                <select
                  id="fule_type"
                  {...register("fule_type")}
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                >
                  <option value="" className="text-gray-500">
                    Select Fule Type
                  </option>
                  <option value="petrol">Petrol</option>
                  <option value="desele">Desele</option>
                  <option value="electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="w-full">
                <select
                  id="year"
                  {...register("year")}
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <Button
                type="submit "
                className="flex items-center gap-2 p-1 text-white rounded-full bg-purple"
              >
                {isOpen ? (
                  <>
                    <span>Search</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 256 256"
                    >
                      <path
                        fill="currentColor"
                        d="m226.83 221.17l-52.7-52.7a84.1 84.1 0 1 0-5.66 5.66l52.7 52.7a4 4 0 0 0 5.66-5.66M36 112a76 76 0 1 1 76 76a76.08 76.08 0 0 1-76-76"
                      />
                    </svg>
                  </>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 256 256"
                    className="text-black bg-none"
                  >
                    <path
                      fill="currentColor"
                      d="m226.83 221.17l-52.7-52.7a84.1 84.1 0 1 0-5.66 5.66l52.7 52.7a4 4 0 0 0 5.66-5.66M36 112a76 76 0 1 1 76 76a76.08 76.08 0 0 1-76-76"
                    />
                  </svg>
                )}
              </Button>
            </div>
          </form>
        </section>
        <section className="w-full mt-4 md:mt-8">
          <div className="flex flex-col gap-4">
            <HeroSubtitle className="hidden md:visible ">
              <div className="flex items-center gap-3">
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
                  Vehicles / {category?.type}
                </span>
              </div>
              Collection of{" "}
              <span className="uppercase text-purple">{category?.vehicle}</span>
            </HeroSubtitle>
            <p className="text-sm">
              Showing all {currentItems?.length > 0 ? currentItems?.length : 0}{" "}
              results{" "}
            </p>
          </div>
          {!searchVehicle ? (
            <div className="flex justify-center md:text-3xl">
              No vehicle found
            </div>
          ) : (
            <section className="mt-4 md:mt-8">
              {isLoading ? (
                <Loading />
              ) : (
                <>
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
                                  <span className="text-xs">
                                    {e?.mileage}km
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
                                  <span className="font-semibold ">
                                    {e?.price}
                                  </span>
                                </p>
                                <NavLink to={`/vehicle/${e._id}`}>
                                  View Details →
                                </NavLink>
                              </div>
                            </div>
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
          )}
        </section>

        {/*  */}
      </div>
    </div>
  );
}

export default Vehicle;
