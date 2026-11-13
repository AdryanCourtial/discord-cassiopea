export const getProchaineSemaine = () => {
    const aujourdHui = new Date();

    const jour = aujourdHui.getDay();
    const joursAvantLundi = (8 - jour) % 7 || 7;

    const lundi = new Date(aujourdHui);
    lundi.setDate(aujourdHui.getDate() + joursAvantLundi);

    const dimanche = new Date(lundi);
    dimanche.setDate(lundi.getDate() + 7);

    const formatDate = (date: Date) =>
        date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

    return {
        lundi: formatDate(lundi),
        dimanche: formatDate(dimanche)
    };
}