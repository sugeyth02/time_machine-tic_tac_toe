type TAction =
  | {
    type: 'next';
    payload: { arrayTravel: number };
  }
  | { type: 'previous' }
  | { type: 'set'; payload: { current: number; isTraveling?: boolean } };

interface IState {
  current: number;
  traveling: boolean;
}

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'next': {
      const response = state.current + 1;
      if (response < action.payload.arrayTravel) {
        return { ...state, current: response };
      }
      return { current: state.current, traveling: false };
    }
    case 'set': {
      const traveling = action.payload.isTraveling;
      const { current } = action.payload;
      return {
        current,
        traveling: traveling !== undefined ? traveling : state.traveling,
      };
    }
    case 'previous': {
      const response = state.current - 1;
      if (response > 0) {
        return { current: response, traveling: true };
      }
      return { current: 1, traveling: true };
    }
    default:
      return { current: -1, traveling: false };
  }
}

export default reducer;
