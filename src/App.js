import React, { useState, useEffect } from "react";
import { data1, data2 } from './Data';
import { transformData } from "../src/components/utils/transformdata";
import Container from "./components/Container";
import DropdownWithDialog from "./components/Dropdown";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const App = () => {
  const [charts, setCharts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editChartId, setEditChartId] = useState(null);
  const [draftConfig, setDraftConfig] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState('data1');

  const datasets = {
    data1: data1,
    data2: data2
  };

  const fieldConfig = {
    data1: {
      exclude: ["userId", "email", "firstName", "lastName"],
      nestedFields: {
        roles: "roleName",
        regions: "regionName"
      }
    },
    data2: {
      exclude: ["productId", "manufacturer", "specifications", "ratings"],
      nestedFields: {
        category: null
      }
    }
  };

  const visualizations = [
    { type: 'pie', title: 'Pie Chart' },
    { type: 'bar', title: 'Bar Chart' },
    { type: 'line', title: 'Line Chart' },
    { type: 'doughnut', title: 'Doughnut Chart' },
    { type: 'grid', title: 'Data Grid' },
    { type: 'datatable', title: 'Data Table' }
  ];

  const getFields = (source) => {
    return datasets[source].length > 0 
      ? Object.keys(datasets[source][0]).filter(key => 
          !fieldConfig[source].exclude.includes(key)
        )
      : [];
  };

  const handleCreateStart = () => {
    setShowAddModal(true);
    setDraftConfig({
      type: 'pie',
      dataType: '',
      width: '40%',
      dataSource: selectedDataSource
    });
  };

  const handleSaveChart = () => {
    if (!draftConfig.dataType) return;
    
    const newChart = {
      ...draftConfig,
      id: editChartId || Date.now(),
      dataSource: draftConfig.dataSource
    };

    setCharts(prev => editChartId 
      ? prev.map(chart => chart.id === editChartId ? newChart : chart)
      : [...prev, newChart]
    );
    setShowAddModal(false);
    setEditChartId(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: 20, display: 'flex', gap: 20 }}>
        <Button variant="contained" onClick={handleCreateStart}>
          Add New Chart
        </Button>
        
          {/* <select 
            value={selectedDataSource}
            onChange={(e) => setSelectedDataSource(e.target.value)}
            style={{ padding: '8px' }}
          >
            <option value="data1">User Data</option>
            <option value="data2">Product Data</option>
          </select> */}
      </div>

      <Modal open={showAddModal || !!editChartId} onClose={() => {
        setShowAddModal(false);
        setEditChartId(null);
      }}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4
        }}>
          <Typography variant="h6" gutterBottom>
            {editChartId ? 'Edit Chart' : 'New Chart'}
          </Typography>

          <div style={{ margin: '10px 0' }}>
            <label>Data Source: </label>
            <select
              value={draftConfig?.dataSource || 'data1'}
              onChange={(e) => setDraftConfig(prev => ({
                ...prev,
                dataSource: e.target.value,
                dataType: ''
              }))}
            >
              <option value="data1">User Data</option>
              <option value="data2">Product Data</option>
            </select>
          </div>

          <div style={{ margin: '10px 0' }}>
            <label>Chart Type: </label>
            <select
              value={draftConfig?.type || 'pie'}
              onChange={(e) => setDraftConfig(prev => ({
                ...prev,
                type: e.target.value
              }))}
            >
              {visualizations.map(viz => (
                <option key={viz.type} value={viz.type}>{viz.title}</option>
              ))}
            </select>
          </div>

          <div style={{ margin: '10px 0' }}>
            <label>Data Field: </label>
            <select
              value={draftConfig?.dataType || ''}
              onChange={(e) => setDraftConfig(prev => ({
                ...prev,
                dataType: e.target.value
              }))}
            >
              <option value="">Select Field</option>
              {getFields(draftConfig?.dataSource || 'data1').map(field => (
                <option key={field} value={field}>{field}</option>
              ))}
            </select>
          </div>

          <div style={{ margin: '10px 0' }}>
            <label>Width: </label>
            <select
              value={draftConfig?.width || '40%'}
              onChange={(e) => setDraftConfig(prev => ({
                ...prev,
                width: e.target.value
              }))}
            >
              {["20%", "40%", "60%", "80%", "100%"].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <Button 
            variant="contained" 
            onClick={handleSaveChart}
            disabled={!draftConfig?.dataType}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {charts.map(chart => (
        <ChartContainer
          key={chart.id}
          chart={chart}
          datasets={datasets}
          fieldConfig={fieldConfig}
          onEdit={() => {
            setDraftConfig(chart);
            setEditChartId(chart.id);
          }}
          onDelete={() => setCharts(prev => prev.filter(c => c.id !== chart.id))}
        />
      ))}
    </div>
  );
};

const ChartContainer = ({ chart, datasets, fieldConfig, onEdit, onDelete }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const transformed = transformData(
      chart.dataType,
      datasets[chart.dataSource],
      fieldConfig[chart.dataSource].nestedFields
    );
    setChartData(transformed);
  }, [chart, datasets]);

  return (
    <Container
      ChartType={chart.type}
      ChartData={chartData}
      title={`${chart.dataSource} - ${chart.dataType}`}
      style={{ width: chart.width }}
      onEdit={onEdit}
      onDelete={onDelete}
    />
  );
};
export default App;