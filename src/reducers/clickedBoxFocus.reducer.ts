type TAction =
  | {
    type: 'next';
    payload: { arrayBox: number[]; oldest: number };
  }
  | { type: 'resume'; payload: { currentFocused: number } }
  | { type: 'set'; payload: { currentFocused: number } }
  | {
    type: 'previous';
    payload: { arrayBox: number[]; oldest: number };
  };

interface IState {
  current: number;
  nextArray: number[];
  previousArray: number[];
}

function reducer(state: IState, action: TAction): IState {
  switch (action.type) {
    case 'next': {
      const [actualElement, ...actualArray] = state.nextArray;

      return {
        nextArray: actualArray,
        previousArray: [actualElement, ...state.previousArray],
        current: actualElement,
      };
    }
    case 'resume':
      return {
        ...state,
        current: action.payload.currentFocused,
        previousArray: [],
        nextArray: [],
      };
    case 'set':
      return { ...state, current: action.payload.currentFocused };
    case 'previous': {
      let actualElement;
      let actualArray;
      if (state.previousArray.length) {
        [actualElement, ...actualArray] = state.previousArray;
      } else {
        [actualElement, ...actualArray] = action.payload.arrayBox;
      }
      return {
        nextArray: [actualElement, ...state.nextArray],
        previousArray: actualArray,
        current: actualArray[0],
      };
    }
    default:
      return { current: -1, nextArray: [], previousArray: [] };
  }
}

export default reducer;
