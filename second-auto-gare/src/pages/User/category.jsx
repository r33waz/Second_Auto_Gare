import React, { useState } from "react";
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
import useSWR from "swr";
import { getData } from "../../service/axiosservice";
import FilterCarTabs from "../../components/filtercar";
function Category() {
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useSWR("api/v1/get_allvehicles", (url) =>
    getData(url).then((res) => res)
  );
  console.log(data);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
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
                <div
                  className={`flex gap-2  duration-700 ${
                    open ? "lg:w-full md:w-full w-60" : "w-0 "
                  }`}
                >
                  <input
                    type="text"
                    className={` rounded outline-none  placeholder-purple placeholder-opacity-75 text-purple ${
                      open ? "visible overflow-hidden" : "overflow-hidden"
                    }`}
                    placeholder="Search vehicle"
                  />
                </div>
                <button
                  className="text-white rounded-full bg-purple"
                  onClick={() => setOpen(!open)}
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
        <h1 className="text-4xl font-semibold text-center">Browse by Type</h1>
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
              to="/carlisting"
              className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
            >
              Suv
              <img src={Suv} alt="SUV" className="w-12 h-12" />{" "}
              {/* Adjusted size */}
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/carlisting"
              className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
            >
              Sedan
              <img src={Sedan} alt="Sedan" className="w-12 h-12" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/carlisting"
              className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
            >
              Hatchback
              <img src={Hatchback} alt="Hatchback" className="w-12 h-12" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/carlisting"
              className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
            >
              Hybrid
              <img src={Hybrid} alt="Hybrid" className="w-12 h-12" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/carlisting"
              className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
            >
              Van
              <img src={Van} alt="Van" className="w-12 h-12" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link
              to="/carlisting"
              className="bg-white gap-2 flex flex-col items-center lg:w-40 md:w-52 w-40 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]"
            >
              Truck
              <img src={Truck} alt="Truck" className="w-12 h-12" />
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <Link
              to="/carlisting"
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
        <FilterCarTabs />
      </section>
      {/*  */}
      <section>
        <Fade duration={2000}>
          <div className="flex justify-evenly items-center lg:flex-nowrap md:flex-nowrap gap-10 flex-wrap md:mt-16 mt-8 lg:px-12 md:px-12 px-2">
            <div className="w-full rounded-md bg-red bg-opacity-20 lg:p-16 md:p-12 p-8 shadow-xl">
              <div className="relative flex flex-col gap-7">
                <h1 className="font-semibold lg:text-4xl md:text-2xl w-72">
                  Are You Looking For a Car ?
                </h1>
                <span className="lg:w-[400px]">
                  We are committed to providing our customers with exceptional
                  service.{" "}
                </span>
                <Link
                  to="/"
                  className="bg-black text-white px-6 py-2 h-10 w-fit  rounded-lg"
                >
                  Get Started →
                </Link>
                <img
                  src={searchCar}
                  className="w-32 h-32 absolute right-10 -bottom-5 lg:opacity-100 md:opacity-100 opacity-0"
                />
              </div>
            </div>
            <div className="w-full rounded-md bg-purple bg-opacity-20 lg:p-16 md:p-12 p-8 shadow-xl">
              <div className="relative flex flex-col gap-7">
                <h1 className="font-semibold lg:text-4xl md:text-2xl w-64">
                  Do You Want to Sell a Car ?
                </h1>
                <span className="lg:w-[400px]">
                  We are committed to providing our customers with exceptional
                  service.{" "}
                </span>
                <Link
                  to="/"
                  className="bg-black text-white px-6 py-2 h-10 w-fit  rounded-lg"
                >
                  Get Started →
                </Link>
                <img
                  src={sellCar}
                  className="w-32 h-32 absolute right-10 -bottom-5 lg:opacity-100 md:opacity-100 opacity-0"
                />
              </div>
            </div>
          </div>
        </Fade>
      </section>
      {/*latest cars*/}
      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 24 24"
            className="text-purple animate-spin"
          >
            <g fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="4" cy="12" r="1" />
              <circle cx="12" cy="12" r="1" />
              <circle cx="20" cy="12" r="1" />
            </g>
          </svg>
        </div>
      ) : (
        <section className="md:mt-16 mt-8 lg:px-12 md:px-12 px-2">
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
              className=" py-10"
            >
              {data?.data?.slice(0, 10).map((e, index) => (
                <SwiperSlide key={index}>
                  <CarCard>
                    <div className="flex flex-col">
                      <img
                        src={e.imageUrl[0]?.url}
                        alt={`Image ${index}`}
                        className="h-48 object-cover rounded-tr-2xl rounded-tl-2xl"
                      />
                      <div className="flex flex-col py-2 px-2.5 gap-3">
                        <NavLink
                          to={`/car/${e._id}`}
                          className="text-white text-lg font-medium hover:underline hover:underline-offset-4"
                        >
                          {e?.model + " - " + e?.year}
                        </NavLink>
                        <p className="text-white text-sm">
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
                        <div className="flex justify-between text-white py-2">
                          <p>
                            Rs{":"}
                            <span className=" font-semibold">{e?.price}</span>
                          </p>
                          <NavLink to={`/car/${e._id}`}>View Details →</NavLink>
                        </div>
                      </div>
                    </div>
                  </CarCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      )}
    </div>
  );
}

export default Category;
