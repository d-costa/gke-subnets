import {
  Grid,
} from "@mui/material";
import Form from "./Form";
import MoreInfo from "./MoreInfo";

function Body() {

  return (
      <Grid container spacing={1} className="main-paper">
        <Form/>
        <MoreInfo/>
      </Grid>
  );
}

export default Body;
