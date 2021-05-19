import React from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import green from '@material-ui/core/colors/green';

const Alternative = ({ number }) => {

  const colorCheck = green.A400;

  return (
    <>
      <TextField
        id="outlined-multiline-static"
        label={`Alternativa ${number}`}
        name={`alternative${number}`}
        style={{ width: "100%" }}
        multiline
        rows={1}
        variant="outlined"
        required
      />
      <FormControlLabel
      style={{marginLeft: '5px'}}
        control={
          <Checkbox
            name={`correct${number}`}
          />
        }
        label="Alternativa correta"
      />
    </>
  );
};

export default Alternative;
