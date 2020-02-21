import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      width: "100%",
      textAlign: "left",
      marginBottom: "16px",
      marginTop: "16px"
    }
  },
  text: {
    margin: "0 auto"
  }
}));

export default function CategoryDropdown(props) {
  const classes = useStyles();
  const [category, setCategory] = React.useState("All Categories");

  const categories = [];

  props.categories.forEach(c => {
    categories.push({
      value: c.name,
      label: c.name
    });
  });

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
