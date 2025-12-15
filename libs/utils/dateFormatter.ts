const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString));
};

const formatDateTime = (isoString: string) => {
  const dateObj = new Date(isoString);

  if (isNaN(dateObj.getTime())) {
    throw new Error('Invalid date string');
  }

  const date = dateObj.toISOString().split('T')[0];

  const time = dateObj.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date, time };
};

export { formatDate, formatDateTime };
