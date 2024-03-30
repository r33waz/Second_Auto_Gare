import React, { useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log(startDate, endDate);


  return (
    <div className="mx-auto contianer">
      <div className="px-2 mt-8 md:mt-16 lg:px-12 md:px-12">
        <section className="flex flex-start">
          <div className="flex gap-3">
            <Link to="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 256 256"
                className="text-purple"
              >
                <path
                  fill="currentColor"
                  d="M128 28a100 100 0 1 0 100 100A100.11 100.11 0 0 0 128 28m0 192a92 92 0 1 1 92-92a92.1 92.1 0 0 1-92 92m44-92a4 4 0 0 1-4 4H97.66l25.17 25.17a4 4 0 0 1-5.66 5.66l-32-32a4 4 0 0 1 0-5.66l32-32a4 4 0 0 1 5.66 5.66L97.66 124H168a4 4 0 0 1 4 4"
                />
              </svg>
            </Link>
            <span className="text-lg font-light uppercase text-purple">
              Vehicles / Booking
            </span>
          </div>
        </section>
        {/* to map the vehicle that are for  booking */}
        <section className="pt-4">
          <div className="flex items-center gap-1">
            <div className="flex flex-col gap-1 font-light">
              <label>Select start date</label>
              <input
                className="p-1 border-2 border-gray-400 rounded-md"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col gap-1 font-light">
              <label>Select end date</label>
              <input
                className="p-1 border-2 border-gray-400 rounded-md"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Booking;
