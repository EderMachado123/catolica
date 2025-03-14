function verificarNumeroPrimo(n){
    if(n <= 1){
        return false;
    }

    if(n % 2 == 0 && n != 2){
        return false;
    }

    for(let i = 3; i < n; i += 2){
        if(n % i == 0){
            return false;
        }
    }

    return true;
}

console.log(`verificarNumeroPrimo(0)=${verificarNumeroPrimo(0)}`);

verificarNumeroPrimo(0); //false
verificarNumeroPrimo(1); //false
verificarNumeroPrimo(2); //false
verificarNumeroPrimo(3); //verdadeiro