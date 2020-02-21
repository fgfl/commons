import React, { useState, Fragment } from "react";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function FindMyMp() {
  const [postalCode, setPostalCode] = useState("");
  const [mpName, setMpName] = useState("");
  const [mpParty, setMpParty] = useState("");
  const [mpPhoto, setMpPhoto] = useState("");
  const [mpRiding, setMpRiding] = useState("");
  const [mpWebsite, setMpWebsite] = useState("");
  const [mpEmail, setMpEmail] = useState("");
  const [mpOfficeOttawa, setMpOfficeOttawa] = useState("");
  const [mpOfficeLocal, setMpOfficeLocal] = useState("");
  const [mpPhoneOttawa, setMpPhoneOttawa] = useState("");
  const [mpPhoneLocal, setMpPhoneLocal] = useState("");

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleMp = () => {
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6}>
            <Typography>{mpName}</Typography>
            <Typography>{mpParty}</Typography>
          </Grid>
          <Grid item xs={6}>
            <img alt="Your MP" src={mpPhoto} />
          </Grid>
        </Grid>
      </div>
    );
  };

  const handleSubmit = event => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://represent.opennorth.ca/postcodes/${postalCode}?sets=federal-electoral-districts`
      )
      .then(response => {
        if (response.data) {
          setMpName(response.data.representatives_centroid[0].name);
          setMpParty(response.data.representatives_centroid[0].party_name);
          setMpPhoto(response.data.representatives_centroid[0].photo_url);
          console.log(response.data);
        } else {
          setErrors(response.data.errors);
        }
      })
      .then(setLoading(false))
      .catch(error => console.log("api errors:", error));
  };

  const findForm = () => {
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
      </div>
    );
  };
  return <div>{!mpName ? findForm() : handleMp()}</div>;
}
