import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Rectangle,
  XAxis,
  CartesianGrid,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { SpeciesData } from "@/types/species";

type ChartComponentProps = {
  speciesData: SpeciesData[];
  onBarClick: (data: { name: string; count: number }) => void;
};

const CategoryBarChart = ({ speciesData, onBarClick }: ChartComponentProps) => {
  const [catergoryData, setCategoryData] = useState(null);
  const [barChartFilter, setBarChartFilter] = useState<any>("Category");

  useEffect(() => {
    if (speciesData) {
      const categoryCount = speciesData.reduce((acc: any, curr: any) => {
        const category = curr[barChartFilter];
        if (category) {
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category]++;
        }
        return acc;
      }, {});
      setCategoryData(categoryCount);
    }
  }, [speciesData, barChartFilter]);

  const chartData =
    catergoryData &&
    Object.keys(catergoryData).map((category: any) => ({
      name: category,
      count: catergoryData[category],
    }));

  if (chartData)
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={700}
          height={300}
          data={chartData}
          margin={{
            top: 0,
            right: 35,
            left: 0,
            bottom: 5,
          }}
          onClick={(data) => {
            if (data && data.activePayload && data.activePayload[0]) {
              onBarClick(data.activePayload[0].payload);
            }
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill="#454839"
            activeBar={<Rectangle fill="#138483" stroke="#205c35" />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
};

export default CategoryBarChart;
