import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const categories = [
  {
    value: "",
    label: ""
  },
  {
    value: "Transport",
    label: "Transport"
  },
  {
    value: "Indigenous Rights",
    label: "Indigenous Rights"
  },
  {
    value: "Agriculture",
    label: "Agriculture"
  },
  {
    value: "Finance",
    label: "Finance"
  },
  {
    value: "Transport",
    label: "Transport"
  },
  {
    value: "Indigenous Rights",
    label: "Indigenous Rights"
  },
  {
    value: "Agriculture",
    label: "Agriculture"
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "90%",
      textAlign: "left"
    }
  }
}));

export default function MultilineTextFields() {
  const classes = useStyles();
  const [category, setCategory] = React.useState("");

  const handleChange = event => {
    setCategory(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="standard-select-currency"
          select
          label="Select"
          value={category}
          onChange={handleChange}
          helperText="Please select a category"
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </form>
  );
}
