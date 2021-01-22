onmessage = function (e) {
  if (e.data[0][0].length == e.data[1].length) {
    multiplicarMatrices(e.data[0], e.data[1]);
  } else {
    this.postMessage("No se puede multiplicar");
  }
};

function multiplicarMatrices(mat1, mat2) {
  var resul = [];
  for (var i = 0; i < mat1.length; i++) {
    resul[i] = [];
    for (var j = 0; j < mat2[0].length; j++) {
      var suma = 0;
      for (var k = 0; k < mat1[0].length; k++) {
        suma += mat1[i][k] * mat2[k][j];
      }
      resul[i][j] = suma;
    }
  }
  this.postMessage(resul);
}
