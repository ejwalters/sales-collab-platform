import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useLanguage } from "@/i18n";
import { useState } from "react";
import { Link } from "react-router-dom";
const CombinedDealsComponent = () => {
  const { isRTL } = useLanguage();

  // Sample data for Deals By Stage
  const stageData: number[] = [44, 55, 41];
  const stageLabels: string[] = ["Discovery", "Validation", "Negotiation"];
  const stageColors: string[] = [
    "var(--tw-primary)",
    "var(--tw-brand)",
    "var(--tw-success)",
  ];

  const dealsByStage = {
    Discovery: [
      { name: "Acme Corp", value: "$50,000", owner: "John Doe" },
      { name: "Beta LLC", value: "$30,000", owner: "Alice Smith" },
    ],
    Validation: [
      { name: "Global Tech", value: "$75,000", owner: "Charlie Brown" },
      { name: "Innovative Solutions", value: "$90,000", owner: "Emma Johnson" },
    ],
    Negotiation: [
      { name: "Bright Future Inc.", value: "$120,000", owner: "Michael Green" },
      { name: "NextGen Systems", value: "$60,000", owner: "Sophia Davis" },
    ],
  };

  const stageOptions: ApexOptions = {
    series: stageData,
    labels: stageLabels,
    colors: stageColors,
    chart: {
      type: "donut",
    },
    stroke: { show: true, width: 2 },
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "70%",
        },
      },
    },
    legend: {
      position: "right",
      offsetY: 0,
      fontSize: "13px",
      fontWeight: "500",
      labels: {
        colors: "var(--tw-gray-700)",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: { position: "bottom" },
        },
      },
    ],
  };

  const openDealsCount = 25; // Sample Open Deals count

  return (
    <div className="card h-full">
      <div className="card-header">
        <h3 className="card-title">Deals Overview</h3>
      </div>
      <div className="card-body grid grid-cols-2 gap-4 p-5 lg:p-7.5 items-center">
        {/* Deals by Stage Pie Chart */}
        <div className="flex justify-center items-center">
          <ApexChart
            id="deals_by_stage_chart"
            options={stageOptions}
            series={stageOptions.series}
            type="donut"
            width="100%"
            height="250"
          />
        </div>

        {/* Open Deals Section */}
        <div className="flex flex-col items-center justify-center gap-2">
          <span
            className="text-6xl font-bold text-white px-6 py-3 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ textShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)" }}
          >
            {openDealsCount}
          </span>
          <span className="text-sm font-medium text-gray-600">Open Deals</span>
          <Link to="/deals" className="text-sm text-primary hover:underline">
            View Deals →
          </Link>
        </div>
      </div>
    </div>
  );
};

export { CombinedDealsComponent };
