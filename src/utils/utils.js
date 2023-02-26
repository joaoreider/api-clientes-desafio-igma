
export default function cpfIsValid(cpf){
    const cpfNoveDigitos = cpf.slice(0, -2);
    let somaDigito1 = 0;
    let somaDigito2 = 0;

    for (let i = 0, j = -10; i < 9; i++, j++) {
        const valor = parseInt(cpfNoveDigitos.charAt(i));
        somaDigito1 += Math.abs(j) * valor;
        somaDigito2 += Math.abs(j - 1) * valor;
      }

    const restoDigito1 = somaDigito1 % 11;
    const digito1 = restoDigito1 < 2 ? 0 : 11 - restoDigito1;

    somaDigito2 += digito1 * 2;
    const restoDigito2 = somaDigito2 % 11;
    const digito2 = restoDigito2 < 2 ? 0 : 11 - restoDigito2;

    const cpfValido = cpfNoveDigitos + digito1.toString() + digito2.toString();

    return cpfValido === cpf

}