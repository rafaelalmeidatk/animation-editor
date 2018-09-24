import { configureStore, applyMiddleware } from '@acemarke/redux-starter-kit';
import reducer from '../ducks';

const state = '{"objects":{"animations":[{"id":"rJI8R5SKX","_inspector":{"editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"delay","displayName":"Delay"},{"fieldKey":"repeat","displayName":"Repeat"}]},"name":"New Animation","delay":0,"repeat":false,"frames":["SJfUL0cSYQ","HJm8U0crF7","S1VILRcSYQ","Sk3_09SFX"]},{"id":"H1lI8AcSKm","_inspector":{"editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"delay","displayName":"Delay"},{"fieldKey":"repeat","displayName":"Repeat"}]},"name":"New Animation","delay":0,"repeat":false,"frames":[]},{"id":"HkZL80qrKQ","_inspector":{"editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"delay","displayName":"Delay"},{"fieldKey":"repeat","displayName":"Repeat"}]},"name":"New Animation","delay":0,"repeat":false,"frames":[]}],"frames":[{"id":"SJfUL0cSYQ","_inspector":{"editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":0,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":["r1S8IA5SKQ"]},{"id":"HJm8U0crF7","_inspector":{"editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":64,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":[]},{"id":"S1VILRcSYQ","_inspector":{"editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":128,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":[]},{"id":"Sk3_09SFX","_inspector":{"editableFields":[{"fieldKey":"sourceRect","displayName":"Rectangle"},{"fieldKey":"offset","displayName":"Offset"}]},"name":"New Frame","sourceRect":{"x":192,"y":64,"width":64,"height":64},"offset":{"x":0,"y":0},"colliders":[]}],"colliders":[{"id":"r1S8IA5SKQ","_inspector":{"editableFields":[{"fieldKey":"name","displayName":"Name"},{"fieldKey":"type","displayName":"Type"},{"fieldKey":"rect","displayName":"Rectangle"},{"fieldKey":"origin","displayName":"Origin"}]},"name":"New Collider","type":"NONE","rect":{"x":0,"y":0,"width":32,"height":32},"origin":{"x":0.5,"y":0.5}}]},"selection":{"selectedAnimationId":"rJI8R5SKX","selectedItemId":"Sk3_09SFX","selectedFrameId":"Sk3_09SFX"},"ui":{"framesVisible":true,"collidersVisible":true}}';
const preloadedState = JSON.parse(state);

export default () => {
  return configureStore({ reducer, preloadedState });
};
