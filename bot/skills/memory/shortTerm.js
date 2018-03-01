import NodeCache from 'node-cache';

const slots = {};

const getShortTermMemory = () => slots;

const addMemorySlot = (slotId, config = {}) => { slots[slotId] = new NodeCache() };
const getMemorySlot = slotId => slots.hasOwnProperty(slotId) && slots[slotId];

export default () => slots;
