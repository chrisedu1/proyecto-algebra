
    // Función para crear y mostrar una matriz HTML
    function createMatrix() {
        var rows = parseInt(document.getElementById("rows").value);
        var cols = parseInt(document.getElementById("cols").value);

        var matrixDiv = document.getElementById("matrixDiv");
        matrixDiv.innerHTML = "";

        var table = document.createElement("table");

        for (var i = 0; i < rows; i++) {
            var row = document.createElement("tr");

            for (var j = 0; j < cols; j++) {
                var cell = document.createElement("td");
                var input = document.createElement("input");
                input.type = "number";
                cell.appendChild(input);
                row.appendChild(cell);
            }

            table.appendChild(row);
        }

        matrixDiv.appendChild(table);

        var resultDiv = document.getElementById("resultDiv");
        resultDiv.innerHTML = "";

        var calculateButton = document.createElement("button");
        calculateButton.textContent = "Calcular Inversa";
      
        calculateButton.onclick = function() {
            var matrix = [];
            var rows = table.rows;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var rowData = [];
                for (var j = 0; j < row.cells.length; j++) {
                    rowData.push(parseFloat(row.cells[j].querySelector("input").value));
                } 
                matrix.push(rowData);
            }

            var inverse;
            if (matrix.length === 2 && matrix[0].length === 2) {
                inverse = calculateInverse2x2(matrix);
            } else if (matrix.length === 3 && matrix[0].length === 3) {
                inverse = calculateInverse3x3(matrix);
            } else {
                inverse = "La matriz no tiene inversa (determinante igual a 0).";
            }

            resultDiv.innerHTML = "Matriz Inversa:<br>";
            resultDiv.innerHTML += inverse.replace(/&nbsp;/g, ' ');
        }; 

        resultDiv.appendChild(calculateButton);
    }

    // Resto del código JavaScript (funciones calculateInverse2x2, calculateInverse3x3, matrixToString)

// Función para calcular la matriz inversa de una matriz 2x2
function calculateInverse2x2(matrix) {
    var determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    if (determinant === 0) {
        return "La matriz no tiene inversa (determinante igual a 0).";
    }

    var inverseMatrix = [
        [matrix[1][1] / determinant, -matrix[0][1] / determinant],
        [-matrix[1][0] / determinant, matrix[0][0] / determinant]
    ];

    return matrixToString(inverseMatrix);
}

// Función para calcular la matriz inversa de una matriz 3x3
function calculateInverse3x3(matrix) {
    var determinant = 0;

    // Calcula el determinante de la matriz 3x3 utilizando la regla de Sarrus
    determinant = matrix[0][0] * matrix[1][1] * matrix[2][2] +
        matrix[0][1] * matrix[1][2] * matrix[2][0] +
        matrix[0][2] * matrix[1][0] * matrix[2][1] -
        matrix[0][2] * matrix[1][1] * matrix[2][0] -
        matrix[0][1] * matrix[1][0] * matrix[2][2] -
        matrix[0][0] * matrix[1][2] * matrix[2][1];

    if (determinant === 0) {
        return "La matriz no tiene inversa (determinante igual a 0).";
    }

    var inverseMatrix = [
        [
            (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) / determinant,
            (matrix[0][2] * matrix[2][1] - matrix[0][1] * matrix[2][2]) / determinant,
            (matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) / determinant
        ],
        [
            (matrix[1][2] * matrix[2][0] - matrix[1][0] * matrix[2][2]) / determinant,
            (matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) / determinant,
            (matrix[0][2] * matrix[1][0] - matrix[0][0] * matrix[1][2]) / determinant
        ],
        [
            (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) / determinant,
            (matrix[0][1] * matrix[2][0] - matrix[0][0] * matrix[2][1]) / determinant,
            (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) / determinant
        ]
    ];

    return matrixToString(inverseMatrix);
}


// Función para convertir una matriz 2D en una cadena de texto ordenada por filas y columnas
function matrixToString(matrix) {
    var result = "";
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            result += matrix[i][j].toFixed(2) + " ";
        }
        result += "<br>";
    }
    return result;
}