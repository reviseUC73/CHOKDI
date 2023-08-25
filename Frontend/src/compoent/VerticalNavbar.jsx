import React from "react";
import "./VerticalNavbar.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
function VerticalNavbar() {
  return (
    <div className="nav_container_mui">
      <Stack direction="column" spacing={3}>
        {/* <Button
          variant="outlined"
          sx={{
            fontSize: "0.8rem",
            display: "flex",
            color: "#8394f8",
            borderColor: "#DCE2EB",
            borderRadius: "1.5rem",
            paddingBottom: "1.8rem",
            paddingTop: "1.8rem",
            boxShadow: "1px 1px 2px 3px rgba(0, 0, 0, 0.04)",
            "&:hover": {
              borderColor: " #8394f8 ",
            },
            flexDirection: "column",
            alignItems: "center", // Optional: Align content in the center vertically
            margin: "1rem",
          }}
        >
          <HomeIcon />
          Home
        </Button> */}
        
        <Button
          variant="outlined"
          sx={{
            fontSize: "0.65rem",

   
            backgroundColor: "#f3f7fe",
            display: "flex",
            color: "#8394f8",
            borderColor: "#DCE2EB",
            borderRadius: "1.5rem",
            paddingBottom: "1.5rem",
            paddingTop: "1.5rem",
            boxShadow: "1px 1px 2px 3px rgba(0, 0, 0, 0.04)",
            "&:hover": {
              borderColor: " #8394f8 ",
            },
            flexDirection: "column",
            alignItems: "center", // Optional: Align content in the center vertically
            margin: "1rem",
          }}
        >
          <HomeIcon fontSize="small"/>
          Home
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "0.65rem",
            display: "flex",
            color: "#8394f8",
            borderColor: "#DCE2EB",
            borderRadius: "1.5rem",
            backgroundColor: "#f3f7fe",

            paddingBottom: "1.5rem",
            paddingTop: "1.5rem",
            boxShadow: "1px 1px 2px 3px rgba(0, 0, 0, 0.04)",
            "&:hover": {
              borderColor: " #8394f8 ",
            },
            flexDirection: "column",
            alignItems: "center", // Optional: Align content in the center vertically
            margin: "1rem",
          }}
        >
          <ModeEditIcon fontSize="small"/>
          EDIT
        </Button>
        <Button
          variant="outlined"
          sx={{
            fontSize: "0.65rem",
            display: "flex",
            color: "#8394f8",
            backgroundColor: "#f3f7fe",
            borderColor: "#DCE2EB",
            borderRadius: "1.5rem",
            paddingBottom: "1.5rem",
            paddingTop: "1.5rem",
            boxShadow: "1px 1px 2px 3px rgba(0, 0, 0, 0.04)",
            "&:hover": {
              borderColor: " #8394f8 ",
            },
            flexDirection: "column",
            alignItems: "center", // Optional: Align content in the center vertically
            margin: "1rem",
          }}
        >
          <AddIcon fontSize="small"/>
          NEW
        </Button>
      </Stack>
     
      
    </div>
  );
}

export default VerticalNavbar;
