export const transformData = (field, data, fieldMap) => {
  if (!field || !data?.length) return { labels: [], datasets: [] };

  const counts = {};
  const nestedField = fieldMap?.[field];

  data.forEach(item => {
    const value = item[field];
    
    if (Array.isArray(value)) {
      value.forEach(el => {
        const key = nestedField ? el[nestedField] : el;
        counts[key] = (counts[key] || 0) + 1;
      });
    } else if (typeof value === 'object') {
      const key = nestedField ? value[nestedField] : JSON.stringify(value);
      counts[key] = (counts[key] || 0) + 1;
    } else {
      counts[value] = (counts[value] || 0) + 1;
    }
  });

  return {
    labels: Object.keys(counts),
    datasets: [{
      label: `Distribution by ${field}`,
      data: Object.values(counts),
      backgroundColor: [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
        '#9966FF', '#FF9F40', '#FF8A80', '#A1887F'
      ]
    }]
  };
};