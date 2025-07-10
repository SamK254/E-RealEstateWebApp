import * as React from "react";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ user, logout }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar src={user?.picture} alt={user?.name} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => navigate("../favourites", {replace: true})}>Favourites</MenuItem>
        <MenuItem onClick={() => navigate("../bookings", {replace: true})}>Bookings</MenuItem>
        <MenuItem
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}
