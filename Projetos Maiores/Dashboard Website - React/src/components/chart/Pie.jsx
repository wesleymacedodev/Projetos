import React from 'react'
import { Chart } from "react-google-charts";
import { options } from '../../data/pieData'

export default function Pie(props) {
    return (
        <Chart
          chartType="PieChart"
          data={props.data}
          options={options}
          width={"100%"}
          height={"200px"}
        />
      );
}
