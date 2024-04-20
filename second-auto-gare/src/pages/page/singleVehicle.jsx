import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Autoplay } from "swiper/modules";
import { SmallCard } from "../../components/common/card";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/common/loading";
import { postComment } from "../../redux/commentslice/commentslice";
import { GetSingleVehicle } from "../../redux/vehicleslice/vehiclethunk";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../shadcn_ui/ui/dialog";

import { Button } from "../../shadcn_ui/ui/button";
import Otpvalidation from "../../components/otpValidation";
import { SucessToast } from "../../components/common/toast";
import { postData } from "../../service/axiosservice";
import Chat from "./chat";

function SingleVehicle() {
  const [isOpen, setOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { login, authenticate } = useSelector((state) => state.login);
  console.log("login", login);
  const { singleVehicle, singleVehicleLoading } = useSelector(
    (state) => state.vehicle
  );
  console.log("single vehicle", singleVehicle);
  useEffect(() => {
    if (id) {
      console.log("Dispatching GetSingleVehicle with id:", id);
      dispatch(GetSingleVehicle(id));
    }
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Onsubmit = (value) => {
    const comment = {
      text: value.comment,
      author: login?.id,
      post: singleVehicle?._id,
    };
    dispatch(postComment(comment)).then(() => {
      console.log("comment", comment);
      dispatch(GetSingleVehicle(id));
    });
    reset();
  };
  const sendOtp = async () => {
    const resp = await postData("/api/v1/send_otp", { email: login?.email });
    console.log("resp", resp);
    if (resp.status) {
      SucessToast({ message: resp?.message });
    }
    setOpen(true);
  };

  if (singleVehicleLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {singleVehicle && (
        <div className="container relative mx-auto">
          <div className="px-2 mt-8 md:mt-16 lg:px-12 md:px-12">
            <section className="flex items-center justify-start gap-3">
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
              <span className="text-lg font-light uppercase text-purple">
                Vehicles / {singleVehicle?.brand} /{singleVehicle?.model}
              </span>
            </section>
            {/*  */}
            <section className="pt-4">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                  <div className="flex flex-col gap-3">
                    <h1 className="font-semibold md:text-2xl">
                      {singleVehicle?.brand} /{singleVehicle?.model}
                    </h1>
                    <p>{singleVehicle?.meta_description.slice(0, 100)}</p>
                  </div>
                  <p className="flex gap-2">
                    Share
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 1024 1024"
                        className="p-1 text-white rounded-full bg-purple"
                      >
                        <path
                          fill="currentColor"
                          d="M752 664c-28.5 0-54.8 10-75.4 26.7L469.4 540.8a160.68 160.68 0 0 0 0-57.6l207.2-149.9C697.2 350 723.5 360 752 360c66.2 0 120-53.8 120-120s-53.8-120-120-120s-120 53.8-120 120c0 11.6 1.6 22.7 4.7 33.3L439.9 415.8C410.7 377.1 364.3 352 312 352c-88.4 0-160 71.6-160 160s71.6 160 160 160c52.3 0 98.7-25.1 127.9-63.8l196.8 142.5c-3.1 10.6-4.7 21.8-4.7 33.3c0 66.2 53.8 120 120 120s120-53.8 120-120s-53.8-120-120-120m0-476c28.7 0 52 23.3 52 52s-23.3 52-52 52s-52-23.3-52-52s23.3-52 52-52M312 600c-48.5 0-88-39.5-88-88s39.5-88 88-88s88 39.5 88 88s-39.5 88-88 88m440 236c-28.7 0-52-23.3-52-52s23.3-52 52-52s52 23.3 52 52s-23.3 52-52 52"
                        />
                      </svg>
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
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
                        {singleVehicle?.year}
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
                        {singleVehicle?.mileage}/km
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
                        {singleVehicle?.transmission}
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
                        {singleVehicle?.fule_type}
                      </p>
                    </SmallCard>
                  </div>
                  <p className="text-2xl font-semibold md:text-3xl">
                    Rs {singleVehicle?.price.toLocaleString()}
                  </p>
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
                  {singleVehicle?.imageUrl?.map((e) => {
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
                <h1 className="text-4xl font-medium">Car Deatils</h1>
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
                      <p>{singleVehicle?.category}</p>
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
                      <p>{singleVehicle?.mileage}/km</p>
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
                      <p>{singleVehicle?.fule_type}</p>
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
                      <p>{singleVehicle?.transmission}</p>
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
                      <p>{singleVehicle?.color}</p>
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
                      <p>{singleVehicle?.year}</p>
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
                      <p>{singleVehicle?.doors}</p>
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
                      <p>{singleVehicle?.number_of_people}</p>
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
                      <p>{singleVehicle?.displacement}</p>
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
                      <p>{singleVehicle?.drive_type}</p>
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex flex-col gap-3 p-2 border-2 ">
                    {singleVehicle?.user?.photo ? (
                      <img
                        src={singleVehicle?.user?.photo.url}
                        alt="user image"
                        className="object-cover w-16 h-16 rounded-full"
                      />
                    ) : (
                      "User"
                    )}
                    {/* <img
                      src={singleVehicle?.user?.photo.url}
                      alt="user image"
                      className="object-cover w-16 h-16 rounded-full"
                    /> */}
                    <h1 className="text-xl font-medium">
                      {singleVehicle?.user?.firstname}{" "}
                      {singleVehicle?.user?.lastname}
                    </h1>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
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
                        <span>{singleVehicle?.user?.email}</span>
                      </div>
                      {/*  */}
                      <div className="flex items-center gap-2">
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
                        <span>{singleVehicle?.user?.phonenumber}</span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-2 ">
                      {!authenticate ? (
                        <Link
                          to="/login"
                          className="py-3 text-lg text-center text-white rounded-xl bg-purple"
                        >
                          Message Dealer
                        </Link>
                      ) : login?.verified ? (
                        <>
                          <Chat
                            key={singleVehicle?.user?._id}
                            data={singleVehicle?.user}
                          />
                        </>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="py-3 text-lg text-center text-white rounded-xl bg-purple">
                              Message Dealer
                            </Button>
                          </DialogTrigger>
                          <DialogContent
                            className={`mt-6 ${
                              isOpen ? "h-56  w-full " : " h-32 w-full"
                            } sm:max-w-[425px] left-[37%] p-3 border-2 rounded-md  top-40 bg-black text-white`}
                          >
                            <DialogClose />
                            <DialogTitle className="flex items-center gap-2 text-sm font-light">
                              <span>Verify your account</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="15"
                                height="15"
                                viewBox="0 0 15 15"
                              >
                                <path
                                  fill="none"
                                  stroke="currentColor"
                                  d="M4 7.5L7 10l4-5m-3.5 9.5a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
                                />
                              </svg>
                            </DialogTitle>
                            <DialogHeader>
                              <DialogDescription className="flex flex-col items-center justify-center">
                                <Button
                                  onClick={sendOtp}
                                  className="p-2 text-lg font-semibold border border-white md:w-40 rounded-xl"
                                >
                                  Send OTP
                                </Button>

                                <div
                                  className={`mt-5 ${
                                    isOpen ? "visivle" : "hidden"
                                  }`}
                                >
                                  <Otpvalidation data={singleVehicle?.id} />
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      )}
                      <a
                        href={`https://wa.me/${singleVehicle?.user?.phonenumber}/?text=hi`}
                        className="py-3 text-lg text-center text-white rounded-xl bg-green"
                      >
                        Message via whatsapp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* comment section */}
            <section className="mt-8">
              <h1 className="text-4xl font-medium">Comment</h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <div
                    className={`flex flex-col gap-3 overflow-y-scroll ${singleVehicle?.comments.length>5?"h-80":""}`}
                  >
                    {singleVehicle?.comments.map((e) => {
                      return (
                        <div
                          key={e.id}
                          className="flex flex-col gap-3 p-4 border shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            {e?.author?.photo?.url ? (
                              <img
                                src={e?.author?.photo?.url}
                                alt="image"
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <small className="w-8 h-8 pt-1 text-lg text-center text-white rounded-full bg-purple">
                                {e?.author?.firstname[0]
                                  ? e?.author?.firstname[0]
                                  : "U"}
                              </small>
                            )}

                            <p>
                              {e?.author?.firstname === undefined &&
                              e?.author?.lastname === undefined
                                ? "User"
                                : e?.author?.firstname +
                                  " " +
                                  e?.author?.lastname}
                            </p>
                          </div>
                          <p>{e?.text}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <form onSubmit={handleSubmit(Onsubmit)}>
                      <div className="flex flex-col gap-2 mt-3">
                        <textarea
                          id="comment"
                          type="text"
                          className="p-3 border-2 "
                          placeholder="Enter your comment"
                          {...register("comment", { required: true })}
                        />
                        {errors.comment && (
                          <span className="text-red">Write your comment</span>
                        )}
                        <div className="flex justify-end">
                          <button
                            type="submit"
                            className="px-4 py-2 font-medium text-center text-white rounded-md bg-purple w-fit"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div>
                  <div className="flex flex-col gap-2">
                    <h1 className="md:text-xl">Tags:</h1>
                    <h1 className="px-4 py-1.5 font-medium text-white rounded-md md:text-xl bg-purple w-fit">
                      Vehicles-{singleVehicle?.category}
                    </h1>
                  </div>
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
                        slidesPerView: 2,
                        spaceBetween: 40,
                      },
                      1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                      },
                    }}
                    modules={[Autoplay]}
                    className="py-4"
                  ></Swiper>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleVehicle;
