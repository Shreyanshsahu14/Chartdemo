import React, { useState, useEffect } from "react";
import { data } from './Data';
import { transformData } from "../src/components/utils/transformdata";
import Container from "./components/Container";
import DynamicDataTable from "./components/DynamicDataTable";
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
  const [newChartConfig, setNewChartConfig] = useState({
    type: 'pie',
    dataType: '',
    width: '40%'
  });

  const dropdownOptions = data.length > 0 
    ? Object.keys(data[0]).filter(
        (key) => !["userId", "email", "firstName", "lastName"].includes(key)
      )
    : [];
    
  const handleEditStart = (chart) => {
    setEditChartId(chart.id);
    setDraftConfig({ ...chart });
  };

  const handleSaveChart = () => {
    if (editChartId) {
      setCharts(charts.map(chart => 
        chart.id === editChartId ? draftConfig : chart
      ));
    } else {
      setCharts([...charts, { ...draftConfig, id: Date.now() }]);
    }
    setEditChartId(null);
    setDraftConfig(null);
    setShowAddModal(false);
  };

  const visualizations = [
    { type: 'pie', title: 'Pie Chart' },
    { type: 'bar', title: 'Bar Chart' },
    { type: 'line', title: 'Line Chart' },
    { type: 'doughnut', title: 'Doughnut Chart' },
    { type: 'grid', title: 'Data Grid' },
    { type: 'datatable', title: 'Data Table' }
  ];
  const handleCreateStart = () => {
    setShowAddModal(true);
    setDraftConfig({
      type: 'pie',
      dataType: dropdownOptions[0],
      width: '40%'
    });
  };

  const handleAddChart = () => {
    setCharts([...charts, {
      id: Date.now(),
      ...newChartConfig,
      dataType: newChartConfig.dataType || dropdownOptions[0]
    }]);
    setShowAddModal(false);
  };

  const handleEditChart = (id, newConfig) => {
    setCharts(charts.map(chart => 
      chart.id === id ? { ...chart, ...newConfig } : chart
    ));
  };

  const handleDeleteChart = (id) => {
    setCharts(charts.filter(chart => chart.id !== id));
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", padding: "20px" }}>
      <Button 
        variant="contained" 
        onClick={handleCreateStart}
        style={{ marginBottom: "20px" }}
      >
        Add New Chart
      </Button>

      {/* Add Chart Modal */}
      <Modal open={showAddModal || !!editChartId} onClose={() => {
        setEditChartId(null);
        setShowAddModal(false);
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
          {editChartId ? 'Edit Chart' : 'Create New Chart'}          </Typography>
          
          <div style={{ marginBottom: "16px" }}>
            <label>Chart Type: </label>
            <select
              value={draftConfig?.type || ''}
              onChange={(e) => setDraftConfig({...draftConfig, type: e.target.value})}
            >
              {visualizations.map(viz => (
                <option key={viz.type} value={viz.type}>{viz.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Data Type: </label>
            <select
              value={draftConfig?.dataType || ''}
              onChange={(e) => setDraftConfig({...draftConfig, dataType: e.target.value})}
            >
              {dropdownOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Width: </label>
            <select
              value={draftConfig?.width || '40%'}
              onChange={(e) => setDraftConfig({...draftConfig, width: e.target.value})}
            >
              {["20%", "40%", "60%", "80%", "100%"].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <Button variant="contained" onClick={handleSaveChart}>
            {editChartId ? 'Save Changes' : 'Create Chart'}
          </Button>
        </Box>
      </Modal>

      {/* Render Charts */}
      {charts.map(chart => (
        <ChartContainer
          key={chart.id}
          chart={chart}
          data={data}
          dropdownOptions={dropdownOptions}
          visualizations={visualizations}
          onEdit={() => handleEditStart(chart)}
          onDelete={() => handleDeleteChart(chart.id)}
        />
      ))}
    </div>
  );
};

const ChartContainer = ({ chart, data, dropdownOptions, visualizations, onEdit, onDelete }) => {
  const [currentData, setCurrentData] = useState(null);
  
  useEffect(() => {
    setCurrentData(transformData(chart.dataType, data));
  }, [chart, data]);

  return (
    <div style={{ position: 'relative', marginBottom: '40px' }}>
      <Container
      ChartType={chart.type}
      ChartData={currentData}
      title={visualizations.find(v => v.type === chart.type).title}
      style={{ width: chart.width }}
      onEdit={onEdit}
      onDelete={onDelete}
    />

      {/* Edit Modal */}
      {/* <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
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
            Edit Chart Properties
          </Typography>

          <div style={{ marginBottom: "16px" }}>
            <label>Chart Type: </label>
            <select
              value={localConfig.type}
              onChange={(e) => setLocalConfig({...localConfig, type: e.target.value})}
            >
              {visualizations.map(viz => (
                <option key={viz.type} value={viz.type}>{viz.title}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Data Type: </label>
            <select
              value={localConfig.dataType}
              onChange={(e) => setLocalConfig({...localConfig, dataType: e.target.value})}
            >
              {dropdownOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Width: </label>
            <select
              value={localConfig.width}
              onChange={(e) => setLocalConfig({...localConfig, width: e.target.value})}
            >
              {["20%", "40%", "60%", "80%", "100%"].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Modal> */}
    </div>
  );
};

export default App;