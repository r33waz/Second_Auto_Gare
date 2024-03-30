import Loading from "../../../components/common/loading";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../shadcn_ui/ui/button";
import { CreateVehicle } from "../../../redux/vehicleslice/vehiclethunk";
import { toast } from "react-toastify";

function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  // const changeMultipleFiles = (e) => {
  //   if (e.target.files) {
  //     const imageArray = Array.from(e.target.files).map((file) =>
  //       URL.createObjectURL(file)
  //     );
  //     setMultipleImages((prevImages) => prevImages.concat(imageArray));
  //   }
  // };

  const onChangeImages = (file) => {
    const files = Array.from(file);
    setImages(files);
  };

  console.log("picture", images);
  

  const { login: user } = useSelector((state) => state.login);
  console.log(user?.id);
  const VehicleSchema = yup.object({
    brand: yup.string().required("Vehicle brand is required"),
    model: yup.string().required("Vehicle model is required"),
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
    category: yup.string().required("Vehicle category is required"),
    mileage: yup
      .number()
      .typeError("Mileage must be a number")
      .positive("Mileage must be a positive number")
      .integer("Mileage must be an integer"),
    fule_type: yup.string().required("Vehicle fuel type is required"),
    color: yup.string().required("Vehicle color is required"),
    year: yup
      .number()
      .typeError("Year must be a number")
      .positive("Year must be a positive number")
      .integer("Year must be an integer"),
    doors: yup
      .number()
      .typeError("Door count must be a number")
      .positive("Door count must be a positive number")
      .integer("Door count must be an integer"),
    transmission: yup.string().required("Vehicle transmission is required"),
    number_of_people: yup
      .number()
      .typeError("Number of people must be a number")
      .positive("Number of people must be a positive number")
      .integer("Number of people must be an integer"),
    drive_type: yup.string().required("Vehicle drive type  is required"),
    status: yup
      .string()
      .oneOf(["sell", "rent"])
      .required("Vehicle status is required"),
    meta_description: yup
      .string()
      .max(50)
      .required("Meta description is required"),
    description: yup.string().max(250).required("Description is required"),
    kilometer: yup
      .number()
      .typeError("Kilometer of vehicle must be a number")
      .positive("Kilometer of vehicle must be a positive number")
      .integer("Kilometer of vehicle must be an integer"),
    file: yup.mixed().test("file", "You need to provide a file", (value) => {
      if (value.length > 0) {
        return true;
      }
      return false;
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(VehicleSchema) });

  const Onsubmit = async (value) => {
    console.log(value);
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
    formData.append("user", user?.id);
    if (value.file && value.file.length > 0) {
      for (const key of Object.keys(value.file)) {
        formData.append("imageUrl", value.file[key]);
      }
    }

    dispatch(CreateVehicle(formData)).then(() => {
      toast.success("Post created sucessfully");
      navigate("/home");
    });
  };

 
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
            Create/Posts
          </span>
        </section>
        <section>
          <div className="flex items-center justify-center ">
            {images.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Uploaded ${index}`}
                style={{ width: "100px", height: "100px", marginRight: "10px" }}
              />
            ))}
            <div className="md:w-[1100px] h-fit w-full mt-2 p-3 border-2 border-gray-400">
              <form onSubmit={handleSubmit(Onsubmit)}>
                <div className="mt-4">
                  <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Brand</label>
                      <input
                        id="brand"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.brand?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("brand")}
                      />
                      <small className="text-xs text-red">
                        {errors.brand?.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Model</label>
                      <input
                        id="model"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.model?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("model")}
                      />
                      <small className="text-xs text-red">
                        {errors.model?.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Price</label>
                      <input
                        id="price"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.price && errors.price.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("price")}
                      />
                      {console.log(errors)}
                      <small className="text-xs text-red">
                        {errors && errors.price && errors.price.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Displacement</label>
                      <input
                        id="displacement"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors &&
                          errors.displacement &&
                          errors.displacement.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("displacement")}
                      />
                      <small className="text-xs text-red">
                        {errors &&
                          errors.displacement &&
                          errors.displacement.message}
                      </small>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Category</label>
                      <input
                        id="category"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.category?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("category")}
                      />
                      <small className="text-xs text-red">
                        {errors.category?.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Mileage</label>
                      <input
                        id="mileage"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.mileage && errors.mileage.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("mileage")}
                      />
                      <small className="text-xs text-red">
                        {errors && errors.mileage && errors.mileage.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Fule type</label>
                      <input
                        id="fule_type"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.fule_type?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("fule_type")}
                      />
                      <small className="text-xs text-red">
                        {errors.fule_type?.message}
                      </small>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Transmission</label>
                      <input
                        id="transmission"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.transmission?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("transmission")}
                      />
                      <small className="text-xs text-red">
                        {errors.transmission?.message}
                      </small>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Color</label>
                      <input
                        id="color"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.color?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("color")}
                      />
                      <span className="text-xs text-red">
                        {errors.color?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Year</label>
                      <input
                        id="year"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.year && errors.year.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("year")}
                      />
                      <span className="text-xs text-red">
                        {errors && errors.year && errors.year?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Doors</label>
                      <input
                        id="doors"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.doors && errors.doors?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("doors")}
                      />
                      <span className="text-xs text-red">
                        {errors && errors.doors && errors.doors?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">No.people</label>
                      <input
                        id="number_of_people"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors &&
                          errors.number_of_people &&
                          errors.number_of_people?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("number_of_people")}
                      />
                      <span className="text-xs text-red">
                        {errors &&
                          errors.number_of_people &&
                          errors.number_of_people?.message}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Drive Type</label>
                      <input
                        id="drive_type"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors.drive_type?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("drive_type")}
                      />
                      <span className="text-xs text-red">
                        {errors.drive_type?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Status</label>
                      <select
                        id="status"
                        className={`h-8 pl-2 border-2 outline-none bg-white ${
                          errors.status?.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        {...register("status")}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select option
                        </option>
                        <option value="sell">Sell</option>
                        <option value="rent">Buy</option>
                      </select>
                      <span className="text-xs text-red">
                        {errors.status?.message}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-lg ">Kilometer</label>
                      <input
                        id="kilometer"
                        className={`h-8 pl-2 border-2 outline-none ${
                          errors && errors.kilometer && errors.kilometer.message
                            ? "border-red"
                            : "border-gray-500"
                        }  `}
                        type="text"
                        {...register("kilometer")}
                      />
                      <span className="text-xs text-red">
                        {errors && errors.kilometer && errors.kilometer.message}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-1 gap-4 mt-3 md:grid-cols-2">
                      <div className="flex flex-col gap-1">
                        <label className="text-lg ">Upload image</label>
                        <input
                          id="file"
                          multiple
                          className={`h-8 pl-2 border-2 outline-none ${
                            errors && errors?.file && errors.file?.message
                              ? "border-red"
                              : "border-gray-500"
                          }  `}
                          type="file"
                          onChange={(e) => onChangeImages(e?.target?.files)}
                          {...register("file")}
                        />
                        <span className="text-xs text-red">
                          {errors && errors?.file && errors.file?.message}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-lg ">Meta Desciption</label>
                        <input
                          id="meta_description"
                          className={`h-8 pl-2 border-2 outline-none ${
                            errors &&
                            errors.meta_description &&
                            errors.meta_description?.message
                              ? "border-red"
                              : "border-gray-500"
                          }  `}
                          type="text"
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
                      }  `}
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
                    <Button className="flex items-center justify-center w-full h-8 text-white bg-green md:w-52 mt-7">
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
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full  py-1.5 text-lg text-white bg-green md:w-52 mt-7"
                    >
                      Save Change
                    </Button>
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

export default CreatePost;

{
  /* <Swiper
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
                        src={e?.url}
                        alt="image"
                        className="object-fill w-[500px] rounded-lg shadow-md h-[300px]"
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper> */
}
{
  /* <div className="flex justify-between w-full h-20 mt-4 "></div> */
}
