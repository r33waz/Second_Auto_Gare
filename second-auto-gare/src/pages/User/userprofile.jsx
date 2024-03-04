import { getData } from "../../service/axiosservice";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import useSWR from "swr";

function Userprofile() {
  const user = useSelector((state) => state.user);
  const { data, isLoading } = useSWR(`/api/v1/users/${user.id}`, (url) =>
    getData(url).then((res) => res)
  );
  console.log("user:", data);
  console.log(user.id);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="container mx-auto">
      <div className="px-2 md:mt-16 lg:px-12 md:px-12">
        <section className="mt-8 h-screen">
          <div className="flex justify-center items-center">
            <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 border-2 border-gray-400 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-md">
              <div className="flex flex-col justify-center items-center bg-purple bg-opacity-40 gap-3 p-3 rounded-md">
                {data?.data?.photo[0] ? (
                  <img src={user?.photo[0]} alt="image" />
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
                  <p className=" text-lg">
                    Email: <span className=" text-sm">{data?.data?.email}</span>
                  </p>
                  <p className=" text-lg">
                    First name:
                    <span className="text-base">{data?.data?.firstname}</span>
                  </p>
                  <p className=" text-lg">
                    Last name:
                    <span className="text-base">{data?.data?.lastname}</span>
                  </p>
                  <p className=" text-lg">
                    Phone number:
                    <span className="text-base">{data?.data?.phonenumber}</span>
                  </p>
                  <div className="flex gap-1 justify-between">
                    <p className=" text-lg">
                      Role:
                      <span className="text-base">{data?.data?.role}</span>
                    </p>
                    <p className="flex gap-1  text-lg">
                      Verified:
                      {data?.data?.verified === true ? (
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
              <form>
                <div className="col-span-2 flex flex-col">
                  aofidjoidfgiorioghihdroighorghroigre
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-green bg-opacity-90 text-white px-2.5 py-1 rounded-md"
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Userprofile;
