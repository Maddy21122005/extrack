import { Pie } from "@ant-design/charts";

const PieChart = ({
  data,
  width,
  height,
  radius,
  innerRadius,
  startAngle,
  endAngle,
  legend,
  label,
  color,
  interactions,
}) => {
  const config = {
    data,
    angleField: "value",
    colorField: "type",

    width,
    height,
    radius,
    innerRadius,
    startAngle,
    endAngle,
    legend,
    label,
    interactions,
    color
  };

  return <Pie {...config} />;
};

export default PieChart;
