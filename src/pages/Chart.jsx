import React, { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";

// Register the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function BarChart() {
  const [chartData, setChartData] = useState([]);
  const { userId } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const days = new Set();

  const data = {
    labels: [
      "January",
      "February",
      "march",
      "February",
      "march",
      "February",
      "march",
    ],
    datasets: [
      {
        label: "Credit",
        data: [30, 20],
        backgroundColor: "#FCAA0B",
        borderWidth: 0,
        borderRadius: 12,
        maxBarThickness: 60,
      },
      {
        label: "Debit",
        data: [30, 20],
        backgroundColor: "#4D78FF",
        borderWidth: 0,
        borderRadius: 12,
        maxBarThickness: 60,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {},
    },
  };

  const fetch7DaysData = async () => {
    try {
      setLoading(true);
      if (!userId) {
        return;
      }
      const url =
        "https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days";

      const res = await axios.get(url, {
        headers: {
          "x-hasura-admin-secret":
            "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
          "x-hasura-role": "user",
          "x-hasura-user-id": userId,
        },
      });

      if (res.status === 200) {
        setChartData(res.data.last_7_days_transactions_credit_debit_totals);
        setLoading(false);
        const daysData = new Map();
        res.data.last_7_days_transactions_credit_debit_totals.map((data) => {
          const { date, sum, type } = data;

          const day = weekday[new Date(date).getDay()];
          let totalObject;
          if (!daysData.day) {
            totalObject = { credit: 0, debit: 0 };
          } else {
            totalObject = daysData.get(day);
          }
          totalObject[type] = sum;
          daysData.set(day, totalObject);
        });
        console.log(daysData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetch7DaysData();
  }, [userId]);

  return (
    <div className="mt-4">
      {loading ? (
        <div className="flex items-center justify-center h-[300px]">
          <Loader />
        </div>
      ) : (
        <Bar className="" data={data} options={options} />
      )}
    </div>
  );
}

export default BarChart;
