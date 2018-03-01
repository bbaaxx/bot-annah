import askLuis from './luis.js';

export const handleNlpError = err => console.error(err);

function evaluateResponse(response){
  const { query, topScoringIntent, entities  } = response;
  const { intent, score } = topScoringIntent || {};

  return {
    type: 'not-sure',
    intent: ((score && score < 0.7) || intent === 'None')
      ? 'NotSure'
      : intent,
    entities,
    query
  };
};

/**
 *  :String -> Promise<{
 *    intent: String,
 *    entities: Array[any],
 *    query: String,
 *  }>
 *
 */
export default content =>
  askLuis(content)
    .then(evaluateResponse)
    .catch(handleNlpError);