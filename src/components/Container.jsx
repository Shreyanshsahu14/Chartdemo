import React, { memo } from 'react';
import PieChart from './PieChart';
import BarChart from './BarChart';
import LineChart from './LineChart';
import DoughnutChart from './DoughnutChart';
import Grid from './Grid';
import DropdownWithDialog from "./Dropdown";

// Memoized chart components
const MemoizedPieChart = memo(PieChart);
const MemoizedBarChart = memo(BarChart);
const MemoizedLineChart = memo(LineChart);
const MemoizedDoughnutChart = memo(DoughnutChart);
const MemoizedGrid = memo(Grid);

const Container = ({ 
  ChartType, 
  ChartData, 
  title, 
  style,
  onEdit,
  onDelete
}) => {
  const renderContent = () => {
    switch(ChartType) {
      case 'pie':
        return <MemoizedPieChart ChartData={ChartData} />;
      case 'bar':
        return <MemoizedBarChart ChartData={ChartData} />;
      case 'line':
        return <MemoizedLineChart ChartData={ChartData} />;
      case 'doughnut':
        return <MemoizedDoughnutChart ChartData={ChartData} />;
      case 'grid':
        return <MemoizedGrid ChartData={ChartData} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ 
      ...style, 
      position: 'relative',
      marginBottom: 40,
      padding: 16,
      backgroundColor: "#E0E8F0",
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      {/* Header with title and menu */}
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16
      }}>
        <h2 style={{ margin: 0, color: '#2c3e50' }}>{title}</h2>
        <DropdownWithDialog 
          onEdit={onEdit} 
          onDelete={onDelete}
        />
      </div>

      {/* Chart content */}
      <div style={{ 
        width: '100%',
        height: `calc(100% - 40px)`,
        position: 'relative'
      }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default memo(Container);