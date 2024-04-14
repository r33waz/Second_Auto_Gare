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
function Dashboard() {
  const dispatch = useDispatch();
  const { usersData } = useSelector((state) => state.chart);
  const { vehicleData } = useSelector((state) => state.chart);
  const { vehicleStatusData } = useSelector((state) => state.chart);
  console.log("usesrData", usersData);

  useEffect(() => {
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
        <div className="grid w-full grid-cols-1 gap-3 pt-5 md:grid-cols-3 lg:grid-cols-3">
          <div className="flex w-full h-[275px] flex-col p-2  border-2 rounded-lg shadow-[0px_0px_5px_2px_#00000024]">
            <div className=" flex justify-between">
              <h1 className="pl-2 text-sm font-medium text-center">
                User Analysis
              </h1>
              <div className="flex flex-col items-center justify-between">
                <h1>Total</h1>
                <span className="text-3xl font-bold">{usersData?.length}</span>
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
            <div className=" flex justify-between">
              <h1 className="pl-2 text-sm font-medium text-center">
                Vehicle Category Analysis
              </h1>
              <div className="flex flex-col items-center justify-between">
                <h1>Total</h1>
                <span className="text-3xl font-bold">{usersData?.length}</span>
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
            <div className=" flex justify-between">
              <h1 className="pl-2 text-sm font-medium text-center">
                Vehicle Status Analysis
              </h1>
              <div className="flex flex-col items-center justify-between">
                <h1>Total</h1>
                <span className="text-3xl font-bold">{usersData?.length}</span>
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
    </>
  );
}

export default Dashboard;
