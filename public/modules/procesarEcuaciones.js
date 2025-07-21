/* =================================
   FUNCIONES DE PROCESAR ECUACIONES
==================================== */
import {latexToMath} from "./formatoLatex.js";

function obtenerVariables(nodos){

    //Obtiene todas las variables de las ecuaciones

    let vars = new Set();

    for(let nodo of nodos){
        nodo.traverse(function(n){
            if(n.isSymbolNode){
                vars.add(n.name);
            }
        });
    }   

    return Array.from(vars).sort();
}


function obtenerCoeficientes(expr, variables){

    //Obtiene los coeficientes de una ecuacion dada

    let coeficientes = [];

    let simplificado = math.simplify(expr);
    for(let v of variables){

        //realiza la derivada parcial de cada variable para obtener el numero
        let parcial = math.derivative(simplificado, v);
        coeficientes.push(Number(parcial.evaluate()));
    }

    return coeficientes;
}



export function procesarEcuaciones(latex){

    //Procesa cada una de las ecuaciones y retorna un Array Multidimensional

    let matriz = [];
    const ecuaciones = latexToMath(latex);

    let ladoIzquierdo = ecuaciones.map(e => e.split('=')[0]);

    let ladoDerecho = ecuaciones.map(e => e.split('=')[1]);

    let constantes = ladoDerecho.map(expr =>Number(expr.trim()));


    let nodos = ladoIzquierdo.map(expr =>math.parse(expr));

    let ecVars = obtenerVariables(nodos);
    let i=0;
    for(let nodo of nodos){
        let fila = obtenerCoeficientes(nodo,ecVars);
        fila.push(constantes[i])
        matriz.push(fila);
        i++;
    }
    
    return matriz;
}
