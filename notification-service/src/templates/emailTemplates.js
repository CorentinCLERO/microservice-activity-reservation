module.exports = {
  reservationConfirmation: (data) => `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Réservation Confirmée</h2>
      <p>Votre réservation pour l'activité a été confirmée.</p>
      <p>Détails de la réservation :</p>
      <ul>
        <li>Activité : ${data.activityName}</li>
        <li>Date : ${new Date(data.date).toLocaleDateString()}</li>
        <li>ID de réservation : ${data.reservationId}</li>
      </ul>
      <p>Merci de votre confiance !</p>
    </div>
  `,

  reservationCancellation: (data) => `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Réservation Annulée</h2>
      <p>Votre réservation a été annulée.</p>
      <p>ID de réservation : ${data.reservationId}</p>
      <p>Si vous n'avez pas demandé cette annulation, veuillez nous contacter.</p>
    </div>
  `
};