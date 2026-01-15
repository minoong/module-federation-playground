export interface State {
  count: number;
}

type Listener = (state: State) => void;

let state: State = {
  count: 0,
};

const listeners: Set<Listener> = new Set();

export const store = {
  get: () => state,
  set: (newState: Partial<State>) => {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener(state));
  },
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
