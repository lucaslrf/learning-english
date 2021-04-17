import React, { useState, useEffect } from "react";

const Challenge = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
    const data =  [
        {
          _id: "607ae52b1ec8816774b98dbc",
          index: 0,
          name: "do ipsum incididunt sit culpa",
          narrative:
            "ipsum voluptate id sunt nostrud anim amet sit laboris id eu adipisicing ipsum nisi aliqua irure ut magna quis ea Lorem consectetur sunt culpa do ullamco aliqua aliquip do veniam ipsum eiusmod quis in nisi ad laboris aliqua culpa anim proident consequat in occaecat nisi nisi eu occaecat ad dolor",
          quests: [
            {
              id: 0,
              name: "non",
              description: "dolor",
              position: 2258,
            },
            {
              id: 1,
              name: "laboris",
              description: "sint",
              position: 6221,
            },
            {
              id: 2,
              name: "ipsum",
              description: "dolor",
              position: 9665,
            },
          ],
        },
        {
          _id: "607ae52b7620fcd6bc9918e2",
          index: 1,
          name: "sit nostrud eu cupidatat non",
          narrative:
            "excepteur pariatur irure enim aliqua occaecat ut exercitation eiusmod in nisi pariatur non id culpa exercitation anim cupidatat laboris eiusmod pariatur excepteur incididunt laboris enim non labore in ex ex cupidatat culpa voluptate anim dolore anim labore enim ut dolor laboris reprehenderit elit excepteur et ea labore et eu minim",
          quests: [
            {
              id: 0,
              name: "cillum",
              description: "consequat",
              position: 2315,
            },
            {
              id: 1,
              name: "culpa",
              description: "culpa",
              position: 9637,
            },
            {
              id: 2,
              name: "et",
              description: "labore",
              position: 6500,
            },
          ],
        },
        {
          _id: "607ae52b808c2930abd9bd92",
          index: 2,
          name: "sint cillum cupidatat officia eu",
          narrative:
            "tempor sint nisi laborum cupidatat laborum magna laboris reprehenderit sint cillum elit officia esse nostrud voluptate cupidatat exercitation minim dolore occaecat tempor mollit nostrud est ullamco consectetur qui reprehenderit non quis nostrud occaecat ullamco irure adipisicing irure aliqua sunt aliqua dolore est et reprehenderit dolore occaecat laboris Lorem enim eiusmod",
          quests: [
            {
              id: 0,
              name: "dolore",
              description: "deserunt",
              position: 5966,
            },
            {
              id: 1,
              name: "deserunt",
              description: "eiusmod",
              position: 9822,
            },
            {
              id: 2,
              name: "ullamco",
              description: "sint",
              position: 9018,
            },
          ],
        },
        {
          _id: "607ae52b16401da9f4fd0bcc",
          index: 3,
          name: "amet enim fugiat velit nisi",
          narrative:
            "cillum reprehenderit eiusmod veniam anim ex tempor sint nostrud ad exercitation in culpa velit aliqua velit sunt deserunt qui Lorem ad nisi quis aute magna duis cillum officia adipisicing eiusmod pariatur nostrud nulla ad aute tempor velit id sit excepteur id ea excepteur veniam est consequat nisi veniam exercitation do",
          quests: [
            {
              id: 0,
              name: "occaecat",
              description: "mollit",
              position: 7780,
            },
            {
              id: 1,
              name: "est",
              description: "cillum",
              position: 737,
            },
            {
              id: 2,
              name: "reprehenderit",
              description: "incididunt",
              position: 8385,
            },
          ],
        },
        {
          _id: "607ae52bd3fb91b629e37d6c",
          index: 4,
          name: "occaecat qui exercitation laboris ut",
          narrative:
            "pariatur dolor sit dolore consequat officia voluptate aliqua reprehenderit dolor sunt voluptate ad laboris irure et Lorem sunt cillum nulla nostrud consectetur laborum ad est labore commodo fugiat proident ipsum commodo proident elit ut nisi aute irure aliqua commodo ullamco nisi reprehenderit nostrud dolore exercitation tempor pariatur laboris qui sunt",
          quests: [
            {
              id: 0,
              name: "nulla",
              description: "ea",
              position: 9421,
            },
            {
              id: 1,
              name: "officia",
              description: "velit",
              position: 3013,
            },
            {
              id: 2,
              name: "minim",
              description: "occaecat",
              position: 9778,
            },
          ],
        },
        {
          _id: "607ae52bc8c813f02d479e65",
          index: 5,
          name: "Lorem enim ipsum excepteur et",
          narrative:
            "laboris incididunt ex eiusmod eu amet cillum ex dolor irure commodo veniam dolore commodo commodo occaecat dolore qui nulla cupidatat nostrud incididunt consectetur culpa veniam enim duis quis esse sit et nulla duis Lorem laboris eiusmod ullamco irure sunt aliqua aute sunt est tempor amet ex ullamco elit id duis",
          quests: [
            {
              id: 0,
              name: "commodo",
              description: "deserunt",
              position: 224,
            },
            {
              id: 1,
              name: "occaecat",
              description: "cupidatat",
              position: 4337,
            },
            {
              id: 2,
              name: "consequat",
              description: "deserunt",
              position: 5154,
            },
          ],
        },
      ];

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
      {challenges.map((item, index) => (
        <div key={`${index}-${item._id}`}>
          <p>{item.names}</p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Challenge;
