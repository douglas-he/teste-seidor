const Input = ({ id, type= "text", onChange, value, label }) => (
  <label htmlFor={id} >
    {label}
    <input 
      value={value}
      onChange={onChange}
      id={id} 
      name={id} 
      type={type}
    />
  </label>
);

export default Input;
