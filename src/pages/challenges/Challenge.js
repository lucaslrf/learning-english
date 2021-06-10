import React, { useState, useEffect } from "react";
import Card from "../../components/Card"
import { Title } from "../challenges/styled"
import { dataRPG } from "../../services/dados";
import api from "../../services/api";

const Challenge = () => {
  const [challenges, setChallenges] = useState(dataRPG);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [narratives, setNarratives] = useState(null);

  useEffect(() => {
    const loadNarratives = async () => {
      setLoading(true);

      try {
        const { data } = await api.get(
          `/get/narratives/${itemsPerPage}`
        );

        console.log('data challenges: ', data.narratives)

        setNarratives(data.narratives.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadNarratives();
  }, []);

  if (loading || !narratives) {
    return <></>;
  }

  return (
    <React.Fragment>
      <Title>Narrativas</Title>
      {narratives.map((item, index) => (
        <div key={`${index}-${item._id}`}>
          <Card item={item}></Card>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Challenge;
