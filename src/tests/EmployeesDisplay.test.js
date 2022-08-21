import React from 'react';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import employees from './pessoas.json';


describe('Employees Display tests', () => {
  test("Render Table", () => {
    const HEADER_TABLE = [
      'Nome',
      'CPF',
      'Salário',
      'Desconto',
      'Dependentes',
      'Desconto IRPF',
    ];
    renderWithRouterAndRedux(
      <App />,
      { preloadedState: { employees, editEmployee: -1 } }
    );
    const row = screen.getAllByRole('columnheader');
    const buttonRegister = screen.getByRole('button', { name: 'Cadastrar Novo Funcionario' });
    const editButtons = screen.getAllByRole('button', { name: 'Editar' });
    const deleteButtons = screen.getAllByRole('button', { name: 'Excluir' });

    // Garante que existe um botão de editar e excluir para cada funcionário incluído inicialmente
    expect(editButtons).toHaveLength(employees.length);
    expect(deleteButtons).toHaveLength(employees.length);
    expect(buttonRegister).toBeInTheDocument();
    employees.forEach((employee, i)=> {
      for(const keyEmployee in employee){
        const getText = screen.getAllByText(employee[keyEmployee]);
        // valida elementos que so possuem uma ocorrencia e elementos que possuem varias
        expect(getText[i] || getText[0]).toBeInTheDocument();
      }
    });
    HEADER_TABLE.forEach((column) => {
      const getText = screen.getByText(column);
      expect(getText).toBeInTheDocument();
    });
    expect(row).toHaveLength(HEADER_TABLE.length);
    expect(row).toHaveLength(employees.length + 1);
  });
  test("Edit item", async () => {
    const user = userEvent.setup()
    const { store, history } = renderWithRouterAndRedux(
      <App />,
      { preloadedState: { employees, editEmployee: -1 } }
    );
    const editButtons = screen.getAllByRole('button', { name: 'Editar' });
    await user.click(editButtons[0]);

    const { editEmployee } = store.getState();
    expect(editEmployee).toBe(employees[0].id);
    expect(history.location.pathname).toBe('/edit/0');
  });

  test("Delete item", async () => {
    const user = userEvent.setup()
    const { store } = renderWithRouterAndRedux(
      <App />,
      { preloadedState: { employees, editEmployee: -1 } }
    );
    const deleteButtons = screen.getAllByRole('button', { name: 'Excluir' });
    await user.click(deleteButtons[0]);
    const nameEmployeeDeleted = screen.queryByText(employees[0].name);
    expect(nameEmployeeDeleted).not.toBeInTheDocument();
    const { employees: employeesState } = store.getState();
    const expectedEmployees = employees.filter((emp) => emp.id !== 0);
    expect(employeesState).toEqual(expectedEmployees);
    expect(employeesState).toHaveLength(expectedEmployees.length);
  });

  test("Redirect to registry", async () => {
    const user = userEvent.setup()
    const { history } = renderWithRouterAndRedux(
      <App />,
      { preloadedState: { employees, editEmployee: -1 } }
    );
    const buttonRegister = screen.getByRole('button', { name: 'Cadastrar Novo Funcionario' });
    await user.click(buttonRegister); 
    expect(history.location.pathname).toBe('/register');
  });

  test("No employees", () => {
    renderWithRouterAndRedux(
      <App />,
      { preloadedState: { employees: [], editEmployee: -1 } }
    );
    const buttonRegister = screen.getByRole('button', { name: 'Cadastrar Novo Funcionario' });
    const emptyEmployees = screen.getByRole('heading', { name: 'Sem Funcionarios' });
    expect(buttonRegister).toBeInTheDocument();
    expect(emptyEmployees).toBeInTheDocument();
  });
});
