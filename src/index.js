import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { Provider } from 'react-redux';
import createStore from './store';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import {
  newAnimation,
  newFrame,
  newCollider,
  setFrameSourceRect,
} from './ducks/objects';
import {
  setSelectedAnimationId,
  setSelectedFrameId,
  setSelectedItemId,
} from './ducks/selection';

const store = createStore();
store.dispatch(newAnimation());
store.dispatch(newAnimation());
store.dispatch(newAnimation());
var id = store.getState()['objects']['animations'][0]['id'];
store.dispatch(setSelectedAnimationId(id));
store.dispatch(newFrame(id));

var frameId = store.getState()['objects']['frames'][0]['id'];
store.dispatch(setSelectedFrameId(frameId));
store.dispatch(
  setFrameSourceRect(frameId, { x: 0, y: 64, width: 64, height: 64 })
);
store.dispatch(newCollider(frameId));
// store.dispatch(newAnimation());
// store.dispatch(newAnimation());
// store.dispatch(newFrame(0));
// store.dispatch(newFrame(0));
// store.dispatch(newFrame(0));
// store.dispatch(setFrameSourceRect(0, 0, { x: 32, y: 32, width: 122, height: 122 }));
// store.dispatch(setFrameSourceRect(0, 1, { x: 64, y: 0, width: 32, height: 32 }));
// store.dispatch(setFrameSourceRect(0, 2, { x: 0, y: 64, width: 64, height: 64 }));
// store.dispatch(newFrame(1));
// store.dispatch(newFrame(1));
// store.dispatch(newCollider(0, 0));
// store.dispatch(setSelectedAnimationIndex(0));
// store.dispatch(setSelectedFrameIndex(0, 0));
/*var id = store
.getState()
['animation'].get('animations')
.get(0)
.get('_id');
store.dispatch(setSelectedItemId(id));*/

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
