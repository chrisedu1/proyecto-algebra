var size = 3;  // Tamaño predeterminado
    var a;

    function determinarSolucion(determinante, numVariables) {
      var mensaje = "";
      if (determinante === 0) {
        mensaje = "El sistema no tiene solución o tiene soluciones infinitas.";
      } else if (determinante !== 0 && determinante !== undefined) {
        mensaje = "El sistema tiene una única solución.";
      }
      document.getElementById("mensaje-solucion").textContent = mensaje;
    }


    function det(a) {
      // Función para calcular el determinante de una matriz cuadrada
      var size = a.length;
      if (size === 2) {
        return a[0][0] * a[1][1] - a[0][1] * a[1][0];
      } else {
        var determ = 0;
        for (var i = 0; i < size; i++) {
          var cofactor = 1;
          for (var j = 0; j < size; j++) {
            cofactor *= a[(i + j) % size][j];
          }
          determ += cofactor;
        }
        for (var i = 0; i < size; i++) {
          var cofactor = 1;
          for (var j = 0; j < size; j++) {
            cofactor *= a[(i - j + size) % size][j];
          }
          determ -= cofactor;
        }
        return determ;
      }
    }


    function cramer() {
      // Función para resolver el sistema de ecuaciones utilizando el método de Cramer
      a = new Array(size);
      for (var i = 0; i < size; i++) {
        a[i] = new Array(size + 1);
        for (var j = 0; j < size + 1; j++) {
          a[i][j] = parseFloat(document.matriz[i * (size + 1) + j].value);
        }
      }
      var determinante = det(a);
        determinarSolucion(determinante, a.length);

      var detA = det(a);
      if (detA === 0) {
        alert("El determinante de la matriz de coeficientes es igual a cero. No se puede usar el método de Cramer.");
        return;
      }

      var soluciones = new Array(size);
      for (var k = 0; k < size; k++) {
        var tempA = a.map(function(row) {
          return row.slice();
        });
        for (var i = 0; i < size; i++) {
          tempA[i][k] = a[i][size];
        }
        soluciones[k] = det(tempA) / detA;
      }

      for (var i = 0; i < size; i++) {
        document.getElementById("solucion_" + i).value = soluciones[i];
      }
    }
    

    function cambiarTamaño() {
      // Función para cambiar el tamaño de las ecuaciones
      size = parseInt(document.getElementById("tamaño").value);
      generarCamposEcuacion();
    }

    function generarCamposEcuacion() {
      // Función para generar campos de ecuación dinámicamente
      var ecuacionesDiv = document.getElementById("ecuaciones");
      ecuacionesDiv.innerHTML = "";

      for (var i = 0; i < size; i++) {
        for (var j = 0; j < size + 1; j++) {
          var input = document.createElement("input");
          input.type = "text";
          input.size = "3";
          input.id = i * (size + 1) + j;
          ecuacionesDiv.appendChild(input);
        }
        ecuacionesDiv.appendChild(document.createElement("br"));
      }
    }
  