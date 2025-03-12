// components/DropdownWithDialog.js
import React from 'react';
import { IconButton, Menu, MenuItem, Modal, Box } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const DropdownWithDialog = ({ onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleMenuOpen}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          onEdit();
          handleMenuClose();
        }}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          onDelete();
          handleMenuClose();
        }}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropdownWithDialog;