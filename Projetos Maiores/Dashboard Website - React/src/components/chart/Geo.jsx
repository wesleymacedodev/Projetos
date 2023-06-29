import React from 'react'
import { Chart } from 'react-google-charts'

export default function Geo(props) {
  return (
    <Chart
    chartType="GeoChart"
    width="100%"
    height="200px"
    data={props.data}
  />
  )
}
