import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../redux/employees/employeesSlice';

const renderWithRouterAndRedux = (
  component,
  {
    preloadedState = {},
    store = configureStore({
        reducer, preloadedState,
    }),
    route = '/',
  } = {},
) => {
  const history = createMemoryHistory()
  history.push(route);
  return ({
    ...render(
      <Provider store={ store }>
        <Router location={history.location} navigator={history} >
          {component}
        </Router>
      </Provider>,
    ),
    store,
    history,
  });
}
export default renderWithRouterAndRedux;