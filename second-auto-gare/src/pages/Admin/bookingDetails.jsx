import { GetSingleBookingInfo } from "../../redux/booking/bookingthunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ErrorImage from "../../assets/images/ErrorImage.png";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Autoplay, Pagination, Navigation } from "swiper/modules";
import { SmallCard } from "../../components/common/card";

function BookingDetails() {
  const { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  const { singleBooking: booking } = useSelector((state) => state.booking);
  console.log(booking);

  useEffect(() => {
    dispatch(GetSingleBookingInfo(id));
  }, [dispatch, id]);
  return (
    <>
      {booking && (
        <div className="container relative mx-auto">
          <div className="px-2 lg:px-12 md:py-12">
            <section className="flex items-center justify-start gap-3">
              <Link to="/admin/allbooking">
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
              <span className="text-lg font-light uppercase text-purple">
                Vehicles / {booking?.vehicle.brand} /{booking?.vehicle.model}
              </span>
            </section>
            {/*  */}
            <section className="pt-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                  <div className="flex flex-col gap-3">
                    <h1 className="font-semibold md:text-2xl">
                      Vehicle Booking Details
                    </h1>
                    <p>{booking?.vehicle.meta_description.slice(0, 100)}</p>
                  </div>
                  <p className="flex gap-2"></p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                  <p className="text-2xl font-semibold md:text-3xl">
                    {booking?.vehicle.brand} /{booking?.vehicle.model}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 md:flex-nowrap">
                    <SmallCard>
                      <p className="flex gap-2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 1024 1024"
                            className="text-purple"
                          >
                            <path
                              fill="currentColor"
                              fillOpacity=".15"
                              d="M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v136h656V256H712z"
                            />
                            <path
                              fill="currentColor"
                              d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32m-40 656H184V460h656zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128z"
                            />
                          </svg>
                        </span>
                        {booking?.vehicle.year}
                      </p>
                    </SmallCard>
                    <SmallCard>
                      <p className="flex gap-2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 1024 1024"
                            className="text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="M924.8 385.6a446.7 446.7 0 0 0-96-142.4a446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96a446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4M761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263c70.3-70.3 163.7-109 263-109c99.4 0 192.8 38.7 263 109c70.3 70.3 109 163.7 109 263c0 105.6-44.5 205.5-122.6 276M623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2a55.95 55.95 0 0 0 79.2 0a55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8m260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8m12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3m-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8"
                            />
                          </svg>
                        </span>
                        {booking?.vehicle.mileage}/km
                      </p>
                    </SmallCard>
                    <SmallCard>
                      <p className="flex gap-2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="M4 21q-1.25 0-2.125-.875T1 18q0-.975.563-1.75T3 15.175v-6.35q-.875-.3-1.437-1.075T1 6q0-1.25.875-2.125T4 3q1.25 0 2.125.875T7 6q0 .975-.562 1.75T5 8.825V11h6V8.825q-.875-.3-1.437-1.075T9 6q0-1.25.875-2.125T12 3q1.25 0 2.125.875T15 6q0 .975-.562 1.75T13 8.825V11h5q.425 0 .713-.287T19 10V8.825q-.875-.3-1.437-1.075T17 6q0-1.25.875-2.125T20 3q1.25 0 2.125.875T23 6q0 .975-.562 1.75T21 8.825V10q0 1.25-.875 2.125T18 13h-5v2.175q.875.3 1.438 1.075T15 18q0 1.25-.875 2.125T12 21q-1.25 0-2.125-.875T9 18q0-.975.563-1.75T11 15.175V13H5v2.175q.875.3 1.438 1.075T7 18q0 1.25-.875 2.125T4 21m0-2q.425 0 .713-.288T5 18q0-.425-.288-.712T4 17q-.425 0-.712.288T3 18q0 .425.288.713T4 19M4 7q.425 0 .713-.288T5 6q0-.425-.288-.712T4 5q-.425 0-.712.288T3 6q0 .425.288.713T4 7m8 12q.425 0 .713-.288T13 18q0-.425-.288-.712T12 17q-.425 0-.712.288T11 18q0 .425.288.713T12 19m0-12q.425 0 .713-.288T13 6q0-.425-.288-.712T12 5q-.425 0-.712.288T11 6q0 .425.288.713T12 7m8 0q.425 0 .713-.288T21 6q0-.425-.288-.712T20 5q-.425 0-.712.288T19 6q0 .425.288.713T20 7m0-1"
                            />
                          </svg>
                        </span>
                        {booking?.vehicle.transmission}
                      </p>
                    </SmallCard>
                    <SmallCard>
                      <p className="flex gap-2">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            className="text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="m19.616 6.48l.014-.017l-4-3.24l-1.26 1.554l2.067 1.674a2.99 2.99 0 0 0-1.395 3.058c.149.899.766 1.676 1.565 2.112c.897.49 1.685.446 2.384.197L18.976 18a.996.996 0 0 1-1.39.922a.995.995 0 0 1-.318-.217a.996.996 0 0 1-.291-.705L17 16a2.98 2.98 0 0 0-.877-2.119A3 3 0 0 0 14 13h-1V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2v-4h1c.136 0 .267.027.391.078a1.028 1.028 0 0 1 .531.533A.994.994 0 0 1 15 16l-.024 2c0 .406.079.799.236 1.168c.151.359.368.68.641.951a2.97 2.97 0 0 0 2.123.881c.406 0 .798-.078 1.168-.236c.358-.15.68-.367.951-.641A2.983 2.983 0 0 0 20.976 18L21 9a2.997 2.997 0 0 0-1.384-2.52M4 5h7l.001 4H4zm0 14v-8h7.001l.001 8zm14-9a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                            />
                          </svg>
                        </span>
                        {booking?.vehicle.fule_type}
                      </p>
                    </SmallCard>
                  </div>
                </div>
              </div>
            </section>
            {/* Vehicle image */}
            <section>
              <div className="w-full pt-8">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={10}
                  rewind={true}
                  breakpoints={{
                    640: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    1024: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                  }}
                  modules={[Autoplay]}
                  className="w-full h-96"
                >
                  {booking?.vehicle.imageUrl?.map((e) => {
                    return (
                      <SwiperSlide key={e.id}>
                        <img
                          src={e?.url}
                          alt="image"
                          className="object-fill w-full rounded-lg shadow-md h-[500px]"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </section>
            {/* car details */}
            <section>
              <div className="pt-8">
                <div className="flex justify-between">
                  <h1 className="text-4xl font-medium">Car Deatils</h1>
                  <h1 className="text-4xl font-medium">User Deatils</h1>
                </div>
                <div className="grid gap-10 mt-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
                  <div className="flex flex-col w-full gap-6">
                    <div className="flex justify-between ">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="25"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M240 112h-10.8l-27.78-62.5A16 16 0 0 0 186.8 40H69.2a16 16 0 0 0-14.62 9.5L26.8 112H16a8 8 0 0 0 0 16h8v80a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-16h96v16a16 16 0 0 0 16 16h24a16 16 0 0 0 16-16v-80h8a8 8 0 0 0 0-16M69.2 56h117.6l24.89 56H44.31ZM64 208H40v-16h24Zm128 0v-16h24v16Zm24-32H40v-48h176ZM56 152a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16H64a8 8 0 0 1-8-8m112 0a8 8 0 0 1 8-8h16a8 8 0 0 1 0 16h-16a8 8 0 0 1-8-8"
                          />
                        </svg>
                        <span>Body</span>
                      </p>
                      <p>{booking?.vehicle.category}</p>
                    </div>
                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="currentColor"
                            d="M924.8 385.6a446.7 446.7 0 0 0-96-142.4a446.7 446.7 0 0 0-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 0 0-142.4 96a446.7 446.7 0 0 0-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4M761.4 836H262.6A371.12 371.12 0 0 1 140 560c0-99.4 38.7-192.8 109-263c70.3-70.3 163.7-109 263-109c99.4 0 192.8 38.7 263 109c70.3 70.3 109 163.7 109 263c0 105.6-44.5 205.5-122.6 276M623.5 421.5a8.03 8.03 0 0 0-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 0 0 0 79.2a55.95 55.95 0 0 0 79.2 0a55.87 55.87 0 0 0 14.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8m260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8m12.7-197.2l-31.1-31.1a8.03 8.03 0 0 0-11.3 0l-56.6 56.6a8.03 8.03 0 0 0 0 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3m-458.6-31.1a8.03 8.03 0 0 0-11.3 0l-31.1 31.1a8.03 8.03 0 0 0 0 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8"
                          />
                        </svg>
                        <span>Mileage</span>
                      </p>
                      <p>{booking?.vehicle.mileage}/km</p>
                    </div>

                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m19.616 6.48l.014-.017l-4-3.24l-1.26 1.554l2.067 1.674a2.99 2.99 0 0 0-1.395 3.058c.149.899.766 1.676 1.565 2.112c.897.49 1.685.446 2.384.197L18.976 18a.996.996 0 0 1-1.39.922a.995.995 0 0 1-.318-.217a.996.996 0 0 1-.291-.705L17 16a2.98 2.98 0 0 0-.877-2.119A3 3 0 0 0 14 13h-1V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h7c1.103 0 2-.897 2-2v-4h1c.136 0 .267.027.391.078a1.028 1.028 0 0 1 .531.533A.994.994 0 0 1 15 16l-.024 2c0 .406.079.799.236 1.168c.151.359.368.68.641.951a2.97 2.97 0 0 0 2.123.881c.406 0 .798-.078 1.168-.236c.358-.15.68-.367.951-.641A2.983 2.983 0 0 0 20.976 18L21 9a2.997 2.997 0 0 0-1.384-2.52M4 5h7l.001 4H4zm0 14v-8h7.001l.001 8zm14-9a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                          />
                        </svg>
                        <span>Fule type</span>
                      </p>
                      <p>{booking?.vehicle.fule_type}</p>
                    </div>
                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M4 21q-1.25 0-2.125-.875T1 18q0-.975.563-1.75T3 15.175v-6.35q-.875-.3-1.437-1.075T1 6q0-1.25.875-2.125T4 3q1.25 0 2.125.875T7 6q0 .975-.562 1.75T5 8.825V11h6V8.825q-.875-.3-1.437-1.075T9 6q0-1.25.875-2.125T12 3q1.25 0 2.125.875T15 6q0 .975-.562 1.75T13 8.825V11h5q.425 0 .713-.287T19 10V8.825q-.875-.3-1.437-1.075T17 6q0-1.25.875-2.125T20 3q1.25 0 2.125.875T23 6q0 .975-.562 1.75T21 8.825V10q0 1.25-.875 2.125T18 13h-5v2.175q.875.3 1.438 1.075T15 18q0 1.25-.875 2.125T12 21q-1.25 0-2.125-.875T9 18q0-.975.563-1.75T11 15.175V13H5v2.175q.875.3 1.438 1.075T7 18q0 1.25-.875 2.125T4 21m0-2q.425 0 .713-.288T5 18q0-.425-.288-.712T4 17q-.425 0-.712.288T3 18q0 .425.288.713T4 19M4 7q.425 0 .713-.288T5 6q0-.425-.288-.712T4 5q-.425 0-.712.288T3 6q0 .425.288.713T4 7m8 12q.425 0 .713-.288T13 18q0-.425-.288-.712T12 17q-.425 0-.712.288T11 18q0 .425.288.713T12 19m0-12q.425 0 .713-.288T13 6q0-.425-.288-.712T12 5q-.425 0-.712.288T11 6q0 .425.288.713T12 7m8 0q.425 0 .713-.288T21 6q0-.425-.288-.712T20 5q-.425 0-.712.288T19 6q0 .425.288.713T20 7m0-1"
                          />
                        </svg>
                        <span>Transmission</span>
                      </p>
                      <p>{booking?.vehicle.transmission}</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M233 161.75a8 8 0 0 0-10 0c-.94.76-23 18.68-23 42.25a28 28 0 0 0 56 0c0-23.57-22.06-41.49-23-42.25M228 216a12 12 0 0 1-12-12c0-10.18 7-19.53 12-24.93c5 5.42 12 14.8 12 24.93a12 12 0 0 1-12 12m1.66-98.17L122.17 10.34a8 8 0 0 0-11.31 0L70.25 51l-24.6-24.66a8 8 0 0 0-11.31 11.32l24.6 24.6L15 106.17a24 24 0 0 0 0 33.94L99.89 225a24 24 0 0 0 33.94 0l95.83-95.83a8 8 0 0 0 0-11.34m-107.15 95.83a8 8 0 0 1-11.31 0L26.34 128.8a8 8 0 0 1 0-11.31l43.91-43.92l29.12 29.12a28 28 0 1 0 11.31-11.32L81.57 62.26l35-34.95l96.17 96.17ZM124 104a12 12 0 1 1-8.49 3.5A12 12 0 0 1 124 104"
                          />
                        </svg>
                        <span>Color</span>
                      </p>
                      <p>{booking?.vehicle.color}</p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col w-full gap-6">
                    <div className="flex justify-between ">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M208 32h-24v-8a8 8 0 0 0-16 0v8H88v-8a8 8 0 0 0-16 0v8H48a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16M72 48v8a8 8 0 0 0 16 0v-8h80v8a8 8 0 0 0 16 0v-8h24v32H48V48Zm136 160H48V96h160z"
                          />
                        </svg>
                        <span>Year</span>
                      </p>
                      <p>{booking?.vehicle.year}</p>
                    </div>
                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 4h3a2 2 0 0 1 2 2v14M2 20h3m8 0h9m-12-8v.01m3-7.448v16.157a1 1 0 0 1-1.242.97L5 20V5.562a2 2 0 0 1 1.515-1.94l4-1A2 2 0 0 1 13 4.561Z"
                          />
                        </svg>
                        <span>Doors</span>
                      </p>
                      <p>{booking?.vehicle.doors}</p>
                    </div>

                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7zm-8 0h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7zM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14m-8 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7"
                          />
                        </svg>
                        <span>No.people</span>
                      </p>
                      <p>{booking?.vehicle.number_of_people}</p>
                    </div>
                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M248 104a8 8 0 0 0-8 8v24h-16v-16a16 16 0 0 0-16-16h-12.69L160 68.69A15.86 15.86 0 0 0 148.69 64H128V48h24a8 8 0 0 0 0-16H88a8 8 0 0 0 0 16h24v16H48a16 16 0 0 0-16 16v56H16v-24a8 8 0 0 0-16 0v64a8 8 0 0 0 16 0v-24h16v20.69A15.86 15.86 0 0 0 36.69 184L72 219.31A15.86 15.86 0 0 0 83.31 224h65.38a15.86 15.86 0 0 0 11.31-4.69L195.31 184H208a16 16 0 0 0 16-16v-16h16v24a8 8 0 0 0 16 0v-64a8 8 0 0 0-8-8m-40 64h-12.69a15.86 15.86 0 0 0-11.31 4.69L148.69 208H83.31L48 172.69V80h100.69L184 115.31a15.86 15.86 0 0 0 11.31 4.69H208Z"
                          />
                        </svg>
                        <span>Engine</span>
                      </p>
                      <p>{booking?.vehicle.displacement}</p>
                    </div>
                    {/*  */}
                    <div className="flex justify-between w-full">
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M13 19.92c1.8-.22 3.35-.97 4.65-2.27c1.3-1.3 2.05-2.85 2.27-4.65h-3c-.22 1-.68 1.84-1.38 2.54c-.7.7-1.54 1.16-2.54 1.38zM10 8h4l3 3h2.92c-.25-1.95-1.13-3.62-2.65-5C15.76 4.66 14 4 12 4c-2 0-3.76.66-5.27 2c-1.52 1.38-2.4 3.05-2.65 5H7zm1 11.92v-3c-1-.22-1.84-.68-2.54-1.38c-.7-.7-1.16-1.54-1.38-2.54h-3c.22 1.77.97 3.3 2.27 4.6c1.3 1.3 2.85 2.07 4.65 2.32M12 2c2.75 0 5.1 1 7.05 2.95C21 6.9 22 9.25 22 12s-1 5.1-2.95 7.05C17.1 21 14.75 22 12 22s-5.1-1-7.05-2.95C3 17.1 2 14.75 2 12s1-5.1 2.95-7.05C6.9 3 9.25 2 12 2"
                          />
                        </svg>
                        <span> Drive Type </span>
                      </p>
                      <p>{booking?.vehicle.drive_type}</p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="">
                    <div className="flex flex-col gap-3 p-2 border-2 w-fit">
                      {booking?.user?.photo ? (
                        <img
                          src={booking?.user?.photo.url}
                          alt="user image"
                          className="object-cover w-16 h-16 rounded-full"
                        />
                      ) : (
                        "User"
                      )}
                      {/* <img
                      src={booking?.user?.photo.url}
                      alt="user image"
                      className="object-cover w-16 h-16 rounded-full"
                    /> */}
                      <h1 className="text-xl font-medium">
                        {booking?.user?.firstname} {booking?.user?.lastname}
                      </h1>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            className="p-1 rounded-full bg-purple bg-opacity-20 text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zm-2 0l-8 5l-8-5zm0 12H4V8l8 5l8-5z"
                            />
                          </svg>
                          <span>Email:</span>
                          <span>{booking?.user?.email}</span>
                        </div>
                        {/*  */}
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            className="p-1 rounded-full bg-purple bg-opacity-20 text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="M19.077 11.45q-.173-2.829-2.153-4.809t-4.809-2.153v-1q1.625.077 3.042.723t2.484 1.713t1.714 2.485t.722 3.041zm-4 0q-.173-1.154-.99-1.98t-1.972-.982v-1q1.575.154 2.682 1.27t1.28 2.692zM18.93 20q-2.53 0-5.185-1.266q-2.656-1.267-4.944-3.555q-2.27-2.289-3.536-4.935T4 5.07q0-.45.3-.76T5.05 4h2.473q.408 0 .712.257t.411.658L9.142 7.3q.07.42-.025.733q-.094.313-.332.513L6.59 10.592q.616 1.118 1.361 2.076q.745.959 1.59 1.817q.87.87 1.874 1.62q1.004.749 2.204 1.414l2.139-2.177q.244-.263.549-.347t.674-.033l2.104.43q.407.1.661.41q.254.311.254.713v2.435q0 .45-.31.75t-.76.3"
                            />
                          </svg>
                          <span>Number</span>
                          <span>{booking?.user?.phonenumber}</span>
                        </div>
                      </div>
                      {/*  */}
                      <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            className="p-1 rounded-full bg-purple bg-opacity-20 text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="M5.615 21q-.69 0-1.152-.462T4 19.385V6.615q0-.69.463-1.152T5.615 5h1.77V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.153V3.27q0-.214.144-.357t.356-.144t.357.143t.143.357V5h1.77q.69 0 1.152.463T20 6.615v4.602q0 .214-.143.357t-.357.143t-.357-.143t-.143-.357v-.602H5v8.77q0 .23.192.423t.423.192h5.731q.214 0 .357.143t.143.357t-.143.357t-.357.143zM5 9.615h14v-3q0-.23-.192-.423T18.385 6H5.615q-.23 0-.423.192T5 6.615zm0 0V6zm9.23 10.577V19.12q0-.161.057-.3t.186-.27l5.09-5.066q.149-.148.308-.2q.16-.052.32-.052q.165 0 .334.064t.298.193l.925.945q.123.148.188.307t.064.32t-.062.322t-.19.31l-5.065 5.066q-.131.13-.27.186t-.301.056h-1.074q-.348 0-.577-.23t-.23-.578m6.884-5.132l-.925-.945zm-6 5.055h.95l3.468-3.473l-.47-.475l-.455-.488l-3.493 3.486zm3.948-3.948l-.455-.488l.925.963z"
                            />
                          </svg>
                          <span>Start Date:</span>
                          <span>{booking?.vehicle?.avilable?.startdate}</span>
                        </div>
                        {/*  */}
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            className="p-1 rounded-full bg-purple bg-opacity-20 text-purple"
                          >
                            <path
                              fill="currentColor"
                              d="M5 9.615h14V6H5zm0 0V6zM4 21V5h3.385V2.77h1.077V5h7.153V2.77h1V5H20v6.867q-.244-.09-.494-.134T19 11.652v-1.037H5V20h7.32q.078.28.2.521t.255.479zm14.385 1q-1.672 0-2.836-1.164T14.385 18t1.164-2.836T18.385 14t2.835 1.164T22.385 18t-1.165 2.836T18.385 22m1.655-1.798l.547-.546l-1.818-1.821v-2.72H18v3.047z"
                            />
                          </svg>
                          <span>End Date:</span>
                          <span>{booking?.vehicle?.avilable?.enddate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default BookingDetails;
