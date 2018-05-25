
function tiemposegundos(x) {
  return new Promise(resolve => {setTimeout(() => {
    resolve(x);
   }, 2000);
  });
}
async function operacion(x) {
  const a = await tiemposegundos(20);
  const b = await tiemposegundos(30);
  return x + a + b;
}

operacion(10).then(resultado => console.log(resultado))
             .catch(error => console.log("error" ));