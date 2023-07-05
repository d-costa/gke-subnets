// React component with two input values

import { useState } from "react";
import { Grid, Typography } from "@mui/material";

function Body() {
  const [something] = useState("Hello World!!");

  return (
    <Grid container direction={"column"} className="main-paper">
      <Grid item xs={12}>
        <Typography>{something}</Typography>
      </Grid>
    </Grid>
  );
}

export default Body;
