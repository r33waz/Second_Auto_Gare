import { Save_btn } from "../../../components/common/button";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../../../components/common/loading";
import logo from "../../../assets/images/kidmfond.jpg";

import { GetSingleUser, Updateuser } from "../../../redux/userslice/userthunk";
import { Button } from "../../../shadcn_ui/ui/button";
function Userprofile() {
  const dispatch = useDispatch();
  const { login } = useSelector((state) => state.login);
  const { singleUser: data, singleUserLoading:isLoading } = useSelector(
    (state) => state.user
  );
  console.log("user", data);

  useEffect(() => {
    dispatch(GetSingleUser({ id: login.id }));
  }, [dispatch, login.id]);

  const [isShow, setShow] = useState(false);
  const [newPassword, setnewPassword] = useState(false);
  // validation schema
  const userUpdateSchema = yup.object({
    firstname: yup.string(),
    lastname: yup.string(),
    email: yup.string(),
    phonenumber: yup.string(),
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
    resolver: yupResolver(userUpdateSchema),
  });

  const OnSubmit = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data?.firstname);
    formData.append("lastname", data?.lastname);
    formData.append("email", data?.email);
    formData.append("phonenumber", data?.phonenumber);
    if (data?.photo[0]) {
      const photo = data?.photo[0];
      formData.append("photo", photo);
    }
    if (data?.oldpassword && data?.newpassword && data?.confirmnewpassword) {
      const oldpassword = data?.oldPassword;
      const password = data?.confirmnewpassword;
      formData.append("oldPassword", oldpassword);
      formData.append("password", password);
    }
    console.log("form Data", formData);
    dispatch(Updateuser({ id: login.id, data: formData })).then(() => {
      dispatch(GetSingleUser({ id: login.id }));
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {data && (
        <div className="container mx-auto">
          <div className="px-2 md:mt-16 lg:px-12 md:px-12">
            <section className="mt-8">
              <div className="flex items-start justify-center h-screen ">
                <div className="flex gap-2 border-2 border-gray-400 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md bg-purple bg-opacity-40 lg:flex-nowrap md:flex-nowrap flex-wrap relative">
                  <img
                    src={logo}
                    alt="img"
                    className="absolute rounded-full h-14 w-14 left-3 top-3"
                  />
                  <div className="flex flex-col items-center justify-center w-full gap-3 p-3 text-white rounded-md lg:w-80 md:w-80 bg-sideNav">
                    {data?.photo?.url ? (
                      <img
                        src={data?.photo?.url}
                        alt="image"
                        className="object-cover rounded-full h-60 w-60"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="150"
                        height="150"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M6.196 17.485q1.275-.918 2.706-1.451Q10.332 15.5 12 15.5q1.667 0 3.098.534q1.43.533 2.706 1.45q.99-1.024 1.593-2.42Q20 13.666 20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.338T4 12q0 1.667.603 3.063q.603 1.397 1.593 2.422m5.805-4.985q-1.264 0-2.133-.868Q9 10.765 9 9.501t.868-2.133q.867-.868 2.131-.868t2.133.868Q15 8.235 15 9.499q0 1.264-.868 2.133q-.867.868-2.131.868M12 21q-1.883 0-3.525-.701q-1.642-.7-2.858-1.916q-1.215-1.216-1.916-2.858Q3 13.883 3 12t.701-3.525q.7-1.642 1.916-2.858q1.216-1.215 2.858-1.916Q10.117 3 12 3t3.525.701q1.642.7 2.858 1.916q1.215 1.216 1.916 2.858Q21 10.117 21 12t-.701 3.525q-.7 1.642-1.916 2.858q-1.216 1.215-2.858 1.916Q13.883 21 12 21m0-1q1.383 0 2.721-.484q1.339-.483 2.314-1.324q-.975-.782-2.256-1.237Q13.499 16.5 12 16.5q-1.498 0-2.788.445q-1.29.445-2.247 1.247q.975.84 2.314 1.324Q10.617 20 12 20m0-8.5q.842 0 1.421-.579Q14 10.342 14 9.5q0-.842-.579-1.421Q12.842 7.5 12 7.5q-.842 0-1.421.579Q10 8.658 10 9.5q0 .842.579 1.421q.579.579 1.421.579m0 6.75"
                        />
                      </svg>
                    )}
                    <div className="flex flex-col gap-3">
                      <p className="text-lg ">
                        Email: <span className="text-sm ">{data?.email}</span>
                      </p>
                      <p className="text-lg ">
                        First name:
                        <span className="text-base">{data?.firstname}</span>
                      </p>
                      <p className="text-lg ">
                        Last name:
                        <span className="text-base">{data?.lastname}</span>
                      </p>
                      <p className="text-lg ">
                        Phone number:
                        <span className="text-base">{data?.phonenumber}</span>
                      </p>
                      <div className="flex justify-between gap-1">
                        <p className="text-lg ">
                          Role:
                          <span className="text-base">{data?.role}</span>
                        </p>
                        <p className="flex gap-1 text-lg">
                          Verified:
                          {data?.verified === true ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              className="text-green"
                            >
                              <path
                                fill="currentColor"
                                d="m10.562 15.908l6.396-6.396l-.708-.708l-5.688 5.688l-2.85-2.85l-.708.708zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 256 256"
                              className="text-red"
                            >
                              <path
                                fill="currentColor"
                                d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m37.66 130.34a8 8 0 0 1-11.32 11.32L128 139.31l-26.34 26.35a8 8 0 0 1-11.32-11.32L116.69 128l-26.35-26.34a8 8 0 0 1 11.32-11.32L128 116.69l26.34-26.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                              />
                            </svg>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(OnSubmit)}>
                    <div className="flex flex-col p-2">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex flex-wrap justify-between gap-2 lg:flex-nowrap md:flex-nowrap">
                          <div className="flex flex-col gap-1.5 w-full">
                            <label htmlFor="firstname">First name</label>
                            <input
                              type="text"
                              name="firstname"
                              autoComplete="off"
                              className="h-8 pl-2 border border-gray-500 rounded outline-none "
                              id="firstname"
                              defaultValue={data?.firstname}
                              {...register("firstname")}
                            />
                            <small className="tracking-wider text-red">
                              {errors.firstname?.message}
                            </small>
                          </div>
                          <div className="flex flex-col gap-1.5 w-full">
                            <label htmlFor="lastname">Last name</label>
                            <input
                              type="text"
                              autoComplete="off"
                              className="h-8 pl-2 border border-gray-400 rounded outline-none "
                              id="lastname"
                              defaultValue={data?.lastname}
                              {...register("lastname")}
                            />
                            <small className="tracking-wider text-red">
                              {errors.lastname?.message}
                            </small>
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="email">Email</label>
                            <input
                              type="text"
                              name="email"
                              autoComplete="off"
                              defaultValue={data?.email}
                              className="h-8 pl-2 border border-gray-400 rounded outline-none"
                              id="email"
                              {...register("email")}
                            />
                            <small className="tracking-wider text-red">
                              {errors.email?.message}
                            </small>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="phonenumber">Number</label>
                            <input
                              type="text"
                              autoComplete="off"
                              className="h-8 pl-2 border border-gray-400 rounded outline-none"
                              id="phonenumber"
                              defaultValue={data?.phonenumber}
                              {...register("phonenumber")}
                            />
                            <small className="tracking-wider text-red">
                              {errors.phonenumber?.message}
                            </small>
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-col gap-1.5 relative">
                            <label htmlFor="oldpassword">Old password</label>
                            <input
                              type="password"
                              autoComplete="off"
                              className="h-8 pl-2 border border-gray-400 rounded outline-none"
                              id="oldpassword"
                              {...register("oldpassword")}
                            />
                            {/*  */}
                            <small className="tracking-wider text-red">
                              {errors?.oldpassword?.message}
                            </small>
                          </div>
                          <div className="flex flex-col gap-1.5 relative">
                            <label htmlFor="newpassword">New password</label>
                            <input
                              type={newPassword ? "text" : "password"}
                              autoComplete="off"
                              className="h-8 pl-2 border border-gray-400 rounded outline-none"
                              id="newpassword"
                              {...register("newpassword")}
                            />
                            <span
                              onClick={() => setnewPassword(!newPassword)}
                              className="absolute cursor-pointer right-5 top-9"
                            >
                              {newPassword ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
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
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
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
                            <label htmlFor="number">Confirm Password</label>
                            <input
                              type={isShow ? "text" : "password"}
                              autoComplete="off"
                              className="h-8 pl-2 border border-gray-400 rounded outline-none"
                              id="confirmnewpassword"
                              {...register("confirmnewpassword", {
                                required: true,
                              })}
                            />
                            <span
                              onClick={() => setShow(!isShow)}
                              className="absolute cursor-pointer right-5 top-9"
                            >
                              {isShow ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
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
                                  width="22"
                                  height="22"
                                  viewBox="0 0 24 24"
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

                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="number">Upload image</label>
                            <input
                              id="photo"
                              type="file"
                              className="w-full h-8 pt-1 pl-2 bg-white rounded-sm"
                              {...register("photo", { required: true })}
                            />
                          </div>
                        </div>
                        {/*  */}
                        <Button className="bg-green">
                          {isSubmitting ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              className="w-20"
                            >
                              <path
                                fill="currentColor"
                                d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                                opacity=".25"
                              />
                              <path
                                fill="currentColor"
                                d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
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
                            <span className="text-lg text-white">
                              Save change
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Userprofile;
