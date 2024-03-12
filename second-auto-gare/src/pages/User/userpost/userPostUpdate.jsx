import Loading from "../../../components/common/loading";
import { GetSingleVehicle } from "../../../redux/vehicleslice/vehiclethunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function UserPostUpdate() {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(id);
  const { singleVehicle: data, singleVehicleLoading: isLoading } = useSelector(
    (state) => state.vehicle
  );

  console.log("single vehicle",data)

  useEffect(() => {
    dispatch(GetSingleVehicle(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <Loading/>
      )
  }
  return (
    <div className="container mx-auto">
      <div className="flex flex-col h-screen px-2 mt-8 md:mt-16 lg:px-12 md:px-12">
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
          <div className="flex items-center justify-center ">a</div>
        </section>
      </div>
    </div>
  );
}

export default UserPostUpdate;
