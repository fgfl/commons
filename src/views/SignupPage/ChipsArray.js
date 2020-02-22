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
  const categories = props.categories;

  console.log(categories);

  const classes = useStyles();
  const [chipData, setChipData] = useState(categories);

  return (
    <Paper className={classes.root}>
      {chipData.map(data => {
        console.log(props);
        let color = props.clicked[data.id] ? "blue" : "grey";

        return (
          <Chip
            key={data.id}
            icon={<DoneItem />}
            label={data.name}
            className={classes.chip}
            clickable
            onClick={() => {
              props.setThisOneClicked(data.id);
            }}
            style={{ background: color }}
          />
        );
      })}
    </Paper>
  );
};

export default ChipsArray;
