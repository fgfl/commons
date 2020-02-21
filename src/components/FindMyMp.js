import React, { useState, Fragment } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MyMp from "./MyMp";
import { makeStyles } from "@material-ui/core/styles";

export default function FindMyMp() {
  const [postalCode, setPostalCode] = useState("");
  const [mpFirstName, setMpFirstName] = useState("");
  const [errors, setErrors] = useState("");

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: "blue",
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

  const handleSubmit = event => {
    event.preventDefault();

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://represent.opennorth.ca/postcodes/${postalCode}?sets=federal-electoral-districts`
      )
      .then(response => {
        if (response.data) {
          setMpFirstName(response.data.representatives_centroid[0].first_name);
          console.log(response.data);
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="h4">
        Find Your Member of Parliament
      </Typography>
      <Typography variant="h5">
        Look up your representative in the House of Commons
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          name="postalcode"
          label="Postal Code"
          variant="outlined"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      <MyMp mpFirstName={mpFirstName} />
    </div>
  );
}
