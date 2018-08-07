import NodeCache from 'node-cache';

// this will be mutated
const topics = {};

const getAllTopics = () => topics;

export const addTopic = (topicId, options = {}) =>
  getTopic(topicId) ||
  Object.assign(topics, { [topicId]: new NodeCache(options) })[topicId];

export const getTopic = topicId =>
  topics.hasOwnProperty(topicId) && topics[topicId];
