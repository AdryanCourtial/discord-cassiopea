import { Ranks } from "../types/rank.type";

const ranks_choices = [
    {
        name: "Bronze",
        value: Ranks.BRONZE
    },
    {
        name: "Silver",
        value: Ranks.SILVER
    },
    {
        name: "Gold",
        value: Ranks.GOLD
    },
    {
        name: "Platinum",
        value: Ranks.PLATINUM
    },
    {
        name: "Emerald",
        value: Ranks.EMERALD
    },
    {
        name: "Diamond",
        value: Ranks.DIAMOND
    },
    {
        name: "Master",
        value: Ranks.MASTER
    },
    {
        name: "Grandmaster",
        value: Ranks.GRANDMASTER
    },
    {
        name: "Challenger",
        value: Ranks.CHALLENGER
    }
]

const json = [
  {
    name: "help",
    description: "Renvoie la liste de toutes les commandes disponibles",
    type: 1
  },
  {
    name: "rank",
    description: "Permet de définir le rank d'un joueur",
    type: 1,
    options: [
      {
        name: "solo_duo",
        description: "Permet de définir le rank d'un joueur en file solo/duo",
        type: 1,
        options: [
          {
            name: "rank",
            description: "Choisissez votre rang",
            type: 3,
            required: true,
            choices: ranks_choices
          }
        ]
      },
      {
        name: "flex",
        description: "Permet de définir le rank d'un joueur en file flexible",
        type: 1,
        options: [
          {
            name: "rank",
            description: "Choisissez votre rang",
            type: 3,
            required: true,
            choices: ranks_choices
          }
        ]
      }
    ]
  }
];

export const InstanceCommands = async () => {

    const url = `${process.env.DISCORD_API_URL}/commands`;

    const headers = new Headers();
    headers.append("Authorization", `Bot ${process.env.TOKEN}`);
    headers.append("Content-Type", "application/json");

    const request = new Request(url, {
        method: "PUT",
        body: JSON.stringify(json),
        headers
    });

    try {
        const response = await fetch(request);

        await fetch(new Request(url, {
            method: "GET",
            headers
        }));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error registering command:", error);
    }
};