'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ElevationPoint } from '@/data/trails';

interface Props {
  data: ElevationPoint[];
  maxElevation: number;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-3 py-2 text-sm">
        <p className="text-gray-500 text-xs">Distance: <span className="font-medium text-gray-700">{label} km</span></p>
        <p className="text-trek-700 font-bold">{payload[0].value.toLocaleString()} m</p>
      </div>
    );
  }
  return null;
};

export default function ElevationChart({ data }: Props) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1f7e1f" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#1f7e1f" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="distance"
            tickFormatter={(v) => `${v}km`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${v.toLocaleString()}m`}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="elevation"
            stroke="#1f7e1f"
            strokeWidth={2.5}
            fill="url(#elevGrad)"
            dot={false}
            activeDot={{ r: 5, fill: '#1f7e1f', stroke: '#fff', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
