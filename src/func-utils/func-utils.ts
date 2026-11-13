import { Client } from "discord.js";
import { getProchaineSemaine } from "../utils";

export const EnvoieSondageDispos = async (salon_id: string, client: Client) => {
    try {
        const salon = await client.channels.fetch(salon_id);

        const { lundi, dimanche } = getProchaineSemaine()

        if (!salon || !salon.isTextBased() || !salon.isSendable()) return;

        await salon.send({
            poll: {
                question: {
                    text: `Disponibilité de la semaine du : ${lundi} au ${dimanche}`
                    },
                answers: [
                    { text: 'Lundi' },
                    { text: 'Mardi' },
                    { text: 'Mercredi' },
                    { text: 'Jeudi' },
                    { text: 'Vendredi' },
                    { text: 'Samedi' },
                    { text: 'Dimanche' },
                ],
                duration: 72,
                allowMultiselect: true
            }
        });

        console.log('✅ Sondage envoyé !');
    } catch (error) {
        console.error('Erreur sondage :', error);
    }
}