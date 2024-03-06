import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { postData } from "../../service/axiosservice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../../redux/loginslice/loginslice";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(false);
  const loginSchema = yup.object({
    email: yup
      .string()
      .required("Enter your email")
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid Email"),
    password: yup.string().required("Enter your password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    document.title = "Login";
  });

  const onSumit = async (data) => {
    console.log(data);
    const resp = await postData("/api/v1/login", data);
    console.log(resp);
    if (resp?.status && resp.data.role === "user") {
      navigate("/home");
      dispatch(login(resp.data));
      toast.success(resp.message);
    }

    if (resp?.status && resp.data.role === "admin") {
      navigate("/admin");
      toast.success(resp.message);
    }
  };

  return (
    <div className="container mx-auto :bg--bg">
      <div className="flex items-center justify-center h-screen ">
        <div className="relative p-3 w-80 lg:w-96 md:w-96 shadow-[0px_1px_3px_3px_#00000024] :shadow-sm :shadow-white">
          <form onSubmit={handleSubmit(onSumit)} autoComplete="off">
            <div className="flex flex-col gap-5 pt-10 mt-4 text-white">
              <div className="w-full">
                <input
                  id="email"
                  type="text"
                  className="w-full pl-2 text-black bg-transparent border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none h-14"
                  placeholder="Email"
                  {...register("email")}
                />
                <small className="text-xs text-red">
                  {errors.email?.message}
                </small>
              </div>

              <div className="relative w-full">
                <input
                  id="password"
                  type={showpassword ? "text" : "password"}
                  className="w-full h-14 pl-2  text-black  placeholder-gray-500 bg-transparent border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                  placeholder="Password"
                  {...register("password")}
                />
                <small className="text-xs text-red">
                  {errors.password?.message}
                </small>
                <span
                  className="absolute top-5 right-3"
                  onClick={() => setShowPassword(!showpassword)}
                >
                  {showpassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="black"
                        d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="black"
                        d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
                      />
                    </svg>
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-5">
                <button
                  type="submit"
                  className="text-3xl border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] h-14 bg-purple"
                >
                  Sign In
                </button>
                <span className="text-center text-black :text-white">
                  Don't have an account?{" "}
                  <NavLink
                    to="/signup"
                    className="font-medium underline text-purple"
                  >
                    Signup
                  </NavLink>
                </span>
              </div>
              <div className="relative">
                <hr></hr>
                <span className="absolute w-6 h-6 p-1 text-xs text-center placeholder-gray-500 bg-white rounded-full right-[170px] -top-3 text-purple">
                  or
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 p-1 text-black :text-white border rounded-sm shadow-[0px_1px_2px_2px_#00000024]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285F4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="#34A853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="#FBBC05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    />
                    <path
                      fill="#EB4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
                  <small>Signin with google</small>
                </div>
                <div className="flex items-center gap-2 p-1 text-black :text-white border rounded-sm shadow-[0px_1px_2px_2px_#00000024]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 256 256"
                  >
                    <path
                      fill="#1877F2"
                      d="M256 128C256 57.308 198.692 0 128 0C57.308 0 0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                    />
                    <path
                      fill="#FFF"
                      d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A128.959 128.959 0 0 0 128 256a128.9 128.9 0 0 0 20-1.555V165z"
                    />
                  </svg>
                  <small>Sign with facebook</small>
                </div>
              </div>
            </div>
          </form>
          <h1 className="absolute p-1 text-lg font-medium text-white border border-gray-500 rounded top-3 -left-7 bg-purple">
            Welcome Back
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
