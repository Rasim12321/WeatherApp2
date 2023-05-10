import { PureComponent } from "react";
import styles from "./WeatherCard.module.css";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { ChartType } from "../../store/types";

export default class Chart extends PureComponent<any, ChartType> {
  static demoUrl = "https://codesandbox.io/s/synchronized-line-charts-zc3nl";

  render() {
    return (
      <ResponsiveContainer className={styles.chart} width="95%" height="130%">
        <AreaChart
          width={100}
          height={100}
          data={this.props.prop}
          syncId="anyId"
          margin={{
            top: 0,
            right: 0,
            left: -42,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis mirror={false} dataKey="day" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#82ca9d"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
