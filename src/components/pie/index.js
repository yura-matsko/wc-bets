import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';

import './styles.css';

function Label({ x, y, children }) {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".33em"
      fontSize={9}
    >
      {children}
    </text>
  );
}

export default ({
  width,
  height,
  total,
  margin = {
    top: 30,
    left: 20,
    right: 20,
    bottom: 110,
  }
}) => {
  if (width < 10) return null;
  const radius = width / 1.5;
  return (
    <div className="pie-holder">
      <svg width={width} height={height}>
        <Group top={height/2} left={width/2}>
          <Pie
            data={total}
            pieValue={d => d.score}
            outerRadius={radius - 80}
            innerRadius={radius - 120}
            fill="white"
            fillOpacity={d => 1 / (d.index + 2) }
            cornerRadius={3}
            padAngle={0}
            centroid={(centroid, arc) => {
              const [x, y] = centroid;
              const { startAngle, endAngle } = arc;
              if (endAngle - startAngle < .1) return null;
              return <Label x={x} y={y}>{arc.data.name}</Label>;
            }}
          />
          <Pie
            data={total}
            pieValue={d => d.score}
            outerRadius={radius - 135}
            fill="black"
            fillOpacity={d => 1 / (d.index + 2) }
            centroid={(centroid, arc) => {
              const [x, y] = centroid;
              return <Label x={x} y={y}>{arc.data.score}</Label>;
            }}
          />
        </Group>
      </svg>
    </div>
  );
}