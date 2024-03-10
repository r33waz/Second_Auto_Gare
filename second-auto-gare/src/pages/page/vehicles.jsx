import React, { useEffect, useState } from "react";
import sideProfileCar from "../../assets/images/sideprofile.png";
import { Fade } from "react-awesome-reveal";
import { Link, NavLink } from "react-router-dom";
import Suv from "../../assets/images/suv.png";
import Sedan from "../../assets/images/sedan.png";
import Hatchback from "../../assets/images/hatchback.png";
import Hybrid from "../../assets/images/hybrid.png";
import Van from "../../assets/images/delivery-van.png";
import Truck from "../../assets/images/container.png";
import Electric from "../../assets/images/electric-car.png";
import searchCar from "../../assets/images/searching.png";
import sellCar from "../../assets/images/shopping.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import { HeroTitle } from "../../components/common/title";
import { CarCard } from "../../components/common/card";
// import { setVehicles } from "../../redux/slice/vehicleslice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../shadcn_ui/ui/tabs";
import { FetchVehicle } from "../../redux/vehicleslice/vehiclethunk";

function Vehicle() {
  const dispatch = useDispatch();
  const { data: vehicle, isLoading } = useSelector((state) => state?.vehicle);
  console.log("redux vehicle", vehicle);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  useEffect(() => {
    dispatch(FetchVehicle());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }
  return (
    <>
      {vehicle && (
        <div className="container mx-auto">
          <section className="pt-8 lg:pt-28 md:pt-14 bg-light-bg">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-5 lg:gap-10 md:gap-10">
                <Fade cascade>
                  <h2 className="tracking-widest">
                    Find cars for sale and for rent near you
                  </h2>
                  <h1 className="text-2xl font-semibold lg:text-6xl md:text-4xl">
                    Find Your Dream Car
                  </h1>
                  {/* drop downs for brands , models, years,price*/}
                  <img
                    src={sideProfileCar}
                    alt="image"
                    className="object-cover w-full"
                  />
                </Fade>
              </div>
            </div>
          </section>
          <section className="pt-8 lg:pt-16 md:pt-14">
            <h1 className="text-4xl font-semibold text-center">
              Browse by Type
            </h1>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 50,
                },
              }}
              className="px-24 py-10 lg:px-12 md:px-12"
            >
              <SwiperSlide className="z-30 w-20 h-10">
                <Link
                  to="/car/suv"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Suv
                  <img src={Suv} alt="SUV" className="w-8 h-8" />{" "}
                  {/* Adjusted size */}
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  to="/car/sedan"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Sedan
                  <img src={Sedan} alt="Sedan" className="w-12 h-12" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  to="/car/hatchback"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Hatchback
                  <img src={Hatchback} alt="Hatchback" className="w-12 h-12" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  to="/car/hybrid"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Hybrid
                  <img src={Hybrid} alt="Hybrid" className="w-12 h-12" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  to="/car/van"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Van
                  <img src={Van} alt="Van" className="w-12 h-12" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                <Link
                  to="/car/truck"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Truck
                  <img src={Truck} alt="Truck" className="w-12 h-12" />
                </Link>
              </SwiperSlide>
              <SwiperSlide>
                {" "}
                <Link
                  to="/car/electric"
                  className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
                >
                  Electric
                  <img src={Electric} alt="Electric" className="w-12 h-12" />
                </Link>
              </SwiperSlide>
            </Swiper>
          </section>
          {/* for most search cars */}
          <section>
            <div className="container mx-auto">
              <HeroTitle>
                <h1 className="text-center">Most searched cars</h1>
              </HeroTitle>
              <section className="px-2 mt-8 md:mt-16 lg:px-12 md:px-12">
                <Tabs defaultValue="sedan" className="w-full ">
                  <TabsList className="flex justify-center gap-5 ">
                    <TabsTrigger
                      value="sedan"
                      className="px-2 vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
                    >
                      Sedan
                    </TabsTrigger>
                    <TabsTrigger
                      value="SUV"
                      className="px-2 vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
                    >
                      SUV
                    </TabsTrigger>
                    <TabsTrigger
                      value="luxury"
                      className="px-2 vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
                    >
                      Luxury
                    </TabsTrigger>
                    <TabsTrigger
                      value="hatchback"
                      className="px-2 vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
                    >
                      Hatchback
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="sedan">
                    <div>
                      {vehicle?.slice(0, 10).filter((vehicle) => {
                        return vehicle.category === "sedan";
                      }).length > 0 ? (
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          pagination={{
                            clickable: true,
                          }}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 50,
                            },
                          }}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="py-10 "
                        >
                          {vehicle
                            ?.slice(0, 10)
                            .filter((vehicle) => {
                              return vehicle.category === "sedan";
                            })
                            .map((e, index) => (
                              <SwiperSlide key={index}>
                                <CarCard>
                                  <div className="relative flex flex-col">
                                    <img
                                      src={e.imageUrl[0]?.url}
                                      alt={`Image ${index}`}
                                      className="object-cover h-48 rounded-tr-2xl rounded-tl-2xl"
                                    />
                                    <div className="flex flex-col py-2 px-2.5 gap-3">
                                      <Link
                                        to={`/vehicle/${e._id}`}
                                        className="text-lg font-medium text-white hover:underline hover:underline-offset-4"
                                      >
                                        {e?.model + " - " + e?.year}
                                      </Link>
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
                                            {e?.kilometer}km
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
                                            {capitalizeFirstLetter(
                                              e?.fule_type
                                            )}
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
                                            {capitalizeFirstLetter(
                                              e?.transmission
                                            )}
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
                                        <Link to={`/vehicle/${e._id}`}>
                                          View Details →
                                        </Link>
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
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      ) : (
                        <div className="text-xl text-center">
                          No sedan vehicles found
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="SUV">
                    <div>
                      {vehicle?.slice(0, 10).filter((vehicle) => {
                        return vehicle.category === "SUV";
                      }).length > 0 ? (
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          pagination={{
                            clickable: true,
                          }}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 50,
                            },
                          }}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="py-10 "
                        >
                          {vehicle
                            ?.slice(0, 10)
                            .filter((vehicle) => {
                              return vehicle.category === "SUV";
                            })
                            .map((e, index) => (
                              <SwiperSlide key={index}>
                                <CarCard>
                                  <div className="relative flex flex-col">
                                    <img
                                      src={e.imageUrl[0]?.url}
                                      alt={`Image ${index}`}
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
                                            {e?.kilometer}km
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
                                            {capitalizeFirstLetter(
                                              e?.fule_type
                                            )}
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
                                            {capitalizeFirstLetter(
                                              e?.transmission
                                            )}
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
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      ) : (
                        <div className="text-xl text-center">
                          No suv vehicles found
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="luxury">
                    <div>
                      {vehicle?.slice(0, 10).filter((vehicle) => {
                        return vehicle.category === "luxury";
                      }).length > 0 ? (
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          pagination={{
                            clickable: true,
                          }}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 50,
                            },
                          }}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="py-10 "
                        >
                          {data?.data
                            ?.slice(0, 10)
                            .filter((vehicle) => {
                              return vehicle.category === "luxury";
                            })
                            .map((e, index) => (
                              <SwiperSlide key={index}>
                                <CarCard>
                                  <div className="relative flex flex-col">
                                    <img
                                      src={e.imageUrl[0]?.url}
                                      alt={`Image ${index}`}
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
                                            {e?.kilometer}km
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
                                            {capitalizeFirstLetter(
                                              e?.fule_type
                                            )}
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
                                            {capitalizeFirstLetter(
                                              e?.transmission
                                            )}
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
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      ) : (
                        <div className="text-xl text-center">
                          No luxury vehicles found
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="hatchback">
                    <div>
                      {vehicle?.slice(0, 10).filter((vehicle) => {
                        return vehicle.category === "hatchback";
                      }).length > 0 ? (
                        <Swiper
                          slidesPerView={1}
                          spaceBetween={10}
                          pagination={{
                            clickable: true,
                          }}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                          }}
                          breakpoints={{
                            640: {
                              slidesPerView: 1,
                              spaceBetween: 20,
                            },
                            768: {
                              slidesPerView: 4,
                              spaceBetween: 40,
                            },
                            1024: {
                              slidesPerView: 4,
                              spaceBetween: 50,
                            },
                          }}
                          modules={[Autoplay, Pagination, Navigation]}
                          className="py-10 "
                        >
                          {vehicle
                            ?.slice(0, 10)
                            .filter((vehicle) => {
                              return vehicle.category === "hatchback";
                            })
                            .map((e, index) => (
                              <SwiperSlide key={index}>
                                <CarCard>
                                  <div className="relative flex flex-col">
                                    <img
                                      src={e.imageUrl[0]?.url}
                                      alt={`Image ${index}`}
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
                                            {e?.kilometer}km
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
                                            {capitalizeFirstLetter(
                                              e?.fule_type
                                            )}
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
                                            {capitalizeFirstLetter(
                                              e?.transmission
                                            )}
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
                              </SwiperSlide>
                            ))}
                        </Swiper>
                      ) : (
                        <div className="text-xl text-center">
                          No hatchback vehicles
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </section>
            </div>
          </section>
          {/*  */}
          <section>
            <Fade duration={2000}>
              <div className="flex flex-wrap items-center gap-10 px-2 mt-8 justify-evenly lg:flex-nowrap md:flex-nowrap md:mt-16 lg:px-12 md:px-12">
                <div className="w-full p-8 rounded-md shadow-xl bg-red bg-opacity-20 lg:p-16 md:p-12">
                  <div className="relative flex flex-col gap-7">
                    <h1 className="font-semibold lg:text-4xl md:text-2xl w-72">
                      Are You Looking For a Car ?
                    </h1>
                    <span className="lg:w-[400px]">
                      We are committed to providing our customers with
                      exceptional service.{" "}
                    </span>
                    <Link
                      to="/"
                      className="h-10 px-6 py-2 text-white bg-black rounded-lg w-fit"
                    >
                      Get Started →
                    </Link>
                    <img
                      src={searchCar}
                      className="absolute w-32 h-32 opacity-0 right-10 -bottom-5 lg:opacity-100 md:opacity-100"
                    />
                  </div>
                </div>
                <div className="w-full p-8 rounded-md shadow-xl bg-purple bg-opacity-20 lg:p-16 md:p-12">
                  <div className="relative flex flex-col gap-7">
                    <h1 className="w-64 font-semibold lg:text-4xl md:text-2xl">
                      Do You Want to Sell a Car ?
                    </h1>
                    <span className="lg:w-[400px]">
                      We are committed to providing our customers with
                      exceptional service.{" "}
                    </span>
                    <Link
                      to="/"
                      className="h-10 px-6 py-2 text-white bg-black rounded-lg w-fit"
                    >
                      Get Started →
                    </Link>
                    <img
                      src={sellCar}
                      className="absolute w-32 h-32 opacity-0 right-10 -bottom-5 lg:opacity-100 md:opacity-100"
                    />
                  </div>
                </div>
              </div>
            </Fade>
          </section>
          {/*latest cars*/}
          {isLoading ? (
            <div className="flex items-center justify-center h-60">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                className="text-purple animate-spin"
              >
                <g fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="4" cy="12" r="1" />
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="20" cy="12" r="1" />
                </g>
              </svg>
            </div>
          ) : (
            <section className="px-2 mt-8 md:mt-16 lg:px-12 md:px-12">
              <HeroTitle>
                <h1 className="text-center">Latest Cars</h1>
              </HeroTitle>
              <div>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView: 4,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="py-10 "
                >
                  {vehicle?.slice(0, 10).map((e, index) => (
                    <SwiperSlide key={index}>
                      <CarCard>
                        <div className="relative flex flex-col">
                          <img
                            src={e.imageUrl[0]?.url}
                            alt={`Image ${index}`}
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
                                  {e?.kilometer}km
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
                              <Link to={`/vehicle/${e._id}`}>
                                View Details →
                              </Link>
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
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
}

export default Vehicle;
