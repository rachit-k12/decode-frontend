"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import { ActivityData, CategoryData, TrendData } from "@/types/dashboard";

interface ActivityBarChartProps {
  data: ActivityData[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-2">
          {new Date(label).toLocaleDateString("en", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-gray-600">{entry.name}:</span>
              <span className="text-xs font-semibold text-gray-900">
                {entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export function ActivityBarChart({ data }: ActivityBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-muted"
          opacity={0.3}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11 }}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en", { weekday: "short" })
          }
        />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Bar dataKey="reviews" stackId="a" fill="#6366f1" name="Reviews" />
        <Bar dataKey="triage" stackId="a" fill="#10b981" name="Triage" />
        <Bar
          dataKey="mentorship"
          stackId="a"
          fill="#f59e0b"
          name="Mentorship"
        />
        <Bar
          dataKey="documentation"
          stackId="a"
          fill="#8b5cf6"
          name="Documentation"
        />
        <Bar
          dataKey="discussions"
          stackId="a"
          fill="#ec4899"
          name="Discussions"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface DistributionPieChartProps {
  data: CategoryData[];
}

export function DistributionPieChart({ data }: DistributionPieChartProps) {
  const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">
            {data.payload.category}
          </p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: data.payload.fill }}
              />
              <span className="text-xs text-gray-600">Count:</span>
              <span className="text-xs font-semibold text-gray-900">
                {data.value}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full opacity-0" />
              <span className="text-xs text-gray-600">Share:</span>
              <span className="text-xs font-semibold text-gray-900">
                {data.payload.percentage}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
            paddingAngle={4}
            dataKey="value"
            stroke="none"
            cornerRadius={8}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<PieTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {data.map((entry, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1.5"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-gray-700 font-medium">
              {entry.category} ({entry.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface SentimentLineChartProps {
  data: TrendData[];
}

export function SentimentLineChart({ data }: SentimentLineChartProps) {
  const LineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">
            {new Date(label).toLocaleDateString("en", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="flex items-center gap-2">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#6366f1" }}
            />
            <span className="text-xs text-gray-600">Sentiment Score:</span>
            <span className="text-xs font-semibold text-gray-900">
              {payload[0].value}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-muted"
          opacity={0.3}
        />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11 }}
          tickFormatter={(value) =>
            new Date(value).toLocaleDateString("en", {
              day: "numeric",
              month: "short",
            })
          }
        />
        <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
        <Tooltip content={<LineTooltip />} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#6366f1"
          strokeWidth={2.5}
          dot={{ r: 0 }}
          activeDot={{ r: 5, strokeWidth: 2, stroke: "#6366f1", fill: "#fff" }}
          name="Sentiment Score"
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="transparent"
          fill="#6366f1"
          fillOpacity={0.15}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface MultiLineChartProps {
  data: any[];
  lines: Array<{
    dataKey: string;
    color: string;
    name: string;
  }>;
}

export function MultiLineChart({ data, lines }: MultiLineChartProps) {
  const MultiLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-gray-600">{entry.name}:</span>
                <span className="text-xs font-semibold text-gray-900">
                  {entry.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-muted"
          opacity={0.3}
        />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<MultiLineTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            stroke={line.color}
            strokeWidth={2.5}
            name={line.name}
            dot={{ r: 0 }}
            activeDot={{
              r: 5,
              strokeWidth: 2,
              stroke: line.color,
              fill: "#fff",
            }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

interface StackedAreaChartProps {
  data: any[];
}

export function StackedAreaChart({ data }: StackedAreaChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          className="stroke-muted"
          opacity={0.3}
        />
        <XAxis dataKey="date" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: "12px" }} />
        <Area
          type="monotone"
          dataKey="reviews"
          stackId="1"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.8}
          name="Reviews"
        />
        <Area
          type="monotone"
          dataKey="triage"
          stackId="1"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.8}
          name="Triage"
        />
        <Area
          type="monotone"
          dataKey="mentorship"
          stackId="1"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.8}
          name="Mentorship"
        />
        <Area
          type="monotone"
          dataKey="documentation"
          stackId="1"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.8}
          name="Documentation"
        />
        <Area
          type="monotone"
          dataKey="discussions"
          stackId="1"
          stroke="#ec4899"
          fill="#ec4899"
          fillOpacity={0.8}
          name="Discussions"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
