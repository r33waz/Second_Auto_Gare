import React from "react";
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
import { FetchVehicle } from "../../redux/vehicleslice/vehiclethunk";
import Loading from "../../components/common/loading";
import { useNavigate } from "react-router-dom";

function Vehicle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: vehicle, isLoadng } = useSelector((state) => state.vehicle);
  console.log(vehicle)
  useEffect(() => {
    dispatch(FetchVehicle());
  }, [dispatch]);

  const viewDetails = (id) => {
    navigate(`/admin/vehicle_detail/${id}`);
  };

  if (isLoadng) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex w-full">
        <SideNav />
        <div className="flex flex-col w-full pt-5">
          <h2 className="text-4xl">Vehicle Deatils </h2>
          <div className="w-full px-2 mt-5">
            <div className="flex flex-wrap items-center justify-between gap-10 md:flex-nowrap">
              <div className="flex flex-col w-full gap-2">
                <label className="text-lg font-light">Filter by brand</label>
                <select
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out border-2 rounded"
                  onChange={(e) =>
                    e.target.value && handelSearch(e.target.value)
                  }
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
              <div className="flex flex-col w-full gap-2">
                <label className="text-lg font-light">Filter by Ctegory</label>
                <select
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out border-2 rounded"
                  onChange={(e) =>
                    e.target.value && handelSearch(e.target.value)
                  }
                >
                  <option value="" className="text-gray-500">
                    Select Category
                  </option>
                  <option value="kia">SUV</option>
                  <option value="hundai">Sedan</option>
                  <option value="nissan">Hatchback</option>
                  <option value="toyota">Van</option>
                  <option value="ford">Hybrid</option>
                  <option value="honda">Truck</option>
                </select>
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="text-lg font-light">Filter by color</label>
                <select
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out border-2 rounded"
                  onChange={(e) =>
                    e.target.value && vehicleSearchColor(e.target.value)
                  }
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
              <div className="flex flex-col w-full gap-2">
                <label className="text-lg font-light">
                  Filter by transmission
                </label>
                <select
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out border-2 rounded"
                  onChange={(e) =>
                    e.target.value && vehicleSearchTransmission(e.target.value)
                  }
                >
                  <option value="" className="text-gray-500">
                    Select Transmission
                  </option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="text-lg font-light">
                  Filter by fule type
                </label>
                <select
                  className="h-8 pl-2 overflow-auto transition duration-500 ease-in-out border-2 rounded"
                  onChange={(e) =>
                    e.target.value && vehicleSearchFule(e.target.value)
                  }
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
            </div>
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
              {vehicle ? (
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
                    </>
                  </TabsContent>

                  <TabsContent value="rent">
                    <div
                      className={`w-full pt-10 overflow-x-auto overflow-y-auto h-[500px]`}
                    >
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
