import { Application, Client, GatewayIntentBits } from 'discord.js';

const CreateClient = () => {

    const client = new Client({ intents: [GatewayIntentBits.Guilds,     ] });

    if (!process.env.TOKEN) {
        throw new Error('TOKEN is not defined in the environment variables.');
    }

    if (!client) {
        throw new Error('Failed to create Discord client.');
    }

    return client;
};

export { CreateClient };