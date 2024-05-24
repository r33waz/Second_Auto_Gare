import React, { useState } from "react";
import { Card } from "../../components/common/card";
import { useEffect } from "react";
import { Button } from "../../shadcn_ui/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../shadcn_ui/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import ErrorImage from "../../assets/images/ErrorImage.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation } from "swiper/modules";
import SideNav from "../../components/common/SlideNav";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchVehicle,
  SearchVehicle,
} from "../../redux/vehicleslice/vehiclethunk";
import Loading from "../../components/common/loading";
import { useNavigate } from "react-router-dom";
import { Zoom } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import ReactPaginate from "react-paginate";

function Vehicle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchVehicle, setSearchVehicle] = useState({
    brand: "",
    category: "",
    transmission: "",
    fule_type: "",
    color: "",
    year: "",
  });

  console.log("searchVehicle", searchVehicle);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSearchVehicle((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const [itemsPerPage] = useState(12);
  const [itemOffset, setItemOffset] = useState(0);
  const { searchVehicle: vehicle, searchVehicleLoading: isLoading } =
    useSelector((state) => state.vehicle);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = vehicle?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(currentItems?.length / itemsPerPage);
  console.log(currentItems);
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % vehicle?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 2001; year--) {
    years.push(year);
  }

  useEffect(() => {
    dispatch(
      SearchVehicle({
        brand: "",
        category: "",
        transmission: "",
        fule_type: "",
        color: "",
        year: "",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      SearchVehicle({
        brand: searchVehicle.brand ? searchVehicle?.brand : "",
        category: searchVehicle?.category ? searchVehicle.category : "",
        transmission: searchVehicle?.transmission
          ? searchVehicle?.transmission
          : "",
        fule_type: searchVehicle.fule_type ? searchVehicle.fule_type : "",
        color: searchVehicle.color ? searchVehicle.color : "",
        year: parseInt(searchVehicle.year) ? parseInt(searchVehicle.year) : "",
      })
    );
  }, [searchVehicle]);

  const viewDetails = (id) => {
    navigate(`/admin/vehicle_detail/${id}`);
  };

  if (isLoading) {
    <Loading/>
  }
  return (
    <>
      <div className="flex w-full">
        <SideNav />
        <div className="flex flex-col w-full pt-5">
          <h2 className="text-4xl">Vehicle Deatils </h2>
          <div className="w-full px-2 mt-5">
            <Zoom cascade triggerOnce={true}>
              <div className="flex flex-wrap items-center justify-between w-full gap-2 md:flex-nowrap">
                <div className="flex flex-col w-full gap-1 p-1 border-2 rounded-lg">
                  <label className="text-sm font-light text-purple">
                    Filter by brand
                  </label>
                  <select
                    className="h-8 pl-2 overflow-auto text-sm transition duration-500 ease-in-out rounded"
                    id="brand"
                    value={searchVehicle.brand}
                    onChange={handleChange}
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
                <div className="flex flex-col w-full gap-1 p-1 border-2 rounded-lg">
                  <label className="text-sm font-light text-purple">
                    Filter by brand
                  </label>
                  <select
                    id="year"
                    className="w-full h-8 px-2 overflow-auto transition duration-500 ease-in-out bg-white rounded outline-none"
                    value={searchVehicle.year}
                    onChange={handleChange}
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full gap-1 p-1 border-2 rounded-lg">
                  <label className="text-sm font-light text-purple">
                    Filter by category
                  </label>
                  <select
                    className="h-8 pl-2 overflow-auto text-sm transition duration-500 ease-in-out rounded"
                    id="category"
                    value={searchVehicle.category}
                    onChange={handleChange}
                  >
                    <option value="" className="text-gray-500">
                      Select Category
                    </option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Van">Van</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Truck">Truck</option>
                  </select>
                </div>
                <div className="flex flex-col w-full gap-1 p-1 border-2 rounded-lg">
                  <label className="text-sm font-light text-purple">
                    Filter by color
                  </label>
                  <select
                    className="h-8 pl-2 overflow-auto text-sm transition duration-500 ease-in-out rounded"
                    id="color"
                    value={searchVehicle.color}
                    onChange={handleChange}
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
                <div className="flex flex-col w-full gap-1 p-1 border-2 rounded-lg">
                  <label className="text-sm font-light text-purple">
                    Filter by transmission
                  </label>
                  <select
                    className="h-8 pl-2 overflow-auto text-sm transition duration-500 ease-in-out "
                    id="transmission"
                    value={searchVehicle.transmission}
                    onChange={handleChange}
                  >
                    <option value="" className="text-gray-500">
                      Select Transmission
                    </option>
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div className="flex flex-col w-full gap-1 p-1 border-2 rounded-lg ">
                  <label className="text-sm font-light text-purple">
                    Filter by fuel type
                  </label>
                  <select
                    className="h-8 pl-2 overflow-auto text-sm transition duration-500 ease-in-out "
                    id="fule_type"
                    value={searchVehicle.fule_type}
                    onChange={handleChange}
                  >
                    <option value="" className="text-gray-500">
                      Select Fuel Type
                    </option>
                    <option value="petrol">Petrol</option>
                    <option value="desele">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
              </div>
            </Zoom>

            <Tabs defaultValue="sell" className="w-full mt-3">
              <TabsList className="grid w-full grid-cols-2 gap-4 bg-gray-500 bg-opacity-40">
                <TabsTrigger
                  className="w-full vehicle-sell h-8  data-[state=active]:bg-red rounded-md data-[state=active]:text-white text-lg duration-500"
                  value="sell"
                >
                  Sell
                </TabsTrigger>
                <TabsTrigger
                  value="rent"
                  className="w-full h-8 vehicle-rent rounded-md data-[state=active]:bg-green data-[state=active]:text-white text-lg duration-300"
                >
                  Rent
                </TabsTrigger>
              </TabsList>
              {currentItems.length > 0 ? (
                <>
                  <TabsContent value="sell">
                    <>
                      <table className="w-full mb-4 bg-white border divide-y divide-gray-200 rounded shadow-md dark:divide-gray-700">
                        <thead className="border-b-2">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            ></th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              User Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Brand
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Model
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Year
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 font-medium text-gray-500 uppercase text-end"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicle
                            ?.filter((e) => e.status === "sell")
                            .map((e) => {
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
                                        ? e?.user?.firstname +
                                          " " +
                                          e.user?.lastname
                                        : "-"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                      {e?.brand}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                      {e?.model}
                                    </td>
                                    <td
                                      className={`px-6 py-4 text-gray-800 whitespace-nowrap ${
                                        e?.status ? "text-red" : ""
                                      } `}
                                    >
                                      {e?.status}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                      {e?.year}
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
                        containerClassName="flex items-center justify-center my-8 gap-4 "
                        pageClassName="border rounded-full block hover:bg-purple hover:text-white w-10 h-10 flex justify-center items-center "
                        pageLinkClassName="page-link"
                        activeClassName="bg-purple text-white"
                      />
                    </>
                  </TabsContent>

                  <TabsContent value="rent">
                    <div className={`w-full`}>
                      <table className="w-full mb-4 bg-white border divide-y divide-gray-200 rounded shadow-md dark:divide-gray-700">
                        <thead className="border-b-2">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            ></th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              User Name
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Brand
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Model
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-sm font-medium text-center text-gray-500 uppercase"
                            >
                              Year
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 font-medium text-gray-500 uppercase text-end"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicle
                            ?.filter((e) => e.status === "rent")
                            .map((e) => {
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
                                        ? e?.user?.firstname +
                                          " " +
                                          e.user?.lastname
                                        : "-"}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                      {e?.brand}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                      {e?.model}
                                    </td>
                                    <td
                                      className={`px-6 py-4 text-gray-800 whitespace-nowrap ${
                                        e?.status ? "text-red" : ""
                                      } `}
                                    >
                                      {e?.status}
                                    </td>
                                    <td className="px-6 py-4 text-gray-800 whitespace-nowrap ">
                                      {e?.year}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-blue whitespace-nowrap text-end">
                                      <Button
                                        // onClick={() => viewDetails(e?._id)}
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
                        containerClassName="flex items-center justify-center my-8 gap-4 "
                        pageClassName="border rounded-full block hover:bg-purple hover:text-white w-10 h-10 flex justify-center items-center "
                        pageLinkClassName="page-link"
                        activeClassName="bg-purple text-white"
                      />
                    </div>
                  </TabsContent>
                </>
              ) : (
                <div className="flex justify-center">No vehicle found🚗</div>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}

export default Vehicle;
