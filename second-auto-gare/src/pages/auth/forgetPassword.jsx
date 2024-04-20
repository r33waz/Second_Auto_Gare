import React from "react";
import forgetPass from "../../assets/images/forgetpassword.png";
import { Button } from "../../shadcn_ui/ui/button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { forgetPassword } from "../../redux/loginslice/loginThunk";

function ForgetPassword() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(forgetPassword(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <section className="flex justify-center h-screen">
        <div className="flex flex-col w-full gap-4 p-4 mt-10 border border-gray-300 rounded-md md:w-[500px] h-fit shadow-[0px_0px_8px_2px_#00000024]">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Forgot Password</h1>
            <p className="text-sm font-light">
              Please enter your email or mobile number to search for your
              account.{" "}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-3">
            <label>Email Address*</label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              className="h-10 pl-2 border border-gray-400 rounded-md placeholder:text-gray-500"
              {...register("email", {
                required: {
                  value: true,
                  message: "Enter your email address.",
                },
                pattern: {
                  value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  message: "Invalid Email",
                },
              })}
            />
            <small className="text-xs text-red/80">
              {errors?.email?.message}
            </small>
          </div>
          <p className="text-sm">
            Remember Password?{" "}
            <Link to="/login" className=" text-purple">
              Return to Login
            </Link>
          </p>
          <Button
            type="submit"
            className="h-10 text-lg font-medium text-white rounded-md bg-purple/80 hover:bg-purple"
          >
            {isSubmitting ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
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
            ) : (
              " Reset Password"
            )}
          </Button>
        </div>
      </section>
    </form>
  );
}

export default ForgetPassword;
