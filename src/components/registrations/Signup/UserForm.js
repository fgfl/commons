/* eslint-disable default-case */
import React, { useState } from "react";
import Signup from "./Signup";
import Notifications from "./Notifications";
import Categories from "./Categories";
import axios from "axios";
import { Typography } from "@material-ui/core";
// import Confirm from "./Confirm";
// import Success from "./Success";

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

  const handleSubmit = event => {
    event.preventDefault();
    let user = {
      name: name,
      username: username,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
      email_notification: emailNotification,
      sms_notification: smsNotification,
      phone_number: phoneNumber
    };

    axios
      .post("http://localhost:3001/users", { user }, { withCredentials: true })
      .then(response => {
        if (response.data.status === "created") {
          props.handleLogin(response.data);
          redirect();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log("api errors:", error));
  };

  const redirect = () => {
    props.history.push("/");
  };

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
    // if (justFinishedStep === 1) {
    //   if (data.name) { setName(data.name); }

    // }

    // if (justFinishedstep === FINAL_STEP) {
    //   handleSubmit();
    // }
    setStep(step + 1);
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
        return <Categories nextStep={nextStep} prevStep={prevStep} />;
    }
  };

  return <div>{renderSwitch(step)}</div>;
};

export default UserForm;
