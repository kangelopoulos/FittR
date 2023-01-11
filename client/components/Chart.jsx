import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

/**
 * Register the chart
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * Pass in weights, create the chart.
 */
const Chart = ({ weights }) => {
  const initialData = {
    labels: weights
      .map((data) => data.date)
      .filter((date, idx, self) => self.indexOf(date) === idx),
    datasets: [
      {
        label: "Weights",
        data: weights
          .reduce((acc, cur) => {
            const found = acc.find((val) => val.date == cur.date);
            if (found) {
              found.weight += cur.weight;
              found.count++;
              return acc;
            } else {
              cur.count = 1;
              return [...acc, { ...cur }];
            }
          }, [])
          .map((weight) => (weight.weight / weight.count).toFixed(2)),
        backgroundColor: "#ebecec",
        borderColor: "#f4d35e",
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return (
    <div id="chart">
      <Line className="line-chart-js" data={initialData} options={options} />
    </div>
  );
};

export default Chart;
