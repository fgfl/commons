import React, { useState, Fragment } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

export default function FindMyMp({ user }) {
  const [postalCode, setPostalCode] = useState(user.postal_code || '');
  const [mpName, setMpName] = useState('');
  const [mpParty, setMpParty] = useState('');
  const [mpPhoto, setMpPhoto] = useState('');
  const [mpRiding, setMpRiding] = useState('');
  const [mpWebsite, setMpWebsite] = useState('');
  const [mpEmail, setMpEmail] = useState('');
  const [mpOfficeOttawa, setMpOfficeOttawa] = useState('');
  const [mpOfficeLocal, setMpOfficeLocal] = useState('');

  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'blue',
      width: '100%',
      height: '200px',
      textAlign: 'center',
      color: 'white',
    },
    title: {
      padding: '24px',
    },
    mymp: {
      textAlign: 'left',
    },
    divider: {
      margin: '0.5em',
    },
  }));

  const classes = useStyles();

  const handleMp = () => {
    return (
      <div>
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            <Grid item xs={8} className={classes.mymp}>
              <Typography variant="h4">
                <strong>Your Representative</strong>
              </Typography>
              <Typography>
                <strong>Name:</strong> {mpName}
              </Typography>
              <Typography>
                <strong>Party: </strong>
                {mpParty}
              </Typography>
              <Typography>
                <strong>Riding: </strong>
                {mpRiding}
              </Typography>
              <Typography>
                <strong>Website: </strong>
                <a href={mpWebsite} target="_blank">
                  {mpWebsite}
                </a>
              </Typography>
              <Typography>
                <strong>Email: </strong>
                {mpEmail}
              </Typography>
              <Typography variant="h5">
                <strong>Federal Office: </strong>
                <Typography>
                  <strong>Address: </strong>
                  {mpOfficeLocal.postal}
                </Typography>
                <Typography>
                  <strong>Telephone: </strong>
                  {mpOfficeLocal.tel}
                </Typography>
              </Typography>
              <Typography variant="h5">
                <strong>Local Office: </strong>
                <Typography>
                  <strong>Address: </strong>
                  {mpOfficeOttawa.postal}
                </Typography>
                <Typography>
                  <strong>Telephone: </strong>
                  {mpOfficeOttawa.tel}
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <img alt="Your MP" src={mpPhoto} />
            </Grid>
            <Grid container>
              <Button variant="contained">
                <Link href={`mailto:${mpEmail.toLowerCase()}`}>
                  Email My MP
                </Link>
              </Button>
              <Button variant="contained">
                <Link href={`tel:+${mpOfficeOttawa.tel}`}>Call My MP</Link>
              </Button>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };

  const handleMpSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://represent.opennorth.ca/postcodes/${postalCode}?sets=federal-electoral-districts`
      )
      .then((response) => {
        if (response.data) {
          setMpName(response.data.representatives_centroid[0].name);
          setMpParty(response.data.representatives_centroid[0].party_name);
          setMpPhoto(response.data.representatives_centroid[0].photo_url);
          setMpRiding(response.data.representatives_centroid[0].district_name);
          setMpWebsite(response.data.representatives_centroid[0].url);
          setMpEmail(response.data.representatives_centroid[0].email);
          setMpOfficeLocal(
            response.data.representatives_centroid[0].offices[0]
          );
          setMpOfficeOttawa(
            response.data.representatives_centroid[0].offices[1]
          );
          console.log(response.data);
        } else {
          setErrors(response.data.errors);
        }
      })
      .then(setLoading(false))
      .catch((error) => console.log('api errors:', error));
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
        <Divider className={classes.divider}></Divider>
        <form>
          <TextField
            id="outlined-basic"
            name="postalcode"
            label="Postal Code"
            variant="outlined"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleMpSubmit}>
            Submit
          </Button>
        </form>
      </div>
    );
  };
  return <div>{!mpName ? findForm() : handleMp()}</div>;
}
