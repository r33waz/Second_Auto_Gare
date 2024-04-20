import React, { useEffect } from "react";
import SideNav from "../../components/common/SlideNav";
import {
  PieChart,
  Pie,
  Sector,
  Legend,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  userCategoryChart,
  vehicleCategoryChart,
  vehicleStatusChart,
} from "../../redux/charts/chartThunk";
import { Card } from "../../components/common/card";
import { GetAllUser } from "../../redux/userslice/userthunk";
import { FetchVehicle } from "../../redux/vehicleslice/vehiclethunk";
import { GetAllBooking } from "../../redux/booking/bookingthunk";
function Dashboard() {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const { data: vehicle } = useSelector((state) => state.vehicle);
  const { data: booking } = useSelector((state) => state.booking);
  const { usersData } = useSelector((state) => state.chart);
  const { vehicleData } = useSelector((state) => state.chart);
  const { vehicleStatusData } = useSelector((state) => state.chart);
  console.log("usesrData", usersData);

  useEffect(() => {
    dispatch(GetAllUser());
    dispatch(FetchVehicle());
    dispatch(GetAllBooking());
    dispatch(userCategoryChart());
    dispatch(vehicleCategoryChart());
    dispatch(vehicleStatusChart());
  }, [dispatch]);

  const COLORS = [
    "#0a417a",
    "#8464a0",
    "#cea9bc",
    "#323232",
    "#98745c ",
    "#72b4eb",
    "#2085ec",
    "#6a522e",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const rendernewCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={10}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <div className="flex w-full gap-3">
        <SideNav />
        <div className="flex flex-col">
          <div className="flex gap-3 pt-3">
            <Card>
              <div className="flex flex-col animate__animated animate__fadeInUp">
                <div className="flex justify-between">
                  <h1 className="text-2xl"> Normal User</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="28"
                      strokeDashoffset="28"
                      strokeLinecap="round"
                      strokeWidth="2"
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
                </div>
                <h1 className="text-5xl text-purple">{user?.list?.length}</h1>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col animate__animated animate__fadeInUp">
                <div className="flex justify-between">
                  <h1 className="text-2xl">Total Vehicles</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
                  >
                    <path
                      fill="currentColor"
                      d="M5.23 18v1.5q0 .213-.143.356T4.731 20H4.5q-.213 0-.356-.144T4 19.5v-7.346L5.985 6.5q.073-.238.281-.37T6.731 6h3.192V4.462h4.23V6h3.193q.227 0 .412.138t.257.362L20 12.154V19.5q0 .213-.144.356T19.5 20h-.23q-.213 0-.357-.144t-.144-.356V18zm.185-6.846h13.17L17.112 7H6.888zm-.415 1V17zm2.428 3.538q.466 0 .788-.326q.322-.327.322-.794t-.326-.788t-.793-.322t-.79.326t-.321.793t.326.79t.794.321m9.153 0q.467 0 .79-.326q.321-.327.321-.794t-.326-.788t-.794-.322t-.788.326t-.322.793t.326.79t.793.321M5 17h14v-4.846H5z"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl text-purple">{vehicle?.length}</h1>
              </div>
            </Card>
            <Card>
              <div className="flex flex-col animate__animated animate__fadeInUp">
                <div className="flex justify-between">
                  <h1 className="text-2xl"> Total Booking</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    className="p-2 rounded-md bg-purple bg-opacity-20 text-purple"
                  >
                    <path
                      fill="currentColor"
                      d="M7 14.5h7.575q.25 0 .375-.155t.125-.342t-.125-.344t-.375-.159H7q-.213 0-.356.144q-.144.144-.144.357t.144.356T7 14.5m0-4h4q.213 0 .356-.144q.144-.144.144-.357t-.144-.356T11 9.5H7q-.213 0-.356.144Q6.5 9.788 6.5 10t.144.356T7 10.5M4.615 18q-.666 0-1.14-.475Q3 17.051 3 16.385v-8.77q0-.666.475-1.14Q3.949 6 4.615 6h14.77q.666 0 1.14.475q.475.474.475 1.14v1.77q0 .212-.144.356t-.357.144t-.356-.144T20 9.385v-1.77q0-.269-.173-.442T19.385 7H4.615q-.269 0-.442.173T4 7.615v8.77q0 .269.173.442t.442.173h7.173q.213 0 .357.144t.143.357t-.143.356t-.357.143zm16.939-6.046q.106.108.106.238t-.109.238l-.782.782l-.788-.789l.782-.782q.109-.108.24-.108t.235.105zm-1.346 1.858l-5.966 5.965q-.074.073-.167.11t-.192.036h-.306q-.108 0-.189-.08t-.08-.19v-.305q0-.1.036-.192t.11-.168l5.965-5.965zM4 7v10z"
                    />
                  </svg>
                </div>
                <h1 className="text-5xl text-purple">{booking?.length}</h1>
              </div>
            </Card>
          </div>
          <div className="grid w-full grid-cols-1 gap-3 pt-5 md:grid-cols-2 lg:grid-cols-2">
            <div className="flex w-full h-[275px] flex-col p-2  border-2 rounded-lg shadow-[0px_0px_5px_2px_#00000024]">
              <div className="flex justify-between ">
                <h1 className="pl-2 text-sm font-medium text-center">
                  User Analysis
                </h1>
                <div className="flex flex-col items-center justify-between">
                  <h1>Total</h1>
                  <span className="text-3xl font-bold">
                    {user?.list?.length}
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%" className="mr-5">
                <PieChart className="h-full ">
                  <Pie
                    data={usersData}
                    isAnimationActive={true}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={rendernewCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    className="h-full "
                  >
                    {usersData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Legend
                    align="center"
                    margin={{ top: 10 }}
                    verticalAlign="bottom"
                    layout="horizontal"
                    iconSize={10}
                    iconType="circle"
                    className="text-[8px]" // Adjust the text size here
                    formatter={(value) => (
                      <span style={{ fontSize: "10px" }}>{value}</span>
                    )}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex w-full h-[275px] flex-col p-2  border-2 rounded-lg shadow-[0px_0px_5px_2px_#00000024]">
              <div className="flex justify-between ">
                <h1 className="pl-2 text-sm font-medium text-center">
                  Vehicle Category Analysis
                </h1>
                <div className="flex flex-col items-center justify-between">
                  <h1>Total</h1>
                  <span className="text-3xl font-bold">{vehicle?.length}</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%" className="mr-5">
                <PieChart className="h-full ">
                  <Pie
                    data={vehicleData}
                    isAnimationActive={true}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    className="h-full "
                  >
                    {vehicleData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Legend
                    align="center"
                    margin={{ top: 10 }}
                    verticalAlign="bottom"
                    layout="horizontal"
                    iconSize={10}
                    iconType="circle"
                    className="text-[8px]" // Adjust the text size here
                    formatter={(value) => (
                      <span style={{ fontSize: "10px" }}>{value}</span>
                    )}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex w-full h-[275px] flex-col p-2  border-2 rounded-lg shadow-[0px_0px_5px_2px_#00000024]">
              <div className="flex justify-between ">
                <h1 className="pl-2 text-sm font-medium text-center">
                  Vehicle Status Analysis
                </h1>
                <div className="flex flex-col items-center justify-between">
                  <h1>Total</h1>
                  <span className="text-3xl font-bold">
                    {usersData?.length}
                  </span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="100%" className="mr-5">
                <PieChart className="h-full ">
                  <Pie
                    data={vehicleStatusData}
                    isAnimationActive={true}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={rendernewCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    className="h-full "
                  >
                    {vehicleStatusData?.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Legend
                    align="center"
                    margin={{ top: 10 }}
                    verticalAlign="bottom"
                    layout="horizontal"
                    iconSize={10}
                    iconType="circle"
                    className="text-[8px]" // Adjust the text size here
                    formatter={(value) => (
                      <span style={{ fontSize: "10px" }}>{value}</span>
                    )}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
