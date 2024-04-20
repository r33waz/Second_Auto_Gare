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
    <div className="container flex flex-col items-center h-screen pt-10 mx-auto">
      <section className="p-3 shadow-[0px_0px_6px_2px_#00000024]  md:w-[900px] w-full">
        <Link to="/admin/allbooking">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="p-1 text-sm text-white rounded-full w-7 h-7 bg-purple"
          >
            <path
              fill="currentColor"
              d="m6.921 12.5l5.792 5.792L12 19l-7-7l7-7l.713.708L6.921 11.5H19v1z"
            />
          </svg>
        </Link>
        <div className="flex justify-between w-full py-3 text-lg">
          <h1 className="text-xl">Booked By</h1>
          <h1 className="text-xl">Booked Vehicle</h1>
        </div>
        <div className="grid grid-cols-1 mt-5 md:grid-cols-2">
          <div className="flex flex-col w-full p-2 border gap-y-5">
            <div className="flex justify-center">
              <img
                src={
                  booking?.user?.photo?.url
                    ? booking?.user?.photo?.url
                    : ErrorImage
                }
                alt=""
                className="object-fill w-40 h-40 rounded-full"
              />
            </div>
            <div className="flex justify-between gap-4 px-2">
              <div className="flex items-center gap-2 text-lg">
                <h1>First Name:</h1>
                <span className="text-purple">{booking?.user?.firstname}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <h1>Last Name:</h1>
                <span className="text-purple">{booking?.user?.lastname}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-2 text-lg">
              <h1>Email:</h1>
              <span className="text-purple">{booking?.user?.email}</span>
            </div>
            <div className="flex items-center gap-2 px-2 text-lg">
              <h1>Phone Number:</h1>
              <span className="text-purple">{booking?.user?.phonenumber}</span>
            </div>
            <div className="flex flex-col gap-2 px-2">
              <div className="flex items-center gap-2 text-lg">
                <h1>Start Date:</h1>
                <span className="text-purple">{booking?.startDate}</span>
              </div>
              <div className="flex items-center gap-2 text-lg">
                <h1>End Date:</h1>
                <span className="text-purple">{booking?.endDate}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full p-2 border gap-y-5">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              autoplay={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className="w-48 h-40 md:w-60 md:h-56"
            >
              {booking?.vehicle?.imageUrl?.map((e, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <img
                      src={e?.url ? e?.url : ErrorImage}
                      alt=""
                      className="object-cover w-48 h-40 md:w-60 md:h-56"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="grid grid-cols-1 gap-2 px-2 text-sm md:grid-cols-3 ">
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Brand:</h1>
                <span className="text-purple">{booking?.vehicle?.brand}</span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Model:</h1>
                <span className="text-purple">{booking?.vehicle?.model}</span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Color:</h1>
                <span className="text-purple">{booking?.vehicle?.color}</span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Displacement:</h1>
                <span className="text-purple">
                  {booking?.vehicle?.displacement}
                </span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Kilometer:</h1>
                <span className="text-purple">
                  {booking?.vehicle?.kilometer}
                </span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Drive Type:</h1>
                <span className="text-purple">
                  {booking?.vehicle?.drive_type}
                </span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Transmission:</h1>
                <span className="text-purple">
                  {booking?.vehicle?.transmission}
                </span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>Doors:</h1>
                <span className="text-purple">{booking?.vehicle?.doors}</span>
              </div>
              <div className="flex flex-col items-center w-full text-lg">
                <h1>People:</h1>
                <span className="text-purple">
                  {booking?.vehicle?.number_of_people}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingDetails;
