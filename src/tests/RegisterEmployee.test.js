import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import faker from 'faker-br';

import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import employees from './pessoas.json';
import { cpfMask, calcIRRFValue } from '../utils';

describe('Test Registration', () => {
  test('redirect to home', async () => {
    const user = userEvent.setup()
    const { history } = renderWithRouterAndRedux(
      <App />,
      { route: '/register' }
    );
    const homeButton = screen.getByRole('button', { name: 'Ir Para Listagem' });
    await user.click(homeButton);
    expect(history.location.pathname).toBe('/');
  });
  test("Render Form", () => {
    renderWithRouterAndRedux(
      <App />,
      { route: '/register' }
    );

    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
    const inputSalary = screen.getByRole('spinbutton', { name: 'Salário Bruto' });
    const inputDiscount = screen.getByRole('spinbutton', { name: 'Desconto da previdência' });
    const inputDependents = screen.getByRole('spinbutton', { name: 'Número de dependentes' });
    const homeButton = screen.getByRole('button', { name: 'Ir Para Listagem' });
    const saveButton = screen.getByRole('button', { name: 'Salvar' });

    expect(saveButton).toBeInTheDocument();
    expect(homeButton).toBeInTheDocument();
    expect(inputName).toBeInTheDocument();
    expect(inputCPF).toBeInTheDocument();
    expect(inputSalary).toBeInTheDocument();
    expect(inputDiscount).toBeInTheDocument();
    expect(inputDependents).toBeInTheDocument();
  });
  test("Submit Form", async () => {
    const user = userEvent.setup()
    const { history, store } = renderWithRouterAndRedux(
      <App />,
      { route: '/register', preloadedState: { employees: [], editEmployee: -1 }},
    );
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const name = faker.name.firstName();
    await user.type(inputName, name);
    expect(inputName).toHaveValue(name);

    const cpf = faker.br.cpf();
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
    await user.type(inputCPF, cpf);
    expect(inputCPF).toHaveValue(cpfMask(cpf));

    
    const salary= faker.random.float();
    const inputSalary = screen.getByRole('spinbutton', { name: 'Salário Bruto' });
    await user.type(inputSalary, String(salary));
    expect(inputSalary).toHaveValue(salary);

    const discount = faker.random.float();
    const inputDiscount = screen.getByRole('spinbutton', { name: 'Desconto da previdência' });
    await user.type(inputDiscount, String(discount));
    expect(inputDiscount).toHaveValue(discount);

    const dependents = faker.random.number();
    const inputDependents = screen.getByRole('spinbutton', { name: 'Número de dependentes' });
    await user.type(inputDependents, String(dependents));
    expect(inputDependents).toHaveValue(dependents);

    const saveButton = screen.getByRole('button', { name: 'Salvar' });
    await user.click(saveButton);
    
    const { employees: employeesState } = store.getState();

    expect(employeesState[0]).toEqual({
      id: 0, name, cpf: cpfMask(cpf), 
      salary: String(salary), 
      discount: String(discount), 
      dependents: String(dependents),
      discountIRRF: calcIRRFValue({ salary, discount, dependents }),
    });

    expect(history.location.pathname).toBe('/');
  });

  test("Submit Form with initial values in employees", async () => {
    const user = userEvent.setup()
    const { history, store } = renderWithRouterAndRedux(
      <App />,
      { route: '/register', preloadedState: { employees, editEmployee: -1 }},
    );
    const inputName = screen.getByRole('textbox', { name: 'Nome' });
    const name = faker.name.firstName();
    await user.type(inputName, name);
    expect(inputName).toHaveValue(name);

    const cpf = faker.br.cpf();
    const inputCPF = screen.getByRole('textbox', { name: 'CPF' });
    await user.type(inputCPF, cpf);
    expect(inputCPF).toHaveValue(cpfMask(cpf));

    
    const salary= faker.random.float();
    const inputSalary = screen.getByRole('spinbutton', { name: 'Salário Bruto' });
    await user.type(inputSalary, String(salary));
    expect(inputSalary).toHaveValue(salary);

    const discount = faker.random.float();
    const inputDiscount = screen.getByRole('spinbutton', { name: 'Desconto da previdência' });
    await user.type(inputDiscount, String(discount));
    expect(inputDiscount).toHaveValue(discount);

    const dependents = faker.random.number();
    const inputDependents = screen.getByRole('spinbutton', { name: 'Número de dependentes' });
    await user.type(inputDependents, String(dependents));
    expect(inputDependents).toHaveValue(dependents);

    const saveButton = screen.getByRole('button', { name: 'Salvar' });
    await user.click(saveButton);
    
    const { employees: employeesState } = store.getState();

    expect(employeesState.at(-1)).toEqual({
      id: employees.length, name, cpf: cpfMask(cpf), 
      salary: String(salary), 
      discount: String(discount), 
      dependents: String(dependents),
      discountIRRF: calcIRRFValue({ salary, discount, dependents }),
    });

    expect(history.location.pathname).toBe('/');
  });
});
