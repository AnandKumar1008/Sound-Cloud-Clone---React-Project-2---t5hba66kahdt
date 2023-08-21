import * as React from "react";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import LoopIcon from "@mui/icons-material/Loop";
import MailIcon from "@mui/icons-material/Mail";

const BadgeVisibility = () => {
  const [count, setCount] = React.useState(1);
  const [invisible, setInvisible] = React.useState(false);

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  return (
    <Box
      sx={{
        color: "action.active",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          marginBottom: 2,
        },
        "& .MuiBadge-root": {
          marginRight: 4,
        },
      }}
    >
      <div>
        <Badge
          color="secondary"
          badgeContent={count}
          sx={{
            backgroundColor: "white",
            color: "orangered",
            padding: "0",
            margin: "0",
            top: "0.5rem",
            left: "0.8rem",

            "& .MuiBadge-badge": {
              backgroundColor: "white",
              color: "orangered",
            },
          }}
        >
          <LoopIcon />
        </Badge>
      </div>
    </Box>
  );
};
export default BadgeVisibility;
