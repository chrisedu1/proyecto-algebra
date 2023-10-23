var matriz1;
var matriz2;
var matrizRes;
var filaA;
var colA;
var filaB;
var colB;
var contador = 0;
//contador cuenta las veces que se accede, para que si no es la primera, se borren las capas creadas previamente.

//FUNCIONCES QUE DEBEMOS DEFINIR PARA CREAR LAS MATRICES
function CreaMatriz(n, m) {
	//DEFINIMOS EL TAMAÑO DE LA MATRIZ
	this.length = n;
	for (var i=0; i<n; i++) {
		this[i] = new Array(m);
	}
	return this;
}

function Multiplicar () {
	Inicializar ()
	for (i=0; i < filaA; i++){
		for (j=0; j < colB; j++){
			for (k=0; k < colA; k++){
				matrizRes[i][j] = matrizRes[i][j] + (matriz1[i][k] * matriz2[k][j]);
			}
		}
	}
}

function Mostrar () {
	Cargar ()
	
	var q = 0;
	
	for (i=0; i < matrizRes.length; i++){
		for (j=0; j < matrizRes.length; j++){
			document.matrizR.elements[q].value = matrizRes[i][j];
			matrizRes[i][j] = 0;
			q++;
		}
	}
}

//Esta función recoge los datos del formulario y los guarda en las matrices
function Cargar () {
	var q = 0;

	for (i=0; i<filaA; i++) {
		for (j=0; j<colA; j++) {
			matriz1[i][j] = parseInt(document.matrizA.elements[q].value);
			q++;
		}
	}
	
	q=0;
	for (i=0; i<filaB; i++) {
		for (j=0; j<colB; j++) {
			matriz2[i][j] = parseInt(document.matrizB.elements[q].value);
			q++;
		}
	}
	
	Multiplicar ()
}

//Comprueba que las dimensiones de las matrices son correctas para poder multiplicarlas
function Comprobar () {
	filaA = parseInt(document.dimA.elements[0].value);
	colA = parseInt(document.dimA.elements[1].value);
	filaB = parseInt(document.dimB.elements[0].value);
	colB = parseInt(document.dimB.elements[1].value);
		
	if (isNaN(filaA) || isNaN(colA) || isNaN(filaB) || isNaN(colB)) {
		alert("Valores no v\u00e1lidos.");
	}
	else if (colA != filaB) {
		alert("Dimensiones de las matrices no v\u00e1lidas.\nEl n\u00famero de columnas de A debe ser\nigual al n\u00famero de filas de B.");
	}
	else {
		if (contador > 0) {
			Borrar ()
		}
		matriz1 = new CreaMatriz(filaA, colA);
		matriz2 = new CreaMatriz(filaB, colB);
		CrearFormularios (filaA, colA, filaB, colB)
		matrizRes = new CreaMatriz(filaA, colB);
		CrearFormRes (filaA, colB)
		contador++
	}
}

function CrearFormularios (filA, colA, filB, colB) {
	var d = document.createElement("DIV");
	var fA = document.createElement("FORM");
	var fB = document.createElement("FORM");
	var A = document.createTextNode("Matriz A");
	var B = document.createTextNode("Matriz B");
	d.setAttribute("id", "matrices");
	d.setAttribute("align", "center");
	d.setAttribute("style", "width: 50%; height: 100%; float: left; background-color: 66FF66");
	fA.setAttribute("name", "matrizA");
	fB.setAttribute("name", "matrizB");

	d.className = "matriz-label";

	
	var boton = document.createElement("INPUT");
	boton.setAttribute("type", "button");
	boton.setAttribute("value", "CALCULAR");
	boton.setAttribute("name", "button");
	boton.onclick=function(){Mostrar();}
	
	for (i=0; i<filA; i++) {
		var salto = document.createElement("BR");
		for (j=0; j<colA; j++) {
			var casilla = document.createElement("INPUT");
			casilla.setAttribute("type","text");
			casilla.setAttribute("size","4");
			casilla.setAttribute("name","text");
			fA.appendChild(casilla);
		}
		fA.appendChild(salto);
	}
	for (i=0; i<filB; i++) {
		var salto = document.createElement("BR");
		for (j=0; j<colB; j++) {
			var casilla = document.createElement("INPUT");
			casilla.setAttribute("type","text");
			casilla.setAttribute("size","4");
			casilla.setAttribute("name","text");
			fB.appendChild(casilla);
		}
		fB.appendChild(salto);
	}
	var salto = document.createElement("BR");
	d.appendChild(salto);
	d.appendChild(A);
	d.appendChild(fA);
	d.appendChild(B);
	d.appendChild(fB);
	var salto = document.createElement("BR");
	d.appendChild(salto);
	d.appendChild(boton);
	
	var otro = document.getElementById("main");
	otro.appendChild(d);
}

function CrearFormRes (filaA, colB) {
	var capa = document.createElement("DIV");
	var fRes = document.createElement("FORM");
	var res = document.createTextNode("Matriz Resultante");
	capa.setAttribute("id", "resultado");
	capa.setAttribute("align", "center");
	capa.setAttribute("style", "width: 50%; height: 100%; float:right; background-color: 20B2AA");
	fRes.setAttribute("name", "matrizR");

	capa.className = "matriz-label";

	
	for (i=0; i<filaA; i++) {
		var salto = document.createElement("BR");
		for (j=0; j<colB; j++) {
			var casilla = document.createElement("INPUT");
			casilla.setAttribute("type","text");
			casilla.setAttribute("size","4");
			casilla.setAttribute("name","text");
			casilla.readOnly ="true";
			fRes.appendChild(casilla);
		}
		fRes.appendChild(salto);
	}
	
	var salto = document.createElement("BR");
	capa.appendChild(salto);
	capa.appendChild(res);
	capa.appendChild(fRes);
	
	var otro = document.getElementById("main");
	otro.appendChild(capa);
}

function Inicializar () {
	for (i=0; i < matrizRes.length; i++){
		for (j=0; j < matrizRes.length; j++){
			matrizRes[i][j] = 0;
		}
	}
}

function Borrar () {
	var capa1 = document.getElementById("matrices");
	var capa2 = document.getElementById("resultado");
	var padre1 = capa1.parentNode;
	var padre2 = capa2.parentNode;
	padre1.removeChild(capa1);
	padre2.removeChild(capa2);
}