import lastUpdate from "../commands/lastUpdate";
import ping from "../commands/ping";
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
    },
    ping.data.toJSON(),
    lastUpdate.data.toJSON()
];

export const InstanceCommands = async () => {
    const url = `${process.env.DISCORD_API_URL}/commands`;

    console.log(
        "📦 Commandes à enregistrer :",
        json.map(command => command.name)
    );

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            Authorization: `Bot ${process.env.TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    });

    const result = await response.json();

    if (!response.ok) {
        console.error("❌ Erreur API Discord :", result);
        throw new Error(`HTTP ${response.status}`);
    }

    console.log(
        "✅ Commandes confirmées par Discord :",
        Array.isArray(result)
            ? result.map((command: any) => command.name)
            : result
    );

    return result;
};