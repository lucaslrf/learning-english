import React, { useState, useEffect } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import {
  BrowserRouter as Router,
  Switch,
  useRouteMatch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  Button,
  TextField,
  InputLabel,
  Input,
  FormHelperText,
  Checkbox,
  Typography,
} from "@material-ui/core";
import ActionsHeader from "../../components/ActionsHeader";
import { ContentAlternative, Content } from "../../components/styled";
import { makeStyles } from '@material-ui/core/styles';


const AlternativesQuests = ({ alternativesQuest, handleChange, valueAlternativeRadio }) => {
  let { path, url } = useRouteMatch();
  const [alternatives, setAlternatives] = useState(alternativesQuest);

  console.log("pathCurrent alternative quest: ", alternatives, valueAlternativeRadio);

  useEffect(() => {
    setAlternatives(alternativesQuest);
  }, [alternativesQuest])

  return (
    <React.Fragment>
      
        <ContentAlternative>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="alternatives"
              name="alternatives"
              value={`${valueAlternativeRadio}`}
              onChange={(e) => handleChange(e)}
            >
              {alternatives.map((alternative, index) => (
                <FormControlLabel
                  key={`${alternative.id}-${index}`}
                  value={`${alternative.id}`}
                  control={<Radio />}
                  label={alternative.description}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </ContentAlternative>
      
    </React.Fragment>
  );
};

export default AlternativesQuests;
