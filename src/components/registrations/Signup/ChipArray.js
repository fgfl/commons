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

export default function ChipsArray() {
  const classes = useStyles();
  const [chipData, setChipData] = React.useState([
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

  const [clicked, setClicked] = useState({});
  console.log("clicked", clicked);

  const setThisOneClicked = key => {
    // if (clicked === false) {
    setClicked(prev => ({ ...prev, [key]: !prev[key] }));
    // }
  };

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        let color = clicked[data.key] ? "blue" : "grey";

        return (
          <Chip
            key={data.key}
            icon={<DoneItem />}
            label={data.label}
            className={classes.chip}
            clickable
            onClick={setThisOneClicked.bind(null, data.key)}
            style={{ background: color }}
          />
        );
      })}
    </Paper>
  );
}
