// components/AddChartModal.js
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const AddChartModal = ({ open, onClose, chartTypes, dataOptions, onSubmit, chartToEdit }) => {
  const [chartConfig, setChartConfig] = useState({
    title: '',
    chartType: chartTypes[0]?.type || '',
    dataType: dataOptions[0] || '',
    width: '40%'
  });

  useEffect(() => {
    if (chartToEdit) {
      setChartConfig({
        title: chartToEdit.title,
        chartType: chartToEdit.chartType,
        dataType: chartToEdit.dataType,
        width: chartToEdit.width,
        id: chartToEdit.id
      });
    }
  }, [chartToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(chartConfig);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography variant="h6" mb={2}>
          {chartToEdit ? 'Edit Chart' : 'Add New Chart'}
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Chart Title"
            fullWidth
            value={chartConfig.title}
            onChange={(e) => setChartConfig({...chartConfig, title: e.target.value})}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Chart Type</InputLabel>
            <Select
              value={chartConfig.chartType}
              onChange={(e) => setChartConfig({...chartConfig, chartType: e.target.value})}
            >
              {chartTypes.map(type => (
                <MenuItem key={type.type} value={type.type}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Data Type</InputLabel>
            <Select
              value={chartConfig.dataType}
              onChange={(e) => setChartConfig({...chartConfig, dataType: e.target.value})}
            >
              {dataOptions.map(option => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Width</InputLabel>
            <Select
              value={chartConfig.width}
              onChange={(e) => setChartConfig({...chartConfig, width: e.target.value})}
            >
              {["20%", "40%", "60%", "80%", "100%"].map(size => (
                <MenuItem key={size} value={size}>{size}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {chartToEdit ? 'Save Changes' : 'Add Chart'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddChartModal;