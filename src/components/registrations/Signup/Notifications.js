import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

const Notifications = props => {
  let data = {
    smsNotification: false,
    emailNotification: false,
    phoneNumber: ""
  };

  const proceed = e => {
    e.preventDefault();
    props.nextStep(2, data);
  };

  const back = e => {
    e.preventDefault();
    props.prevStep();
  };

  const handleEmailCheck = () => {
    if (data.smsNotification === false) {
      data.smsNotification = true;
    }
  };
  const handleSmsCheck = () => {
    if (data.emailNotification === false) {
      data.emailNotification = true;
    }
  };

  const useStyles = makeStyles(theme => ({
    paper: {
      zIndex: 1000,
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: 5,
      padding: theme.spacing(2),
      textAlign: "center"
    },
    avatar: {
      zIndex: 1000,
      marginBottom: theme.spacing(2),
      width: "120px",
      height: "120px",
      backgroundColor: "#29c0a8"
    },
    form: {
      zIndex: 1000,
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      textAlign: "center"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: "#29c0a8"
    },
    accountCirle: {
      width: "100px",
      height: "100px",
      color: "white"
    },
    backDrop: {
      position: "absolute",
      height: "75%",
      width: "100%",
      bottom: 0,
      left: 0,
      zIndex: 0
    }
  }));
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.root} variant="outlined">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon className={classes.accountCirle} />
          </Avatar>
          <Typography variant="h4">Get updates!</Typography>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">
              How would you like to receive notifications?
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Receive notifications by email"
                onChange={handleEmailCheck}
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Receive notifications by SMS message"
                onChange={handleSmsCheck}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="phoneNumber"
                autoFocus
                value={props.phoneNumber}
                onChange={e => (data.phoneNumber = e.target.value)}
              />
            </FormGroup>
          </FormControl>
        </div>
        <Button color="secondary" variant="contained" onClick={back}>
          Back
        </Button>

        <Button color="primary" variant="contained" onClick={proceed}>
          Continue
        </Button>
      </Card>
    </Container>
  );
};

export default Notifications;
