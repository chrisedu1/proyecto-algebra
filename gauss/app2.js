var size = 3; // Tamaño predeterminado
    var a;

    function gaussJordan() {
      a = new Array(size);
      for (var i = 0; i < size; i++) {
        a[i] = new Array(size + 1);
        for (var j = 0; j < size + 1; j++) {
          a[i][j] = parseFloat(document.matriz[i * (size + 1) + j].value);
        }
      }

      var operaciones = []; // Almacenar las operaciones

      for (var k = 0; k < size; k++) {
        var maxRow = k;
        for (var i = k + 1; i < size; i++) {
          if (Math.abs(a[i][k]) > Math.abs(a[maxRow][k])) {
            maxRow = i;
          }
        }

        var temp = a[k];
        a[k] = a[maxRow];
        a[maxRow] = temp;

        var pivot = a[k][k];

        operaciones.push(`Paso ${k + 1}: Dividir la fila ${k + 1} por ${pivot}`);

        for (var j = k; j < size + 1; j++) {
          a[k][j] /= pivot;
        }

        for (var i = 0; i < size; i++) {
          if (i !== k) {
            var factor = a[i][k];

            operaciones.push(`Paso ${k + 1}: Restar ${factor} veces la fila ${k + 1} de la fila ${i + 1}`);

            for (var j = k; j < size + 1; j++) {
              a[i][j] -= factor * a[k][j];
            }
          }
        }
      }

      mostrarOperaciones(operaciones);
      mostrarSoluciones();
      mostrarMatrizResultante();
    }

    function mostrarOperaciones(operaciones) {
      var operacionesDiv = document.getElementById("operacionesDiv");
      operacionesDiv.innerHTML = "";

      var header = document.createElement("h3");
      header.textContent = "Operaciones:";
      operacionesDiv.appendChild(header);

      var ul = document.createElement("ul");
      for (var i = 0; i < operaciones.length; i++) {
        var li = document.createElement("li");
        li.textContent = operaciones[i];
        ul.appendChild(li);
      }
      operacionesDiv.appendChild(ul);
    }

    function cambiarTamaño() {
      size = parseInt(document.getElementById("tamaño").value);
      generarCamposEcuacion();
    }

    function generarCamposEcuacion() {
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

      var operacionesDiv = document.getElementById("operacionesDiv");
      operacionesDiv.innerHTML = ""; // Limpiar las operaciones al cambiar el tamaño
    }

    function mostrarSoluciones() {
      for (var i = 0; i < size; i++) {
        document.getElementById("solucion_" + i).value = a[i][size].toFixed(2);
      }
    }

    function mostrarMatrizResultante() {
      var matrizResultanteDiv = document.getElementById("matrizResultanteDiv");
      matrizResultanteDiv.innerHTML = "";

      var header = document.createElement("h3");
      header.textContent = "Matriz Resultante:";
      matrizResultanteDiv.appendChild(header);

      var table = document.createElement("table");
      for (var i = 0; i < size; i++) {
        var row = document.createElement("tr");
        for (var j = 0; j < size + 1; j++) {
          var cell = document.createElement(i === j ? "th" : "td");
          cell.textContent = a[i][j].toFixed(2);
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
      matrizResultanteDiv.appendChild(table);
    }