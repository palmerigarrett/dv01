import React from "react";
import { Bar, BarChart as Chart, Tooltip, XAxis, YAxis } from 'recharts';

const BarChart = (props) => {
  const { data } = props;

  return (
    <Chart
      width={700}
      height={300}
      data={data}
    >
      <XAxis dataKey='grade' />
      <YAxis />
      <Tooltip />
      <Bar dataKey='amount' fill='#8884d8'  />
    </Chart>
  )
};

export default BarChart;