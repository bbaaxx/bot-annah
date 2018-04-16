/////////////////////
// DOM utilities
function clearElement(ele) {
  ele.innerHTML = '';
  return ele;
}
function appendElement(to = 'body', element, replace) {
  const target = typeof to === 'string' ? document.querySelector(to) : to;
  if (replace) clearElement(target);
  return target.appendChild(element);
}
function hl(tag, attrs = {}, childs = []) {
  const ele = document.createElement(tag);
  Object.keys(attrs).forEach(k => ele.setAttribute(k, attrs[k]));
  if (Array.isArray(childs)) {
    childs
      .map(
        item =>
          typeof item === 'string' ? document.createTextNode(item) : item,
      )
      .forEach(child => appendElement(ele, child));
  }
  return ele;
}

const app = appRoot => () => {
  const { Redux, most, io } = this;
  const { h } = this.h;
  const patch = this.snabbdom.init([
    this.snabbdom_style.default,
    this.snabbdom_class.default,
    this.snabbdom_props.default,
    this.snabbdom_attributes.default,
    this.snabbdom_eventlisteners.default,
  ]);
  /////////////////////////////////////////////////////////////////////////////////
  const ADD_MESSAGE = 'ADD_MESSAGE';
  const CLEAR_BUFFER = 'CLEAR_BUFFER';
  const addMessage = message => ({ type: ADD_MESSAGE, message });
  const clearBuffer = () => ({ type: CLEAR_BUFFER });
  /////////////////////////////////////////////////////////////////////////////////
  const view = state => h('div', state.logBuffer.map(i => h('p', i)).reverse());
  const initialState = { logBuffer: [] };
  let vnode = patch(appRoot, view(initialState));
  const update = state => (vnode = patch(vnode, view(state)));
  const socket = io(`${location.protocol}//${location.hostname}`);

  const store = Redux.createStore(
    (state = { logBuffer: [] }, action = {}) =>
      action.type === CLEAR_BUFFER
        ? { ...state, logBuffer: [] }
        : action.type === ADD_MESSAGE
          ? {
              ...state,
              logBuffer: [
                ...state.logBuffer,
                JSON.stringify(action.message, 2, 2),
              ],
            }
          : state,
  );

  store.subscribe(() => update(store.getState()));
  most
    .fromEvent('log', socket)
    .forEach(message => store.dispatch(addMessage(message)));
};

const rootEle = hl('div', { id: 'app-root' });
appendElement('body', rootEle);
window.addEventListener('load', app(rootEle).bind(window));
