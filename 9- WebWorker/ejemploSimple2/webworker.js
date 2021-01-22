self.onmessage = function (e) {
  var num = Number(e.data);
  this.Fibonacci(num);
};

function Fibonacci(numero) {
  var a = 1,
    b = 0,
    temp;
  while (numero >= 0) {
    temp = a;
    a = a + b;
    b = temp;
    numero--;
  }
  self.postMessage(b);
}
