import { Chart } from "react-google-charts";
import { options } from "../../data/areaData";

function Area(props) {

  return (
    <Chart
    chartType="AreaChart"
    width="100%"
    height="200px"
    data={props.data}
    options={options}
  />
  )
}

export default Area
