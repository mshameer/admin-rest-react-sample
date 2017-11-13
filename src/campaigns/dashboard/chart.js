import React, { Component } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const ActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, percent, name, midValue } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy-10} textAnchor="middle" style={{ fontSize: 12 }} fill={fill}>Guest Total</text>
      <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill} style={{ fontSize: 26 }}  >{midValue}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke="#b9f1ff" fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill="#b9f1ff" stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#b9f1ff" style={{ fontSize: 10 }} >{name}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#b9f1ff" style={{ fontSize: 12 }}>
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const RenderLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, percent, name, index} = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return ( index !== 0 ?
    <g>
      <text style={{ fontSize: 10 }} x={mx + (cos >= 0 ? 1 : -1) } y={my} textAnchor={textAnchor} fill="#b9f1ff">{name}</text>
      <text x={mx + (cos >= 0 ? 1 : -1) } y={my} dy={18} textAnchor={textAnchor} fill="#b9f1ff" style={{ fontSize: 12 }} >
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g> : null
  );
}

export default class TwoLevelPieChart extends Component {

	render () {
  	return (
      <ResponsiveContainer>
      	<PieChart>
          <Pie
          	activeIndex={0}
            dataKey="value"
            activeShape={<ActiveShape  midValue={this.props.midValue} />}
            label={<RenderLabel />}
            data={this.props.data}
            innerRadius={50}
            outerRadius={60}
            fill="#FFF"
            midAngle={120}
            stroke={this.props.stroke}
          />
         </PieChart>
        </ResponsiveContainer>
    );
  }
}
