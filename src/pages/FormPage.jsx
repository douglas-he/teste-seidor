import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { addingEmployee, saveEditEmployee } from "../redux/employees/employeesSlice";
import { cpfMask } from "../utils";


// Guarda as mascaras para cada tipo de dado para caso seja necessário adicionar novas mascaras
const mapMasks = {
  cpf: cpfMask,
};

// Armazena informações do input para utilizar input generico
const ALL_INPUTS = [
  { id: 'name', label: 'Nome' },
  { id: 'cpf', label: 'CPF' },
  { id: 'salary', type: 'number', label: 'Salário Bruto' },
  { id: 'discount', type: 'number', label: 'Desconto da previdência' },
  { id: 'dependents', type: 'number', label: 'Número de dependentes' },
];

const INITIAL_STATE = { name: '', cpf: '', salary: 0, discount: 0, dependents: 0 };

const FormPage = () => {
  const { editEmployee, employees } = useSelector((employeeReducer) => employeeReducer);

  // Comparação para saber se está na pagina de edição
  const isEditPage = editEmployee >= 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formState, setFormState] = useState( 
    isEditPage
    ? employees.find(({ id }) => id === editEmployee) 
    : INITIAL_STATE
  );

  const handleSave = () => {
    if(isEditPage){ 
      dispatch(saveEditEmployee(formState));
    } else {
      dispatch(addingEmployee(formState));
    }
    navigate('/');
  };

  const handleChange = ({ target: { name, value }}) => {
    setFormState((prevFormState)=> ({ 
      ...prevFormState, 
      [name]: mapMasks[name] ? mapMasks[name](value) : value 
    }));
  };

  const handleRedirectHome = () => navigate('/');
  
  return (
    <>
      <section>
        <button type="button" onClick={handleRedirectHome}>Ir Para Listagem</button>
      </section>
      <section>
        <form>
          {ALL_INPUTS.map(({ id, label, type }) => (
            <div>
              <Input
              key={id}
              id={id}
              type={type}
              onChange={handleChange}
              value={formState[id]}
              label={label}
              />
            </div>
            ))}
          <button type="button" onClick={handleSave}>Salvar</button>
        </form>
      </section>
    </>
  );
}
export default FormPage;
