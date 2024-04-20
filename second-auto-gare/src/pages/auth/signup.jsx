import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { postData, postImageData } from "../../service/axiosservice";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
yupResolver;
function Signup() {
  const naviagte = useNavigate();
  const [isShow, setShow] = useState(false);
  const [newPassword, setnewPassword] = useState(false);
  const SigninSchema = yup.object({
    firstname: yup.string().required("Enter your  First Name"),
    lastname: yup.string().required("Enter your Last Name"),
    email: yup
      .string()
      .required("Enter your Email")
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email"),
    phonenumber: yup.string().required("Enter Phone Number"),
    role: yup.string().required("Select  Your Role"),
    newpassword: yup.string(),
    confirmnewpassword: yup
      .string()
      .oneOf([yup.ref("newpassword"), null], "Passwords must match"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(SigninSchema),
  });

  const OnSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("phonenumber", data.phonenumber);
    formData.append("password", data.confirmnewpassword);
    formData.append("role", data.role);
    const resp = await postData("/api/v1/signup", formData);
    if (resp?.status) {
      naviagte("/login");
      toast.success(resp?.message);
    }
  };

  useEffect(() => {
    document.title = "Signup";
  });
  return (
    <div className="container mx-auto ">
      <div className="flex items-center justify-center h-screen ">
        <div className="relative p-3 w-[350px] lg:w-[500px] md:w-[500px] shadow-[0px_1px_3px_3px_#00000024] ">
          <form onSubmit={handleSubmit(OnSubmit)}>
            <div className="flex flex-col gap-5 mt-12 md:mt-14">
              <div className="flex flex-wrap gap-5 lg:flex-nowrap md:flex-nowrap ">
                <div className="flex flex-col w-full gap-1">
                  <input
                    id="firstname"
                    type="text"
                    className={`w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border ${
                      errors.firstname ? "border-red" : "border-gray-500"
                    }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                    placeholder="First name"
                    {...register("firstname", { required: true })}
                    autoComplete="off"
                    autoFocus="on"
                  />
                  <small className="tracking-wider text-red">
                    {errors.firstname?.message}
                  </small>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <input
                    id="lastname"
                    type="text"
                    className={`w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border ${
                      errors.lastname ? "border-red" : "border-gray-500"
                    }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                    placeholder="Last name"
                    {...register("lastname", { required: true })}
                    autoComplete="off"
                  />
                  <small className="tracking-wider text-red">
                    {errors.lastname?.message}
                  </small>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <input
                  id="email"
                  type="text"
                  className={`w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border ${
                    errors.email ? "border-red" : "border-gray-500"
                  }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                  placeholder="Email"
                  {...register("email")}
                  autoComplete="off"
                />
                <small className="tracking-wider text-red">
                  {errors.email?.message}
                </small>
              </div>
              <div className="flex flex-col gap-5 ">
                <div className="flex flex-col gap-1.5 relative">
                  <input
                    type={newPassword ? "text" : "password"}
                    autoComplete="off"
                    className={`w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border ${
                      errors.newpassword ? "border-red" : "border-gray-500"
                    }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                    id="newpassword"
                    placeholder="Create Password"
                    {...register("newpassword")}
                  />
                  <span
                    onClick={() => setnewPassword(!newPassword)}
                    className="absolute cursor-pointer right-5 top-2.5"
                  >
                    {newPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-gray-500"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7" />
                          <circle cx="12" cy="12" r="3" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-gray-500"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-3.39-9.04A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20" />
                        </g>
                      </svg>
                    )}
                  </span>
                  <small className="tracking-wider text-red">
                    {errors.newpassword?.message}
                  </small>
                </div>
                <div className="flex flex-col gap-1.5 relative">
                  <input
                    type={isShow ? "text" : "password"}
                    autoComplete="off"
                    className={`w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border ${
                      errors.confirmnewpassword ? "border-red" : "border-gray-500"
                    }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                    id="confirmnewpassword"
                    placeholder="Re-type  your password"
                    {...register("confirmnewpassword", {
                      required: true,
                    })}
                  />
                  <span
                    onClick={() => setShow(!isShow)}
                    className="absolute cursor-pointer right-5 top-2.5"
                  >
                    {isShow ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-gray-500"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M2 12s3-7 10-7s10 7 10 7s-3 7-10 7s-10-7-10-7" />
                          <circle cx="12" cy="12" r="3" />
                        </g>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-gray-500"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-3.39-9.04A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61M2 2l20 20" />
                        </g>
                      </svg>
                    )}
                  </span>
                  <small className="tracking-wider text-red">
                    {errors?.confirmnewpassword?.message}
                  </small>
                </div>
              </div>
              <div className="flex flex-wrap gap-5 lg:flex-nowrap md:flex-nowrap">
                <div className="flex flex-col w-full">
                  <input
                    id="phonenumber"
                    type="text"
                    className={`w-full h-10 pl-2 text-black  :text-white placeholder-gray-500 bg-transparent border ${
                      errors.phonenumber ? "border-red" : "border-gray-500"
                    }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                    placeholder="Phone number"
                    {...register("phonenumber", { required: true })}
                    autoComplete="off"
                  />
                  <small className="tracking-wider text-red">
                    {errors.phonenumber?.message}
                  </small>
                </div>
                <div className="flex flex-col w-full gap-1">
                  <select
                    className={`w-full bg-white h-10 text-gray-500 pl-2  bg-transparent border ${
                      errors.role ? "border-red" : "border-gray-500"
                    }  rounded-sm shadow-[0px_1px_2px_1px_#00000024] `}
                    {...register("role")}
                    defaultValue="" // Set the default value to an empty string
                  >
                    <option value="" disabled selected hidden>
                      Select Category
                    </option>
                    <option value="dealer">Dealer</option>
                    <option value="user">User</option>
                  </select>
                  <span className="text-xs font-semibold text-red">
                    {errors.role?.message}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5 text-white">
                {isSubmitting ? (
                  <button
                    type="submit"
                    className="text-3xl flex justify-center items-center border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] h-14 bg-purple"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="text-xl border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] h-10  bg-purple"
                  >
                    Sign Up
                  </button>
                )}
                <span className="text-center text-black">
                  Already have an account?&nbsp;
                  <NavLink
                    to="/login"
                    className="font-medium underline text-purple"
                  >
                    Signin
                  </NavLink>
                </span>
              </div>
            </div>
          </form>
          <h1 className="absolute p-1 text-lg font-medium text-white border border-gray-500 rounded top-3 -left-7 bg-purple">
            Nice to meet you
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Signup;
