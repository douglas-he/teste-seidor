import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import faker from 'faker-br';

import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import employees from './pessoas.json';
import { cpfMask, calcIRRFValue } from '../utils';

test("Edit employee", async () => {
  const user = userEvent.setup();
  const { store, history } = renderWithRouterAndRedux(
    <App />,
    { route: '/edit/0', preloadedState: { employees, editEmployee: 0 } }
  );

  const inputName = screen.getByRole('textbox', { name: 'Nome' });
  const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
  const inputSalary = screen.getByRole('spinbutton', { name: 'Salário Bruto' });
  const inputDiscount = screen.getByRole('spinbutton', { name: 'Desconto da previdência' });
  const inputDependents = screen.getByRole('spinbutton', { name: 'Número de dependentes' });
  const homeButton = screen.getByRole('button', { name: 'Ir Para Listagem' });
  const saveButton = screen.getByRole('button', { name: 'Salvar' });
  const [firstEmployee,] = employees; 
  expect(saveButton).toBeInTheDocument();
  expect(homeButton).toBeInTheDocument();

  expect(inputName).toHaveValue(firstEmployee.name);
  expect(inputCPF).toHaveValue(firstEmployee.cpf);
  expect(inputSalary).toHaveValue(firstEmployee.salary);
  expect(inputDiscount).toHaveValue(firstEmployee.discount);
  expect(inputDependents).toHaveValue(firstEmployee.dependents);

  const name = faker.name.firstName();
  await user.clear(inputName);
  await user.type(inputName, name);
  expect(inputName).toHaveValue(name);

  const dependents = faker.random.number();
  await user.clear(inputDependents);
  await user.type(inputDependents, String(dependents));
  expect(inputDependents).toHaveValue(dependents);

  await user.click(saveButton);
  const { employees: employeesState } = store.getState();

  expect(employeesState[0]).toEqual({
    id: 0, name, cpf: cpfMask(firstEmployee.cpf), 
    salary: firstEmployee.salary, 
    discount: firstEmployee.discount, 
    dependents: String(dependents),
    discountIRRF: calcIRRFValue({ salary: firstEmployee.salary , discount: firstEmployee.discount, dependents }),
  });

  expect(history.location.pathname).toBe('/');
});