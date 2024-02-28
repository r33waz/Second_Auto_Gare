import Loading from "../../components/common/loading";
import { getData } from "../../service/axiosservice";
import React from "react";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";

function Category() {
  const category = useParams();
  const { data, isLoading } = useSWR(
    `api/v1/vehicle/category/?category=${category?.vehicle}`,
    (url) => getData(url).then((res) => res)
  );
  console.log(data);
  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  return (
    <div className="container mx-auto">
      <div className="px-2 md:mt-16 lg:px-12 md:px-12">
        <div className="flex items-center justify-start gap-3">
          <Link to="/home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="text-purple"
            >
              <path
                fill="currentColor"
                d="M2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2S2 6.48 2 12m18 0c0 4.42-3.58 8-8 8s-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8M8 12l4-4l1.41 1.41L11.83 11H16v2h-4.17l1.59 1.59L12 16z"
              />
            </svg>
          </Link>
          <span className="text-sm font-light uppercase lg:text-base text-purple">
            Vehicles / {category?.vehicle}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Category;
