import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import DoneItem from "@material-ui/icons/Done";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: theme.spacing(0.5)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

const ChipsArray = props => {
  const classes = useStyles();
  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
    { key: 5, label: "Vue.js" },
    { key: 6, label: "Vue.js" },
    { key: 7, label: "Vue.js" },
    { key: 8, label: "Vue.js" },
    { key: 9, label: "Vue.js" },
    { key: 10, label: "Vue.js" }
  ]);

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        console.log(props);
        let color = props.clicked[data.label] ? "blue" : "grey";

        return (
          <Chip
            key={data.key}
            icon={<DoneItem />}
            label={data.label}
            className={classes.chip}
            clickable
            onClick={() => {
              props.setThisOneClicked(data.label);
            }}
            style={{ background: color }}
          />
        );
      })}
    </Paper>
  );
};

export default ChipsArray;
