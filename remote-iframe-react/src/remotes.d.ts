declare module 'host_app/store' {
  export interface State {
    count: number;
  }
  
  export const store: {
    get: () => State;
    set: (newState: Partial<State>) => void;
    subscribe: (listener: (state: State) => void) => () => void;
  }
}
