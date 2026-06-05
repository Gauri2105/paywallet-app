import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MonthlyChart = ({ data }) => {
  return (
    <div className="bg-white shadow rounded-xl p-5">
      <h2 className="text-xl font-bold mb-4">
        Monthly Activity
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="amount"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyChart;