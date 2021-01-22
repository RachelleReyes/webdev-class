onmessage = function (e) {
  let r = Number(e.data[0]) + Number(e.data[1]);
  console.log(r + ":" + e.data.length);

  if (isNaN(r)) {
    this.postMessage("Escriba dos numeros");
  } else {
    this.postMessage(r);
  }
};
