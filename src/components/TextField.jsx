import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export default function LayoutTextFields({ titulo, texto, tipo }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TextField
        id="outlined-full-width"
        label={titulo}
        style={{ margin: 8 }}
        placeholder={texto}
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        type={tipo ? tipo : "text"}
      ></TextField>
    </div>
  );
}
