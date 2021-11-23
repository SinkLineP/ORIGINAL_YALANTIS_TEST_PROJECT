import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initalState = {
  users: [],
};

function updateRecord(state, itemId, changeActive, changeSelectedOption) {
  const newUsers = state.users.map((rec) => {
    if (rec.id === itemId) {
      return {
        ...rec,
        active: changeActive,
        selectedOption: changeSelectedOption,
      };
    }
    return rec;
  });
  return { ...state, users: newUsers };
}

function employees(state = initalState, action) {
  switch (action.type) {
    case 'ADD_USERS':
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case 'UPDATE_USERS':
      return updateRecord(
        state,
        action.payload.id,
        action.payload.active,
        action.payload.selectedOption
      );

    default:
      return state;
  }
}

function useLocalState(localItem) {
  const jsonUsers = JSON.stringify(localItem);
  localStorage.setItem('redux-users', jsonUsers);
}

const store = createStore(
  employees,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => {
  if (window.location.reload) {
    return !useLocalState(store.getState());
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
