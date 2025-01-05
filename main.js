const readline = require("node:readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const { error } = require("node:console");
const fs = require("node:fs");

function valoresWord(palavraUsuario) {
    fs.readFile("./words.txt", "utf8", (err, texto) => {
        if (err) {
            console.log(error(err));
        } else {
            const arrayDePalavras = separarTexto(texto);
            compararComLista(arrayDePalavras, palavraUsuario);
        }
    });
}

function pegandoValoresUsuario() {
    rl.question("Informe a palavra: ", (value) => {
        const palavraResetada = resetPalavra(value);
        const validacaoValor = validarValores(palavraResetada);
        if (validacaoValor) {
            valoresWord(palavraResetada);
        } else {
            pegandoValoresUsuario();
        }
    });
}
pegandoValoresUsuario();

function compararComLista(lista, valorUsuario) {
    let arrayItensAnagrama = [];
    const anagramas = fazendoAnagramas(valorUsuario);
    anagramas.forEach((anagrama) => {
        lista.forEach((item) => {
            if (anagrama.includes(item) && !arrayItensAnagrama.includes(item)) {
                arrayItensAnagrama.push(item.trim());
            }
        });
    });

    const arrayJuncoes = juntarValores(
        arrayItensAnagrama,
        valorUsuario.length,
        arrayItensAnagrama.length
    );
    arrayJuncoes.forEach((item) => {
        console.log(item)
    });
}

function juntarValores(array, tamanhoPalavra, tamanhoArray) {
    let arrayJuncaoPalavras = [];
    for (let i = 0; i < tamanhoArray; i++) {
        if (array[i].length === tamanhoPalavra) {
            arrayJuncaoPalavras.push([array[i]]);
        } else if (array[i].length < tamanhoPalavra) {
            for (let j = 0; j < tamanhoArray; j++) {
                if ((array[i] + array[j]).length === tamanhoPalavra) {
                    if (
                        !(array[i] === array[j]) &&
                        !arrayJuncaoPalavras.includes([array[j], array[i]])
                    )
                        arrayJuncaoPalavras.push(`${array[i]} ${array[j]}`);
                }
            }
        }
    }
    return arrayJuncaoPalavras;
}

function resetPalavra(palavra) {
    return palavra.toUpperCase().split(" ").join("");
}

function validarValores(palavra) {
    const validarTamanho = palavra.length <= 16;
    const validarCaracteres = /^[A-Za-z]+$/gi.test(palavra);

    if (validarTamanho && validarCaracteres) return true;
    else {
        console.log("Digite apenas palavras(sem acentos e sem pontuações)");
        return false;
    }
}

function fazendoAnagramas(value) {
    const arrayPalavra = value.split("");
    const anagramas = [];

    permutar(arrayPalavra, 0, arrayPalavra.length - 1, anagramas);
    return anagramas;
}

function permutar(arr, l, indexArray, anagramas) {
    if (l === indexArray) {
        anagramas.push(arr.join(""));
    } else {
        for (let i = l; i <= indexArray; i++) {
            [arr[l], arr[i]] = [arr[i], arr[l]];
            permutar(arr, l + 1, indexArray, anagramas);
            [arr[l], arr[i]] = [arr[i], arr[l]];
        }
    }
}

function separarTexto(texto) {
    return texto.split(/\n/);
}
