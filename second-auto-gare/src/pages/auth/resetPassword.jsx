import { resetToken, setPassword } from "../../redux/loginslice/loginThunk";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../shadcn_ui/ui/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function ResetPassword() {
  const [isShow, setShow] = useState(false);
  const [newPassword, setnewPassword] = useState(false);
  const ResetSchema = yup.object({
    newpassword: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmnewpassword: yup
      .string()
      .oneOf([yup.ref("newpassword"), null], "Passwords must match"),
  });

  const { id, token } = useParams();
  
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(resetToken({ id, token }));
    }, [dispatch, id, token]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(ResetSchema) });

  const onSubmit = (data) => {
      console.log(data)
  dispatch(setPassword({id:id, token:token, data: data} ));
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="flex justify-center h-screen">
          <div className="flex flex-col w-full gap-6 p-4 mt-10 border border-gray-300 rounded-md md:w-[500px] h-fit shadow-[0px_0px_8px_2px_#00000024]">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-bold">Reset Your Password</h1>
              <p className="text-sm font-light">
                Please Enter Your New Password
              </p>
            </div>
            <div className="flex flex-col justify-center gap-1.5 relative">
              <label>New Password</label>
              <input
                id="newpassword"
                type={newPassword ? "text" : "password"}
                placeholder="Enter your new password"
                className="h-10 pl-2 border border-gray-400 rounded-md placeholder:text-gray-500"
                {...register("newpassword")}
              />
              <small className="text-xs text-red/80">
                {errors?.newpassword?.message}
              </small>
              <span
                onClick={() => setnewPassword(!newPassword)}
                className="absolute cursor-pointer right-5 top-10"
              >
                {newPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
            </div>
            <div className="flex flex-col justify-center gap-1.5 relative">
              <label>Confirm Password</label>
              <input
                id="confirmnewpassword"
                type={isShow ? "text" : "password"}
                placeholder="Re-type confirm password"
                className="h-10 pl-2 border border-gray-400 rounded-md placeholder:text-gray-500"
                {...register("confirmnewpassword")}
              />
              <small className="text-xs text-red/80">
                {errors?.confirmnewpassword?.message}
              </small>
              <span
                onClick={() => setShow(!isShow)}
                className="absolute cursor-pointer right-5 top-10"
              >
                {isShow ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
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
                    width="18"
                    height="18"
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
            </div>
            <Button
              type="submit"
              className="h-12 text-lg font-medium text-white rounded-md bg-purple/80 hover:bg-purple"
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
                "Confirm Password"
              )}
            </Button>
          </div>
        </section>
      </form>
    </>
  );
}

export default ResetPassword;
