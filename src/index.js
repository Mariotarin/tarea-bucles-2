// 1) sumUpTo: suma los números desde 1 hasta n
function sumUpTo(n) {
    let suma = 0
    for (let i = 0; i <= n; i++) {
        suma += i;
    }
    return suma;
}

// 2) factorial: calcula el factorial de n
function factorial(n) {
    if (n <= 0) {
        return null
    }
    let results = 1;
    for (let i = 1; i <= n; i++) {
        results = results * i;
    }
    return results
}

// 3) everyOtherChar: devuelve los caracteres en posiciones pares
function everyOtherChar(str) {
    if (typeof str !== 'string') {
        return ''
    }
    let results = ""
    for (let i = 0; i < str.length; i++) {
        if (i % 2 === 0) {
            results += (str[i]);
        }
    }
    return results
}

// 4) flattenOnce: aplana un array un nivel 
function flattenOnce(arr) {
    let arrayPlano = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {

            arrayPlano = arrayPlano.concat(flattenOnce(arr[i]));

        } else {
            arrayPlano.push(arr[i]);
        }
    }
    return arrayPlano;
}

// 5) countInObject: cuenta cuántas veces aparece `value` entre los valores del objeto (usa `for...in`)
function countInObject(obj, value) {
    const valorObtenido = value;
    let contador = 0;
    for (let key in obj) {
        if (obj[key] === valorObtenido) {

            contador++;
        }

    }
    return contador

}

// 6) accumulateUntil: suma elementos hasta que la suma sea >= limit
function accumulateUntil(arr, limit) {
    let suma = 0;
    for (let i = 0; i < arr.length; i++) {
        suma += arr[i];
        if (suma >= limit) {
            return suma;
        }

    }
    return suma

}

// 7) keysWithPrefix: devuelve las claves del objeto que empiezan por `prefix` (usa `for...in`)
function keysWithPrefix(obj, prefix) {
    const clavesPrefijo = [];
    for (let key in obj) {
        if (obj[key] === prefix) {
            Object.keys(prefix)
        }
    }
    return Object.keys(obj)


}

// 8) intersection: devuelve los elementos comunes entre dos arrays 
function intersection(a, b) {
    const coincidentes = [];
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < b.length; j++) {
            if (a[i] === b[j]) {
                coincidentes.push(a[i]);

            }
        }
    }
    return coincidentes

}

// 9) BONUS mapWithLoop: implementa `map` usando bucles
function mapWithLoop(arr, fn) {

}

// 10) filterEvenIndices: devuelve elementos en índices pares
function filterEvenIndices(arr) {
    const elementosPares = [];
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            elementosPares.push(arr[i])
        }
    }
    return elementosPares

}

