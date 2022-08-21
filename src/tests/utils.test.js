import { cpfMask, calcIRRFValue } from "../utils";

describe('cpfMask', () => {
  test('Valid value', () => {
    const cpfFake = '12946757021';
    const cpf = cpfMask(cpfFake);
    expect(cpf).toBe('129.467.570-21')
  });
  test('Remove caracters', () => {
    const cpfFake = '12**9-46._757z021';
    const cpf = cpfMask(cpfFake);
    expect(cpf).toBe('129.467.570-21')
  });
});

describe('calcIRRFValue', () => {
  const formatValueTest = (value) => value.toLocaleString('pt-BR', { currency:'BRL', style: 'currency' })
  test('Aliquot 27.5', () => {
    const IRRF = calcIRRFValue({ salary: '5500.00', discount: '500', dependents: '2' });
    expect(IRRF).toEqual(formatValueTest(207.52));
  });
  test('Aliquot 22.5', () => {
    const IRRF = calcIRRFValue({ salary: '4600.00', discount: '500', dependents: '2' });
    expect(IRRF).toBe(formatValueTest(140.02));
  });
  test('Aliquot 15.5', () => {
    const IRRF = calcIRRFValue({ salary: '3700.00', discount: '500', dependents: '2' });
    expect(IRRF).toBe(formatValueTest(72.52));

  });
  test('Aliquot 7.5', () => {
    const IRRF = calcIRRFValue({ salary: '2900.00', discount: '500', dependents: '2' });
    expect(IRRF).toBe(formatValueTest(12.52));
  });
  test('IRRF Value R$ 0,00', () => {
    const IRRF = calcIRRFValue({ salary: '2000.00', discount: '500', dependents: '2' });
    expect(IRRF).toBe(formatValueTest(0.00));
  });
});
