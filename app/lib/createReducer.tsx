import _ from 'lodash';

export type Action = {
  type: string;
  payload: any;
};

export default function createReducer<T, A>(
  initialState: T | undefined,
  handlers: any,
): (state?: T, action?: Action) => T {
  return function reducer(
    state: T | undefined = initialState,
    action?: Action,
  ) {
    if (_.isNil(action) || _.isNil(action.type)) {
      return state;
    }
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    if (state === undefined) {
      return initialState;
    }
    return state;
  };
}
