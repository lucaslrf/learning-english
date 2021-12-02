import React from "react";
// import {HeaderActions} from "../contentGame/styled"
import Button from '@material-ui/core/Button';
import api from "../services/api";
import {
  useHistory,
  useLocation,
  useParams
} from "react-router-dom";


function ActionsHeader({quest}) {
  let history = useHistory();

  async function pauseQuest(){
    console.log('pauseQuest');
    let result = null;
    
    result = await api.post(
      `save/narrative/${quest.id}/${quest.narrative_id}`,
    );

    console.log('DATA CREATE Narrative', result)
  
    if(!result || result.data.error){
      return false;
    }

    history.location.pathname = "/";
    history.replace("student/")
  }

  return (
    <React.Fragment>
        <div>
            <Button onClick={() => pauseQuest()}>Pausar</Button>
        </div>
    </React.Fragment>
  );
};

export default ActionsHeader;
