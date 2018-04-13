import { createStore } from 'redux';

const initialState = {
  result: 1,
  lastValues: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = {
        ...state,
        result: state.result + action.payload
      };
      break;
    case "SUBSTRACT":
      state = {
        ...state,
        result: state.result - action.payload
      };
      break;
  }
  return state;
};

const store = createStore(reducer);

store.subscribe(() => {

});

store.dispatch({
  type: "ADD",
  payload: 10
});
