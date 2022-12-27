import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

const About = () => {
  return (
    <div className="aboutUs">
      About Page
      <Grid container spacing={3}>
        <Grid item xs>
          <p>ITEM</p>
        </Grid>
        <Grid item xs={6}>
        <p>ITEM</p>
        </Grid>
        <Grid item xs>
        <p>ITEM</p>
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
