let indexedActivities = [];

function preprocess(activities) {
  return activities.map((activity) => ({
    ...activity,
    titleLower: activity.title.toLowerCase(),
    descriptionLower: activity.description.toLowerCase(),
  }));
}

function search(data, term, maxResults) {
  if (!term.trim()) {
    return {
      results: data.slice(0, maxResults),
      totalCount: data.length,
    };
  }

  const lower = term.toLowerCase();
  const results = [];
  let totalCount = 0;

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const match =
      item.titleLower.includes(lower) || item.descriptionLower.includes(lower);

    if (match) {
      totalCount++;
      if (results.length < maxResults) {
        results.push(item);
      }
    }
  }

  return { results, totalCount };
}

self.onmessage = function (event) {
  const message = event.data;

  if (message.type === 'INIT') {
    indexedActivities = preprocess(message.activities);
    return;
  }

  if (message.type === 'SEARCH') {
    const term = message.term;
    const id = message.id;
    const maxResults = message.maxResults ?? 100;

    const result = search(indexedActivities, term, maxResults);

    self.postMessage({
      type: 'RESULT',
      results: result.results,
      totalCount: result.totalCount,
      id,
    });
  }
};
