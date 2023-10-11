import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";

import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import "./ProfileBar.css";
import Cookies from "js-cookie";

export default function ProfileBar({ user_email }) {
  const handleLogout = () => {
    setAnchorEl(null);
    // localStorage.removeItem("accessToken");
    Cookies.remove("authToken");

    window.location.reload();
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          marginRight: "1rem",
        }}
      >
        <Tooltip title={user_email}>
          <IconButton
            //   style={{padding:"1rem"}}
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar className="profile-btn" sx={{ width: 32, height: 32 }}>
              {user_email.slice(0, 1)}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            // fontFamily: "Kanit, sans-serif",
            borderRadius: "0.5rem",
            bgcolor: " #FFFFFF",
            color: "#484848",
            overflow: "visible",
            // border : "1px solid #E3E3E3",
            filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              //   fontFamily: "Kanit, sans-serif",

              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: " #FFFFFF",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          style={{ fontFamily: "Kanit, sans-serif" }}
        >
          <Avatar /> {user_email}
        </MenuItem>

        <Divider />
        {/* <MenuItem
          onClick={handleClose}
          style={{ fontFamily: "Kanit, sans-serif" }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          style={{ fontFamily: "Kanit, sans-serif" }}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem
          onClick={handleLogout}
          style={{ fontFamily: "Kanit, sans-serif" }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
