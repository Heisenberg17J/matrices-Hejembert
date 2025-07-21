export function latexToMath(latex){
    
    // Transforma la ecuacion de latex a una expresion matematica

    latex = latex.replace(/\\frac(\d)(\d)/g, '\\frac{$1}{$2}');

    return latex
    .match(/\\displaylines{([\s\S]+)}/)[1]
    .split(/\\\\/)
    .map(eq => eq.trim())
    .map(eq => eq.replace(/\\frac{([^}]+)}{([^}]+)}/g, (_,numerador, denominador)=>{
        const resultado = Number(numerador.trim())/Number(denominador.trim());
        return String(parseFloat(resultado).toFixed(4));
    }));
}

export function formatoBonito(numero, tolerancia = 1e-2) {

    //Formato para aproximar resultado a enteros

    const cercano = Math.round(numero);
    if (Math.abs(numero - cercano) < tolerancia) {
        return cercano.toString();
    } else {
        return numero.toFixed(4);
    }
}
 
export function matrizToLatex(m) {

    // Convierte la matriz a un formato latex

    let filas = m.length;

    let matrizToLatex = '';

    for (let i = 0; i < filas; i++) {
        let fila = m[i].map(e => String(e)).join(' & ');
        matrizToLatex += fila;
        if (i < filas - 1) {
            matrizToLatex += ' \\\\ \n';
        }
    }

    return `\\begin{bmatrix}\n${matrizToLatex}\n\\end{bmatrix}`;
}