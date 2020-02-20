import React, { useState } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function FindMyMp() {
  const [postalCode, setPostalCode] = useState("");
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
    let user = {
      postal_code: postalCode
    };

    axios
      .get("http://localhost:3001/login", { user }, { withCredentials: true })
      .then(response => {
        if (response.data) {
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
        Look up your representative in the House of Commmons
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          id="postalCode"
          name="postalCode"
          label="Postal Code"
          variant="outlined"
          value={postalCode}
          onChange={e => setPostalCode(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
