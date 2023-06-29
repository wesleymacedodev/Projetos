import { Chart } from "react-google-charts";
import { options } from "../../data/barData";

function Bar(props) {

  return (
    <Chart
    chartType="Bar"
    width="100%"
    height="200px"
    data={props.data}
    options={options}
  />
  )
}

export default Bar
