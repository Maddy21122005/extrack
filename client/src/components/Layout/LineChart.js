import { Line } from "@ant-design/charts";

const LineChart = ({
  data,
  xField,
  yField,
  width,
  height,
  smooth = true,
  color,
  tooltip,
}) => {
  const config = {
    data,
    xField,
    yField,
    width,
    height,
    smooth,
    color,
    tooltip,
  };

  return <Line {...config} />;
};

export default LineChart;
