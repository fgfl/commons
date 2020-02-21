/* eslint-disable default-case */
import React, { useState } from "react";
import Signup from "./Signup";
import Notifications from "./Notifications";
import Categories from "./Categories";
import Confirmation from "./Confirmation";
import Success from "./Success";
import axios from "axios";
import { Typography } from "@material-ui/core";

const UserForm = props => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState("");
  const [emailNotification, setEmailNotification] = useState(false);
  const [smsNotification, setSmsNotification] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [clicked, setClicked] = useState({});
  console.log("clicked", clicked);

  const setThisOneClicked = key => {
    setClicked(prev => {
      let state = { ...prev };
      if (state[key]) {
        delete state[key];
      } else {
        state[key] = true;
      }
      return state;
    });
  };

  const handleSubmit = () => {
    // event.preventDefault();
    let user = {
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      email_notification: emailNotification,
      sms_notification: smsNotification,
      phone_number: phoneNumber,
      categories: Object.keys(clicked)
    };
    console.log(user);

    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          props.handleLogin(response.data);
          setStep(step + 1);
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  // const redirect = () => {
  //   props.history.push("/");
  // };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map(error => {
            return (
              <li key={error}>
                <Typography variant="body1">{error}</Typography>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // Proceed to next step
  const nextStep = (justFinishedStep, data) => {
    if (justFinishedStep === 1) {
      if (data.name) {
        setName(data.name);
      }
      if (data.username) {
        setUsername(data.username);
      }
      if (data.email) {
        setEmail(data.email);
      }
      if (data.password) {
        setPassword(data.password);
      }
      if (data.password_confirmation) {
        setPasswordConfirmation(data.password_confirmation);
      }
      setStep(step + 1);
    }
    if (justFinishedStep === 2) {
      if (data.smsNotification) {
        setSmsNotification(data.smsNotification);
      }
      if (data.emailNotification) {
        setEmailNotification(data.emailNotification);
      }
      if (data.phoneNumber) {
        setPhoneNumber(data.phoneNumber);
      }
      setStep(step + 1);
    }
    if (justFinishedStep === 3) {
      setStep(step + 1);
    }
    if (justFinishedStep === 4) {
      handleSubmit();
    }
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };

  const renderSwitch = param => {
    switch (param) {
      case 1:
        return <Signup nextStep={nextStep} />;
      case 2:
        return <Notifications nextStep={nextStep} prevStep={prevStep} />;
      // eslint-disable-next-line no-duplicate-case
      case 3:
        return (
          <Categories
            clicked={clicked}
            setThisOneClicked={setThisOneClicked}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Confirmation
            errors={errors}
            handleErrors={handleErrors}
            prevStep={prevStep}
            nextStep={nextStep}
            details={{
              name: name,
              username: username,
              email: email,
              password: password,
              password_confirmation: passwordConfirmation,
              email_notification: emailNotification,
              sms_notification: smsNotification,
              phone_number: phoneNumber
            }}
          />
        );
      case 5:
        return <Success />;
    }
  };

  return <div>{renderSwitch(step)}</div>;
};

export default UserForm;
