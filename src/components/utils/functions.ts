export const dateToday = () => {
  const today = new Date();
  return today.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  } );
};