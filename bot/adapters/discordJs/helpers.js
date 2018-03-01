// Esto lo usamos para evitar interpretar mensajes propios
export const notOwnMessage = client => message => Boolean(message.author.id !== client.user.id);