import Loading from "../../../components/common/loading";
import {
  GetSingleVehicle,
  UpdateVehicle,
} from "../../../redux/vehicleslice/vehiclethunk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Save_btn } from "../../../components/common/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function UserPostUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const { singleVehicle: data, singleVehicleLoading: isLoading } = useSelector(
    (state) => state.vehicle
  );
  const Vehicle = data;
  console.log("vehicle", Vehicle?.user?._id);

  useEffect(() => {
    dispatch(GetSingleVehicle(id));
  }, [dispatch, id]);

  const VehicleSchema = yup.object({
    brand: yup.string(),
    model: yup.string(),
    price: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .integer("price must be an integer"),
    displacement: yup
      .number()
      .typeError("Displacement must be a number")
      .positive("Displacement must be a positive number")
      .integer("Displacement must be an integer"),
    category: yup.string(),
    mileage: yup
      .number()
      .typeError("Mileage must be a number")
      .positive("Mileage must be a positive number")
      .integer("Mileage must be an integer"),
    fule_type: yup.string(),
    color: yup.string(),
    year: yup
      .number()
      .typeError("Year must be a number")
      .positive("Year must be a positive number")
      .integer("Year must be an integer"),
    door: yup
      .number()
      .typeError("Door count must be a number")
      .positive("Door count must be a positive number")
      .integer("Door count must be an integer"),
    number_of_people: yup
      .number()
      .typeError("Number of people must be a number")
      .positive("Number of people must be a positive number")
      .integer("Number of people must be an integer"),
    drive_type: yup.string(),
    status: yup.string(),
    meta_description: yup.string().max(100),
    description: yup.string().max(250),
    kilometer: yup
      .number()
      .typeError("Kilometer of people must be a number")
      .positive("Kilometer of people must be a positive number")
      .integer("Kilometer of people must be an integer"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(VehicleSchema) });

  const Onsubmit = async (value) => {
    const formData = new FormData();
    formData.append("brand", value?.brand);
    formData.append("model", value?.model);
    formData.append("price", value?.price);
    formData.append("displacement", value?.displacement);
    formData.append("color", value?.color);
    formData.append("year", value?.year);
    formData.append("fule_type", value?.fule_type);
    formData.append("transmission", value?.transmission);
    formData.append("mileage", value?.mileage);
    formData.append("doors", value?.doors);
    formData.append("number_of_people", value?.number_of_people);
    formData.append("category", value?.category);
    formData.append("status", value?.status);
    formData.append("meta_description", value?.meta_description);
    formData.append("description", value?.description);
    formData.append("drive_type", value?.drive_type);
    formData.append("kilometer", value?.kilometer);
    formData.append("user", Vehicle?.user?._id);
    console.log(formData);
    if (value.imageUrl && value.imageUrl.length > 0) {
      for (const key of Object.keys(value.imageUrl)) {
        formData.append("imageUrl", value.imageUrl[key]);
      }
    }
    console.log("form Data", formData);
    dispatch(UpdateVehicle({ id, data: formData })).then(() => {
      dispatch(GetSingleVehicle(id));
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto">
      <div className="flex flex-col px-2 mt-8 mb-4 md:mt-16 lg:px-12 md:px-12">
        <section className="flex items-center">
          <Link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-purple "
            >
              <path
                fill="currentColor"
                d="m12 15.288l.688-.688l-2.1-2.1H15.5v-1h-4.912l2.1-2.1L12 8.712L8.712 12zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924q-1.216-1.214-1.925-2.856Q3 13.87 3 12.003q0-1.866.708-3.51q.709-1.643 1.924-2.859q1.214-1.216 2.856-1.925Q10.13 3 11.997 3q1.866 0 3.51.708q1.643.709 2.859 1.924q1.216 1.214 1.925 2.856Q21 10.13 21 11.997q0 1.866-.708 3.51q-.709 1.643-1.924 2.859q-1.214 1.216-2.856 1.925Q13.87 21 12.003 21M12 20q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20m0-8"
              />
            </svg>
          </Link>
          <span className="text-lg font-light uppercase text-purple">
            Update/Posts
          </span>
        </section>
        <section>
          <div className="flex items-center justify-center ">
            <div className="md:w-[1000px] h-fit w-full p-3 border-2 border-gray-400">
              <Swiper
                slidesPerView={1}
                spaceBetween={10}
                rewind={true}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                }}
                modules={[Autoplay]}
                className="w-full h-"
              >
                {data?.imageUrl?.map((e) => {
                  return (
                    <SwiperSlide key={e.id}>
                      <img
                        loading="lazy"
                        src={e?.url}
                        alt="image"
                        className="object-fill w-[500px] rounded-lg shadow-md h-[300px]"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {/* <div className="flex justify-between w-full h-20 mt-4 "></div> */}
              <form onSubmit={handleSubmit(Onsubmit)}>
                <div className="mt-4">
                  <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Brand</label>
                      <input
                        id="brand"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md outline-none"
                        type="text"
                        defaultValue={data?.brand}
                        {...register("brand")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Model</label>
                      <input
                        id="model"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md outline-none"
                        type="text"
                        defaultValue={data?.model}
                        {...register("model")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Price</label>
                      <input
                        id="price"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.price && errors.price.message
                            ? "border-red"
                            : "border-gray-500"
                        }  rounded-md`}
                        type="text"
                        defaultValue={data?.price}
                        {...register("price")}
                      />
                      {console.log(errors)}
                      <small className="text-xs text-red">
                        {errors && errors.price && errors.price.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">
                        Displacement
                      </label>
                      <input
                        id="displacement"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md outline-none"
                        type="text"
                        defaultValue={data?.displacement}
                        {...register("displacement")}
                      />
                      <small className="text-xs text-red">
                        {errors &&
                          errors.displacement &&
                          errors.displacement.message}
                      </small>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Category</label>
                      <input
                        id="category"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md"
                        type="text"
                        defaultValue={data?.category}
                        {...register("category")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Mileage</label>
                      <input
                        id="mileage"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.mileage && errors.mileage.message
                            ? "border-red"
                            : "border-gray-500"
                        }  rounded-md`}
                        type="text"
                        defaultValue={data?.mileage}
                        {...register("mileage")}
                      />
                      <small className="text-xs text-red">
                        {errors && errors.mileage && errors.mileage.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Fule type</label>
                      <input
                        id="fule_type"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md"
                        type="text"
                        defaultValue={data?.fule_type}
                        {...register("fule_type")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">
                        Transmission
                      </label>
                      <input
                        id="transmission"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md"
                        type="text"
                        defaultValue={data?.transmission}
                        {...register("transmission")}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Color</label>
                      <input
                        id="color"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md"
                        type="text"
                        defaultValue={data?.color}
                        {...register("color")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Year</label>
                      <input
                        id="year"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.year && errors.year.message
                            ? "border-red"
                            : "border-gray-500"
                        }  rounded-md`}
                        type="text"
                        defaultValue={data?.year}
                        {...register("year")}
                      />
                      <span className="text-xs text-red">
                        {errors && errors.year && errors.year.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Doors</label>
                      <input
                        id="doors"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.door && errors.door.message
                            ? "border-red"
                            : "border-gray-500"
                        }  rounded-md`}
                        type="text"
                        defaultValue={data?.doors}
                        {...register("doors")}
                      />
                      <span className="text-xs text-red">
                        {errors && errors.door && errors.door.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">No.people</label>
                      <input
                        id="number_of_people"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors &&
                          errors.number_of_people &&
                          errors.number_of_people
                            ? "border-red"
                            : "border-gray-500"
                        }  rounded-md`}
                        type="text"
                        defaultValue={data?.number_of_people}
                        {...register("number_of_people")}
                      />
                      <span className="text-xs text-red">
                        {errors &&
                          errors.number_of_people &&
                          errors.number_of_people}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">
                        Drive Type
                      </label>
                      <input
                        id="drive_type"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md"
                        type="text"
                        defaultValue={data?.drivetype}
                        {...register("drive_type")}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Status</label>
                      <select
                        id="status"
                        className="h-8 pl-2 border-2 border-gray-500 rounded-md"
                        defaultValue={data?.status}
                        {...register("status")}
                      >
                        <option value="Sell">Sell</option>
                        <option value="Buy">Buy</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg font-semibold">Kilometer</label>
                      <input
                        id="kilometer"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.kilometer && errors.kilometer.message
                            ? "border-red"
                            : "border-gray-500"
                        }  rounded-md`}
                        type="text"
                        defaultValue={data?.kilometer}
                        {...register("kilometer")}
                      />
                      <span className="text-xs text-red">
                        {errors && errors.kilometer && errors.kilometer.message}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-1 gap-2 mt-3 md:grid-cols-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold">
                          Upload image
                        </label>
                        <input
                          id="imageUrl"
                          multiple
                          className="border-2 pl-2 pt-0.5 h-8 border-gray-500 rounded-md"
                          type="file"
                          {...register("imageUrl", { required: true })}
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-lg font-semibold">
                          Meta Desciption
                        </label>
                        <input
                          id="meta_description"
                          className={`h-8 pl-2 border-2 outline-none ${
                            errors &&
                            errors.meta_description &&
                            errors.meta_description?.message
                              ? "border-red"
                              : "border-gray-500"
                          }  rounded-md`}
                          type="text"
                          defaultValue={data?.meta_description}
                          {...register("meta_description")}
                        />
                        <span className="text-xs text-red">
                          {errors &&
                            errors.meta_description &&
                            errors.meta_description?.message}
                        </span>
                      </div>
                    </div>
                    <textarea
                      placeholder="description"
                      className={`h-16 pl-2 border-2 outline-none ${
                        errors &&
                        errors.description &&
                        errors.description?.message
                          ? "border-red"
                          : "border-gray-500"
                      }  rounded-md`}
                      defaultValue={data?.description}
                      {...register("description")}
                    />
                    <span className="text-xs text-red">
                      {errors &&
                        errors.description &&
                        errors.description?.message}
                    </span>
                  </div>
                </div>
                <div className="flex justify-end">
                  {isSubmitting ? (
                    <Save_btn
                      type="submit"
                      className="flex items-center justify-center w-full h-8 text-white bg-green md:w-52 mt-7"
                    >
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
                    </Save_btn>
                  ) : (
                    <Save_btn
                      type="submit"
                      className="w-full h-8 text-white bg-green md:w-52 mt-7"
                    >
                      Save Change
                    </Save_btn>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default UserPostUpdate;
