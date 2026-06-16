"use client";

import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import './page.css';

// Mock Data representing ClickHouse Analytics
const salesData = [
  { date: 'Mon', sales: 4000, visitors: 2400 },
  { date: 'Tue', sales: 3000, visitors: 1398 },
  { date: 'Wed', sales: 2000, visitors: 9800 },
  { date: 'Thu', sales: 2780, visitors: 3908 },
  { date: 'Fri', sales: 1890, visitors: 4800 },
  { date: 'Sat', sales: 2390, visitors: 3800 },
  { date: 'Sun', sales: 3490, visitors: 4300 },
];

const categoryData = [
  { name: 'Apparel', value: 400 },
  { name: 'Footwear', value: 300 },
  { name: 'Accessories', value: 300 },
  { name: 'Outerwear', value: 200 },
];

const trafficSourceData = [
  { name: 'Organic Search', value: 45 },
  { name: 'Social Media', value: 25 },
  { name: 'Direct', value: 20 },
  { name: 'Referral', value: 10 },
];

const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b'];

export default function AnalyticsDashboardPage() {
  return (
    <div className="admin-analytics-page animate-fade-in">
      <header className="page-header">
        <h1>
          StylePulse Dashboard
          <span className="pulse-indicator" title="Live Connection"></span>
        </h1>
        <p>Real-time analytics and trends powered by ClickHouse.</p>
      </header>

      {/* Top Metrics Row */}
      <div className="metrics-row animate-slide-up">
        <div className="metric-card">
          <span className="metric-title">Total Revenue (7d)</span>
          <span className="metric-value">$19,550</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Unique Visitors (7d)</span>
          <span className="metric-value">30,406</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Conversion Rate</span>
          <span className="metric-value">3.2%</span>
        </div>
        <div className="metric-card">
          <span className="metric-title">Avg. Order Value</span>
          <span className="metric-value">$124.50</span>
        </div>
      </div>

      <div className="charts-grid animate-slide-up" style={{ animationDelay: '100ms' }}>
        {/* Main Chart: Sales over Time */}
        <div className="chart-card">
          <h2>Revenue & Traffic Trends</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="date" stroke="var(--color-text-secondary)" />
                <YAxis yAxisId="left" stroke="var(--color-text-secondary)" />
                <YAxis yAxisId="right" orientation="right" stroke="var(--color-text-secondary)" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--color-text-primary)' }}
                />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sales" name="Sales ($)" stroke="var(--color-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
                <Line yAxisId="right" type="monotone" dataKey="visitors" name="Visitors" stroke="var(--color-secondary)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          {/* Sub Chart 1: Categories */}
          <div className="chart-card" style={{ height: '300px' }}>
            <h2>Top Categories</h2>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--color-text-secondary)" />
                  <YAxis dataKey="name" type="category" stroke="var(--color-text-secondary)" width={80} />
                  <Tooltip 
                    cursor={{ fill: 'var(--color-surface-hover)' }}
                    contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sub Chart 2: Traffic Sources */}
          <div className="chart-card" style={{ height: '300px' }}>
            <h2>Traffic Sources</h2>
            <div className="chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {trafficSourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
