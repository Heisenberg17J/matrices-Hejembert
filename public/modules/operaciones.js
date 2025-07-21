/* ===================================
   FUNCIONES DE SOLUCION DE ECUACIONES
====================================== */
import {formatoBonito} from "./formatoLatex.js";

function intercambiarFilas(matriz, i ,j) {
    let temp = matriz[i];
    matriz[i] = matriz[j];
    matriz[j] = temp;
}

function gaussJordan(m){
    let matriz = m;
    let limite = Math.min(matriz.length, matriz[0].length);

    for (let i = 0; i < limite; i++) {

        let pivote = matriz[i][i];

        if (pivote == 0) {
            let intercambioHecho = false;
            
            for (let j = i+1; j < matriz.length; j++) {
                if (matriz[j][i] != 0) {
                    intercambiarFilas(matriz, i, j);
                    pivote = matriz[i][i];
                    intercambioHecho = true;
                    break;
                }
            }

            if (!intercambioHecho) {
                continue; // No se pudo encontrar un pivote en esa columna
            }
        }

        for (let j = 0; j < matriz[0].length; j++) {
            matriz[i][j] = matriz[i][j]/pivote;
        }
        
        for (let j = 0; j < matriz.length; j++) {
            let factor = matriz[j][i];
            if (i != j) {
                for(let k = 0; k < matriz[0].length; k++) {
                    matriz[j][k]= matriz[j][k] - factor*matriz[i][k];
                }  
            }
        }
    }

    for (let i = 0; i < limite; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            matriz[i][j] = formatoBonito(matriz[i][j]);
        }
    }
    return matriz;
}

function triangularS(m) {
    let matriz =m;
    let copiaMatriz = copiarMatriz(m);
    let limite = Math.min(matriz.length, matriz[0].length);

    for (let i = 0; i < limite; i++) {
        let pivote = matriz[i][i];
        
        for (let j = 0; j < matriz[0].length; j++) {
            copiaMatriz[i][j] = matriz[i][j]/pivote;
        }

        for (let j = 0; j < matriz.length; j++) {
            let factor = matriz[j][i];
            if (j>i) {   
                for (let k = 0; k < matriz[0].length; k++) {
                        matriz[j][k] = matriz[j][k]-factor*copiaMatriz[i][k];
                }
            }
        }
 
    }
    
    for (let i = 0; i < limite; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            matriz[i][j] = formatoBonito(matriz[i][j]); 
        }
    }
    return matriz;
}


function copiarMatriz(m){
    return m.map(fila =>[...fila]);
}

/* ==========================
    SELECCION DE OPERACIONES
============================= */

export function operacionSeleccionada(op, matriz) {
    let matrizOperada = matriz;
    switch (op) {
        case 'gauss-jordan':
            matrizOperada = gaussJordan(matriz);
            break;

        case 'triangular-s':
             matrizOperada = triangularS(matriz);

            break;
        default:

            break;
    }
    return matrizOperada;
}
