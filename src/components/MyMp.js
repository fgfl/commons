import React, { useState, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function MyMp(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: "grey",
      width: "100%",
      height: "200px",
      textAlign: "center",
      color: "white"
    },
    title: {
      padding: "24px"
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>{props.mpFirstName}</Typography>
    </div>
  );
}
