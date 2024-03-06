import React from 'react';

import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getData, updateData } from "../../service/axiosservice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
function UpdateUser() {
  const { id } = useParams();
  console.log(id);
  const fetcher = (url) => getData(url).then((res) => res.data);
  const { data, isLoading } = useSWR(`/api/v1/users/${id}`, fetcher);
  // console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = async (value) => {
    console.log(id);
    console.log(value);

    const resp = await updateData(`/api/v1/updateuser/${id}`, value);
    if (resp?.status) {
      // navigate("/admin/user");
      toast.success(resp?.message);
    }
  };

  useEffect(() => {
    document.title = "User Upadate";
  });
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-center h-screen ">
        <div className="relative p-3 w-[350px] lg:w-[500px] md:w-[500px] shadow-[0px_1px_3px_3px_#00000024] ">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="flex flex-col gap-5 ">
              <div className="flex justify-center">
                {data?.photo ? (
                  <div className="">
                    <img
                      src={data?.photo}
                      alt="User Image"
                      className="object-fill w-32 h-32 border-2 border-gray-700 rounded-full"
                    />
                  </div>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="100"
                    viewBox="0 0 24 24"
                    className="text-black border border-black rounded-full "
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="28"
                      stroke-dashoffset="28"
                      stroke-linecap="round"
                      stroke-width="2"
                    >
                      <path d="M4 21V20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20V21">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          dur="0.4s"
                          values="28;0"
                        />
                      </path>
                      <path d="M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="0.5s"
                          dur="0.4s"
                          values="28;0"
                        />
                      </path>
                    </g>
                  </svg>
                )}
              </div>
              <div className="flex flex-wrap gap-5 lg:flex-nowrap md:flex-nowrap ">
                <div className="flex flex-col w-full gap-1">
                  <input
                    id="firstname"
                    defaultValue={data?.firstname}
                    type="text"
                    className="w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                    placeholder="First name"
                    {...register("firstname", { required: true })}
                    autoComplete="off"
                    autoFocus="on"
                  />
                  <span className="text-red">
                    {errors.firstname && <small>Enter your firstname</small>}
                  </span>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <input
                    id="lastname"
                    defaultValue={data?.lastname}
                    type="text"
                    className="w-full h-10 pl-2 text-black  placeholder-gray-500 border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                    placeholder="Last name"
                    {...register("lastname", { required: true })}
                    autoComplete="off"
                  />
                  <span className="text-red">
                    {errors.lastname && <small>Enter your lastname</small>}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <input
                  id="email"
                  type="text"
                  defaultValue={data?.email}
                  className="w-full h-10 pl-2 text-black  placeholder-gray-500 border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                  autoComplete="off"
                />
                <span className="text-red">
                  {errors.email && <small>Enter your Email</small>}
                </span>
              </div>
              <div className="flex flex-wrap gap-5 lg:flex-nowrap md:flex-nowrap">
                <div className="flex flex-col w-full">
                  <input
                    id="phonenumber"
                    defaultValue={data?.phonenumber}
                    type="text"
                    className="w-full h-10 pl-2 text-black   placeholder-gray-500 border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                    placeholder="Phone number"
                    {...register("phonenumber", { required: true })}
                    autoComplete="off"
                  />
                  <span className="text-red">
                    {errors.phonenumber && (
                      <small>Enter your phonenumber</small>
                    )}
                  </span>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <select
                    className="w-full h-10 pl-2  text-gray-500 bg-white  border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                    {...register("role", { required: true })}
                    defaultValue="" // Set the default value to an empty string
                  >
                    <option value="" disabled selected hidden>
                      {data?.role}
                    </option>
                    <option value="" disabled selected hidden>
                      Select Role
                    </option>
                    <option value="admin">Admin</option>
                    <option value="dealer">Dealer</option>
                    <option value="user">User</option>
                  </select>
                  <span className="text-xs font-semibold text-red">
                    {errors.role && <p>Role is required</p>}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <button
                  type="submit"
                  className="h-10 text-3xl text-white border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] bg-purple"
                >
                  Update User
                </button>
              </div>
            </div>
          </form>
          <h1 className="absolute p-1 text-lg font-medium text-white border border-gray-500 rounded top-3 -left-7 bg-purple">
            Update User
          </h1>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
