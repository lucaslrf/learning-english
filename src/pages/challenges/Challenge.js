import React, { useState, useEffect } from "react";
import Card  from "../../components/Card"
import {Title} from "../challenges/styled"

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
    const data =  [
      {
        "_id": "607f7fb69c0499e76082d660",
        "index": 0,
        "name": "est sunt qui velit voluptate",
        "description": "labore do dolor nostrud enim consectetur consectetur reprehenderit consectetur ad reprehenderit reprehenderit ea pariatur ad minim qui laborum qui laboris",
        "narrative": "ad tempor ex dolor et nisi qui excepteur qui reprehenderit sit anim sit duis non laborum dolor anim do Lorem consequat eiusmod laborum voluptate ea ut excepteur sint nostrud consectetur sint irure sint sunt ad eu cupidatat in aliqua qui magna exercitation eiusmod do cillum occaecat voluptate esse consequat sunt",
        "status": "FINISHED",
        "quests": [
          {
            "id": 0,
            "name": "minim",
            "description": "laboris",
            "position": 3514
          },
          {
            "id": 1,
            "name": "pariatur",
            "description": "eiusmod",
            "position": 3234
          },
          {
            "id": 2,
            "name": "duis",
            "description": "deserunt",
            "position": 7615
          }
        ]
      },
      {
        "_id": "607f7fb63491278d301f931f",
        "index": 1,
        "name": "quis cillum nostrud non ullamco",
        "description": "duis elit pariatur consequat elit esse ullamco mollit laboris ad duis non officia voluptate ut do consequat amet nulla culpa",
        "narrative": "ex elit nostrud esse officia enim sit dolor enim adipisicing eu duis ex Lorem ullamco qui in reprehenderit ad ipsum dolor sint fugiat commodo nisi mollit dolore nostrud labore magna nisi et exercitation culpa magna nulla ad magna officia qui cillum sunt mollit in adipisicing aliquip do pariatur nulla elit",
        "status": "STARTED",
        "quests": [
          {
            "id": 0,
            "name": "voluptate",
            "description": "deserunt",
            "position": 8082
          },
          {
            "id": 1,
            "name": "nostrud",
            "description": "aute",
            "position": 3962
          },
          {
            "id": 2,
            "name": "aute",
            "description": "ea",
            "position": 6539
          }
        ]
      },
      {
        "_id": "607f7fb68992ae3f5a36fe38",
        "index": 2,
        "name": "laboris sit laboris officia est",
        "description": "cillum ullamco Lorem consectetur qui aute aute aliqua aliqua ullamco laborum ad veniam in velit esse laboris duis minim pariatur",
        "narrative": "Lorem labore est consequat ullamco pariatur tempor laborum magna deserunt ullamco cupidatat qui occaecat adipisicing id do laborum minim amet nisi ullamco laboris exercitation sint est exercitation magna laborum occaecat quis aliqua proident ea do ex nulla ad et adipisicing excepteur deserunt anim consectetur sunt non in enim exercitation reprehenderit",
        "status": "STARTED",
        "quests": [
          {
            "id": 0,
            "name": "veniam",
            "description": "nulla",
            "position": 9612
          },
          {
            "id": 1,
            "name": "ut",
            "description": "incididunt",
            "position": 2416
          },
          {
            "id": 2,
            "name": "sit",
            "description": "mollit",
            "position": 5902
          }
        ]
      },
      {
        "_id": "607f7fb6e2cadaf74dc8b9b3",
        "index": 3,
        "name": "culpa amet excepteur dolor culpa",
        "description": "aliquip consequat anim aliquip mollit aliqua aliquip est nostrud irure sit ullamco consectetur amet esse quis cillum ex nostrud enim",
        "narrative": "esse cillum aute anim nulla esse veniam qui ipsum nulla consequat id reprehenderit exercitation ex cillum ipsum est eu Lorem eiusmod adipisicing quis voluptate commodo elit ullamco dolore consequat deserunt esse amet tempor occaecat do dolor anim duis nulla officia consequat consectetur eiusmod magna nostrud deserunt ipsum exercitation sint et",
        "status": "STARTED",
        "quests": [
          {
            "id": 0,
            "name": "veniam",
            "description": "laboris",
            "position": 5963
          },
          {
            "id": 1,
            "name": "aliquip",
            "description": "deserunt",
            "position": 2609
          },
          {
            "id": 2,
            "name": "excepteur",
            "description": "id",
            "position": 6746
          }
        ]
      },
      {
        "_id": "607f7fb6a5c3872c133d191b",
        "index": 4,
        "name": "culpa do enim proident sit",
        "description": "esse ea dolore laborum proident cillum elit irure occaecat nostrud est commodo eu id nisi dolore ex duis exercitation aliquip",
        "narrative": "voluptate proident deserunt in ex do esse ipsum sint sit consectetur labore sint laborum eiusmod enim nostrud esse pariatur ex velit qui tempor officia adipisicing ut cillum velit aute do commodo commodo quis aute ex excepteur adipisicing laborum cupidatat ad labore id occaecat ipsum excepteur voluptate laborum ullamco enim eiusmod",
        "status": "FINISHED",
        "quests": [
          {
            "id": 0,
            "name": "ad",
            "description": "deserunt",
            "position": 3696
          },
          {
            "id": 1,
            "name": "culpa",
            "description": "anim",
            "position": 5828
          },
          {
            "id": 2,
            "name": "elit",
            "description": "occaecat",
            "position": 2789
          }
        ]
      },
      {
        "_id": "607f7fb6d68235f01851f8e6",
        "index": 5,
        "name": "amet deserunt aute qui occaecat",
        "description": "consectetur ut aute occaecat nulla nulla ipsum id occaecat esse quis id culpa non culpa magna amet incididunt fugiat deserunt",
        "narrative": "exercitation non excepteur velit nulla non tempor occaecat amet incididunt laboris laboris fugiat sit incididunt id minim laborum adipisicing et magna Lorem quis sit veniam esse sint mollit esse pariatur dolore proident quis minim exercitation tempor occaecat veniam incididunt incididunt esse enim duis ea sunt officia anim id labore labore",
        "status": "FINISHED",
        "quests": [
          {
            "id": 0,
            "name": "elit",
            "description": "proident",
            "position": 7291
          },
          {
            "id": 1,
            "name": "ut",
            "description": "fugiat",
            "position": 4749
          },
          {
            "id": 2,
            "name": "ut",
            "description": "nisi",
            "position": 3320
          }
        ]
      }
    ]

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
      <Title>Desafios</Title>
      {challenges.map((item, index) => (
        <div key={`${index}-${item._id}`}>
          <Card name={item.name} description={item.description} status={item.status}></Card>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Challenge;
