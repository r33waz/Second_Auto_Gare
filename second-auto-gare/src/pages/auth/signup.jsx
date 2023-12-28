import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { postImageData } from "../../service/axiosservice";
function Signup() {
  const naviagte = useNavigate();
  const [photo, setUserPhoto] = useState(null);
  const [showpassword, setShowpassword] = useState(false);
  const onChangePicture = (e) => {
    setUserPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const OnSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);
    formData.append("phonenumber", data.phonenumber);
    formData.append("password", data.password);
    formData.append("category", data.category);
    formData.append("photo", data.photo[0]);
    const resp = await postImageData("/api/v1/signup", formData);
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
            <div className="flex flex-col gap-5 ">
              <div className="flex justify-center">
                {photo ? (
                  <div className="">
                    <img
                      src={photo}
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
              <div className="flex flex-wrap gap-5 lg:flex-nowrap md:flex-nowrap ">
                <div className="relative w-full">
                  <input
                    id="password"
                    type={showpassword ? "text" : "password"}
                    className="w-full h-10 pl-2  text-black  placeholder-gray-500 bg-transparent border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <span className="text-red">
                    {errors.password && <small>Enter your password</small>}
                  </span>
                  <span
                    className="absolute top-3 right-1"
                    onClick={() => setShowpassword(!showpassword)}
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
              </div>
              <div className="flex flex-wrap gap-5 lg:flex-nowrap md:flex-nowrap">
                <div className="flex flex-col w-full">
                  <input
                    id="phonenumber"
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
                    {...register("category", { required: true })}
                    defaultValue="" // Set the default value to an empty string
                  >
                    <option value="" disabled selected hidden>
                      Select Category
                    </option>
                    <option value="dealer">Dealer</option>
                    <option value="user">User</option>
                  </select>
                  <span className="text-xs font-semibold text-red">
                    {errors.category && <p>Category is required</p>}
                  </span>
                </div>
              </div>
              <input
                id="photo"
                type="file"
                accept="image/jpg,image/jpeg,image/png"
                placeholder="Upload Image"
                className="w-full h-10 p-2 text-black placeholder-gray-500 bg-white border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] outline-none"
                {...register("photo")}
                onChange={onChangePicture}
                autoComplete="off"
              />
              <div className="flex flex-col gap-5">
                <button
                  type="submit"
                  className="h-10 text-3xl text-white border border-gray-500 rounded-sm shadow-[0px_1px_2px_1px_#00000024] bg-orange"
                >
                  Sign Up
                </button>
                <span className="text-center">
                  Already have an account?{" "}
                  <NavLink
                    to="/login"
                    className="font-medium underline text-orange"
                  >
                    Signin
                  </NavLink>
                </span>
              </div>
              <div className="relative">
                <hr></hr>
                <span className="absolute w-6 h-6 p-1 text-xs text-center placeholder-gray-500 bg-white rounded-full right-56 -top-3 text-orange">
                  or
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 p-1 text-black  border rounded-sm shadow-[0px_1px_2px_2px_#00000024]">
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
                <div className="flex items-center gap-2 p-1 text-black  border rounded-sm shadow-[0px_1px_2px_2px_#00000024]">
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
          <h1 className="absolute p-1 text-lg font-medium text-white border border-gray-500 rounded top-3 -left-7 bg-orange">
            Nice to meet you
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Signup;
