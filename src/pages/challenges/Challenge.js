import React, { useState, useEffect } from "react";
import Card  from "../../components/Card"
import {Title} from "../challenges/styled"
import { dataRPG } from "../../services/dados";

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
    const data =  dataRPG

      setChallenges(data);
      setLoading(false);
    };

    loadChallenges();
  }, []);

  if (loading) {
    return <></>;
  }

  console.log("challenges: ", challenges);

  return (
    <React.Fragment>
      <Title>Narrativas</Title>
      {challenges.map((item, index) => (
        <div key={`${index}-${item._id}`}>
          <Card item={item}></Card>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Challenge;
