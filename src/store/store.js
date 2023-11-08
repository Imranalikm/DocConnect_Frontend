import { createStore } from "redux";

const initialState = {
  user: { login: null },
  admin: { login: null },
  hospital: { login: null },
  loading: false,
  refresh: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "admin":
      return { ...state, admin: action.payload };
    case "hospital":
      return { ...state, hospital: action.payload };
    case "refresh":
      return { ...state, refresh: !state.refresh };
    case "loading":
      return { ...state, loading: action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;