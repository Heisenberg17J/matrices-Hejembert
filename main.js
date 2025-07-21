/* ==========================
    INTERACCIONES CON EL DOM
============================= */

import {procesarEcuaciones} from "./modules/procesarEcuaciones.js";
import {matrizToLatex} from "./modules/formatoLatex.js"
import {operacionSeleccionada} from "./modules/operaciones.js"

document.addEventListener('DOMContentLoaded', () => {
  const mathField = document.getElementById('math-entrada');
  const salida = document.getElementById('salida-latex');
  const btnGuardar = document.getElementById('guardarMatriz');
  const seleccionador = document.getElementById('seleccionador');
  const errorEntrada = document.getElementById('error-entrada');
  const apartadoProcedimiento = document.getElementById('procedimiento');
  const btnProcedimiento = document.getElementById("btn-procedimiento");
  const divProcedimiento= document.getElementById("div-procedimiento");


  mathField.addEventListener('keydown', handleKeyDown);
  btnGuardar.addEventListener('click', handleGuardarMatriz);
  btnProcedimiento.addEventListener('click', verProcedimiento);

  function handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      mathField.executeCommand(['insert', '\\\\']);
    }
  }

  function handleGuardarMatriz() {
    try {
      const latex = mathField.getValue('latex');

      if (!latex.trim()) {
        return mostrarError("La entrada está vacía.");
      }

      const matriz = procesarEcuaciones(latex);
      errorEntrada.hidden = true;

      const resultado = operacionSeleccionada(seleccionador.value, matriz);
      
      salida.innerHTML = "<h3 class='subtitle'>Resultado\n<h3>" + matrizToLatex(resultado);
      MathJax.typesetPromise();
      
      divProcedimiento.style.display = "block";
      divProcedimiento.hidden = false;

    } catch (error) {
      mostrarError("Ecuaciones no válidas", error);
    }
  }

  function mostrarError(mensaje, error = '') {
    console.error("Error:", error);
    errorEntrada.hidden = false;
    errorEntrada.innerHTML = `<b>${mensaje}</b>`;
  }

  function verProcedimiento(){
    apartadoProcedimiento.hidden = false;
    apartadoProcedimiento.style.display = "block";

  }
});
