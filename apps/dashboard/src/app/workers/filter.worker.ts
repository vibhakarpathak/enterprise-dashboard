// apps/dashboard/src/workers/filter.worker.ts

/**
 * Base interface for the activity data
 */
export interface Activity {
  title: string;
  description: string;
  [key: string]: unknown; // Replaced 'any' with 'unknown' for better type safety
}

/**
 * Extended interface for pre-calculated lowercase values to boost search performance
 */
interface ProcessedActivity extends Activity {
  titleLower: string;
  descriptionLower: string;
}

/**
 * Incoming message types from the Main Thread
 */
type WorkerMessage =
  | { type: 'INIT'; activities: Activity[] }
  | { type: 'SEARCH'; term: string; id: string | number; maxResults?: number };

/**
 * Outgoing message types to the Main Thread
 */
interface SearchResult {
  type: 'RESULT';
  results: ProcessedActivity[];
  totalCount: number;
  id?: string | number;
}

// Internal State
let indexedActivities: ProcessedActivity[] = [];

/**
 * Pre-processes data once to avoid calling .toLowerCase() repeatedly during search
 */
const preprocess = (activities: Activity[]): ProcessedActivity[] => {
  return activities.map((activity) => ({
    ...activity,
    titleLower: activity.title.toLowerCase(),
    descriptionLower: activity.description.toLowerCase(),
  }));
};

/**
 * Core search logic
 */
const search = (
  data: ProcessedActivity[],
  term: string,
  maxResults: number,
) => {
  if (!term.trim()) {
    return {
      results: data.slice(0, maxResults),
      totalCount: data.length,
    };
  }

  const lower = term.toLowerCase();
  const results: ProcessedActivity[] = [];
  let totalCount = 0;

  // for...of loop avoids the "item is possibly undefined" index error
  for (const item of data) {
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
};

/**
 * Worker Event Listener
 */
self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const message = event.data;

  if (message.type === 'INIT') {
    indexedActivities = preprocess(message.activities);
  } else if (message.type === 'SEARCH') {
    const { term, id, maxResults = 100 } = message;

    const result = search(indexedActivities, term, maxResults);

    const response: SearchResult = {
      type: 'RESULT',
      results: result.results,
      totalCount: result.totalCount,
      id,
    };

    self.postMessage(response);
  }
};

// Export empty object to treat this file as a module
export {};
