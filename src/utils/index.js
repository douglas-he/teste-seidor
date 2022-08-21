// Ref https://medium.com/trainingcenter/mascara-de-cpf-com-react-javascript-a07719345c93
export const cpfMask = (value) =>
value
.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
.replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
.replace(/(\d{3})(\d)/, '$1.$2')
.replace(/(\d{3})(\d{1,2})/, '$1-$2')
.replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada

// Valores referencia IRRF
const DEPENDENTS_DISCOUNT_UNITY = 164.56;
const tableCalculate = [
  { aliquot: 27.5, deduction: 869.36, minValue: 4664.69 },
  { aliquot: 22.5, deduction: 636.13, minValue: 3751.06 },
  { aliquot: 15, deduction: 354.80, minValue: 2826.66 },
  { aliquot: 7.5, deduction: 142.80, minValue: 1903.99},
];

export const calcIRRFValue = ({ salary, discount, dependents }) => {
  const dependesDiscount = Number(dependents) * DEPENDENTS_DISCOUNT_UNITY;
  const valueToCompareRange = Number(salary) - Number(discount) - dependesDiscount;
  const valueIRRF = tableCalculate.reduce((acc, { minValue, aliquot, deduction }) => {
    return (valueToCompareRange >= minValue)
      ?  valueToCompareRange * ( aliquot / 100) - deduction
      : acc;
  }, 0);

  return valueIRRF.toLocaleString('pt-BR', { currency:'BRL', style: 'currency' });
};