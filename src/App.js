import React, { useState, useEffect } from "react";
import {data1, data2 } from './Data';
import { transformData } from "../src/components/utils/transformdata";
import Container from "./components/Container";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FaChartLine } from "react-icons/fa";
import { FaChartPie } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { BiSolidDoughnutChart } from "react-icons/bi";
import { MdGridOn } from "react-icons/md";
import { FaTableList } from "react-icons/fa6";
import { 
  PieChart as PieIcon, 
  BarChart as BarIcon,
  ShowChart as LineIcon,
  DonutLarge as DoughnutIcon,
  GridOn as GridIcon,
  TableChart as TableIcon
} from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const App = () => {
  const [charts, setCharts] = useState([]);
  const [showChartTypeModal, setShowChartTypeModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editChartId, setEditChartId] = useState(null);
  const [draftConfig, setDraftConfig] = useState(null);
  const [selectedDataSource, setSelectedDataSource] = useState('data1');

  const datasets = {
    data1: data1,
    data2: data2
  };

  const visualizations = [
    { type: 'pie', title: 'Pie Chart', icon: <FaChartPie fontSize={80}/> },
    { type: 'bar', title: 'Bar Chart', icon: <FaChartBar fontSize={80} /> },
    { type: 'line', title: 'Line Chart', icon: <FaChartLine fontSize={80} /> },
    { type: 'doughnut', title: 'Doughnut Chart', icon: <BiSolidDoughnutChart fontSize={80} /> },
    { type: 'grid', title: 'Data Grid', icon: <MdGridOn fontSize={80}/> },
    { type: 'datatable', title: 'Data Table', icon: <FaTableList fontSize={80} /> }
  ];

  const fieldConfig = {
    data1: {
      exclude: ["userId", "email", "firstName", "lastName"],
      nestedFields: { roles: "roleName", regions: "regionName" }
    },
    data2: {
      exclude: ["productId", "manufacturer", "specifications", "ratings"],
      nestedFields: { category: null }
    }
  };

  const getFields = (source) => {
    return datasets[source].length > 0 
      ? Object.keys(datasets[source][0]).filter(key => 
          !fieldConfig[source].exclude.includes(key)
        )
      : [];
  };

  const handleCreateStart = () => {
    setShowChartTypeModal(true);
    setDraftConfig({
      dataType: '',
      width: '40%',
      dataSource: selectedDataSource
    });
  };

  const handleChartTypeSelect = (type) => {
    setDraftConfig(prev => ({ ...prev, type }));
    setShowChartTypeModal(false);
    setShowAddModal(true);
  };

  const handleSaveChart = () => {
    if (!draftConfig.dataType) return;
    
    const newChart = {
      ...draftConfig,
      id: editChartId || Date.now(),
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

      {/* Chart Type Selection Modal */}
      <Modal open={showChartTypeModal} onClose={() => setShowChartTypeModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography variant="h6" gutterBottom>
            Select Chart Type
          </Typography>
          <Grid container spacing={2}>
            {visualizations.map(viz => (
              <Grid item xs={6} key={viz.type}>
                <IconButton
                  onClick={() => handleChartTypeSelect(viz.type)}
                  sx={{
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '20px',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {viz.icon}
                    <Typography variant="caption">{viz.title}</Typography>
                  </div>
                </IconButton>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>

      {/* Properties Modal */}
      <Modal open={showAddModal} onClose={() => setShowAddModal(false)}>
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
            {editChartId ? 'Edit Chart' : 'Chart Settings'}
          </Typography>



{/* Chart Type */}
<Box sx={{ my: 2 }}>
  <FormControl fullWidth>
    <InputLabel>Chart Type</InputLabel>
    <Select
      value={draftConfig?.type || 'pie'}
      label="Chart Type"
      onChange={(e) => setDraftConfig(prev => ({
        ...prev,
        type: e.target.value
      }))}
    >
      {visualizations.map(viz => (
        <MenuItem key={viz.type} value={viz.type}>
          {viz.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

{/* Data Source */}
<Box sx={{ my: 2 }}>
  <FormControl fullWidth>
    <InputLabel>Data Source</InputLabel>
    <Select
      value={draftConfig?.dataSource || 'data1'}
      label="Data Source"
      onChange={(e) => setDraftConfig(prev => ({
        ...prev,
        dataSource: e.target.value,
        dataType: ''
      }))}
    >
      <MenuItem value="data1">User Data</MenuItem>
      <MenuItem value="data2">Product Data</MenuItem>
    </Select>
  </FormControl>
</Box>

{/* Data Field */}
<Box sx={{ my: 2 }}>
  <FormControl fullWidth>
    <InputLabel>Data Field</InputLabel>
    <Select
      value={draftConfig?.dataType || ''}
      label="Data Field"
      onChange={(e) => setDraftConfig(prev => ({
        ...prev,
        dataType: e.target.value
      }))}
    >
      <MenuItem value="" disabled>
        Select Field
      </MenuItem>
      {getFields(draftConfig?.dataSource || 'data1').map(field => (
        <MenuItem key={field} value={field}>
          {field}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

{/* Width */}
<Box sx={{ my: 2 }}>
  <FormControl fullWidth>
    <InputLabel>Width</InputLabel>
    <Select
      value={draftConfig?.width || '40%'}
      label="Width"
      onChange={(e) => setDraftConfig(prev => ({
        ...prev,
        width: e.target.value
      }))}
    >
      {["20%", "40%", "60%", "80%", "100%"].map(size => (
        <MenuItem key={size} value={size}>
          {size}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Box>

          <Button 
            variant="contained" 
            onClick={handleSaveChart}
            disabled={!draftConfig?.dataType}
            fullWidth
          >
            {editChartId ? 'Save Changes' : 'Create Chart'}
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
            setShowAddModal(true);
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