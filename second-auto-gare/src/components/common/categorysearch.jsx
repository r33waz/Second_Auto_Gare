import React, { useState } from "react";

function CategorySearch() {
  const [open, setOpen] = useState(false);
  return (
    <>
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
    </>
  );
}

export default CategorySearch;
