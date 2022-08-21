import { useSelector, useDispatch } from "react-redux";
import { editEmployee, deleteEmployee } from "../redux/employees/employeesSlice";
import { useNavigate  } from "react-router-dom";

const HEADER_TABLE = [
  'Nome',
  'CPF',
  'Salário',
  'Desconto',
  'Dependentes',
  'Desconto IRPF',
];

const EmployeesDisplay = () => {
  const dispatch = useDispatch();
  const employees = useSelector(({ employees }) => employees);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    dispatch(editEmployee(id));
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };
  
  const handleRedirect = () => {
    navigate('/register');
  };

  return (
    <>
      <section>
        <button type="button" onClick={handleRedirect}>Cadastrar Novo Funcionario</button>
      </section>
      {employees.length === 0 
      ? <h1>Sem Funcionarios</h1> 
      : (
        <section>
          <table>
            <thead>
              <tr>
                {HEADER_TABLE.map((name) => <th key={name} >{name}</th>)}
              </tr>
            </thead>
            <tbody>
              {employees.map(({ id, ...employee }) => (
                <tr key={employee.name}>
                  {Object.values(employee).map((info) => <td key={info}>{info}</td>)}
                  <td>
                    <button type="button" onClick={() => handleEdit(id)}>Editar</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => handleDelete(id)}>Excluir</button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </>
);
}

export default EmployeesDisplay;