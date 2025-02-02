import React from "react";
import { FaOpencart } from "react-icons/fa6";
import { MdOutlineCategory } from "react-icons/md";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const productData = useSelector((state) => state.product.productList);
  const categoryData = useSelector((state) => state.category.categoryList);

  // Bar Chart options and series
  const barChartOptions = {
    chart: {
      id: "barChart",
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: categoryData.length,
              color: "#33FF99", // Green color for categories
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Products", "Categories"],
    },
    colors: ["#008FFB"],
  };

  const barChartSeries = [
    {
      name: "Counts",
      data: [productData.length, categoryData.length],
    },
  ];

  // Line Chart options and series for a multi-axis chart
  const lineChartOptions = {
    chart: {
      id: "lineChart",
      height: 350,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: [
      {
        title: {
          text: "Products",
        },
      },
      {
        opposite: true,
        title: {
          text: "Categories",
        },
      },
    ],
  };

  // Assuming these are your datasets for the line chart
  const lineChartSeries = [
    {
      name: "Products",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 120, 95, 65],
    },
    {
      name: "Categories",
      data: [70, 89, 76, 57, 56, 55, 40, 45, 30, 65, 80, 70],
      // Assigning it to the second y-axis
      yAxisIndex: 1,
    },
  ];

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="font-semibold text-2xl">Welcome back !!</h1>
      <div className="grid grid-cols-12 gap-3 w-full">
        <div className="col-span-6  shadow-md border border-gray-300 rounded-lg w-full p-6 flex items-center bg-white">
          <div className="grid grid-cols-12 gap-2 w-full px-10">
            <div className="col-span-3">
              <FaOpencart className="w-20 h-20 " />
            </div>
            <div className="col-span-9 flex flex-col gap-2 items-center justify-center w-full">
              <h2 className="font-semibold text-2xl">All Products</h2>
              <p className="font-semibold text-xl text-gray-400">
                {productData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-6  shadow-md border border-gray-300 rounded-lg w-full p-6 flex items-center bg-white">
          <div className="grid grid-cols-12 gap-2 w-full px-10">
            <div className="col-span-3">
              <MdOutlineCategory className="w-20 h-20 " />
            </div>
            <div className="col-span-9 flex flex-col gap-2 items-center justify-center w-full">
              <h2 className="font-semibold text-2xl">All Categories</h2>
              <p className="font-semibold text-xl text-gray-400">
                {categoryData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 shadow-md border border-gray-300 rounded-lg w-full p-10 flex items-center bg-white justify-center">
          <div className="grid grid-cols-12 gap-3 w-full">
            {/* Bar Chart for Products and Categories */}
            <div className="col-span-6 shadow-md border border-gray-300 rounded-lg p-6">
              <ReactApexChart
                options={barChartOptions}
                series={barChartSeries}
                type="bar"
                height={350}
              />
            </div>

            {/* Line Chart with Multiple Axes */}
            <div className="col-span-6 shadow-md border border-gray-300 rounded-lg p-6">
              <ReactApexChart
                options={lineChartOptions}
                series={lineChartSeries}
                type="line"
                height={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
