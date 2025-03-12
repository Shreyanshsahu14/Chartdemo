import React from 'react';
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(...registerables);

const BarChart = ({ ChartData }) => {
  // Consistent color palette with other charts
  const defaultColors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF8A80', '#A1887F'
  ];

  // Safely access data with proper fallbacks
  const labels = ChartData?.labels || ['Category 1', 'Category 2', 'Category 3'];
  const dataset = ChartData?.datasets?.[0] || { 
    data: [12, 34, 53],
    label: 'Default Dataset'
  };

  // Configure chart data
  const chartData = {
    labels,
    datasets: [{
      ...dataset,
      backgroundColor: dataset.backgroundColor || defaultColors.slice(0, labels.length),
      borderColor: '#ffffff',
      borderWidth: 1,
      hoverBackgroundColor: defaultColors.map(c => `${c}CC`),
      barPercentage: 0.8,
      categoryPercentage: 0.9
    }]
  };

  // Enhanced chart options
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution Chart'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Categories'
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
          text: 'Values'
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div style={{ height: 300, width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChart;