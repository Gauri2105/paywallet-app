import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const SentReceivedPieChart = ({
  sent,
  received,
}) => {
  const data = [
    {
      name: "Sent",
      value: sent,
    },
    {
      name: "Received",
      value: received,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="font-bold mb-4">
        Sent vs Received
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={100}
          >

            <Cell fill="#3b82f6" />

            <Cell fill="#22c55e" />

          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default SentReceivedPieChart;