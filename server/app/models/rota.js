const calcularDistancia = (pontoA, pontoB) => {
    // Cálculo da distância euclidiana
    return Math.sqrt(Math.pow(pontoB.coordenada_x - pontoA.coordenada_x, 2) + Math.pow(pontoB.coordenada_y - pontoA.coordenada_y, 2));
  };
  
const melhor_rota = (usuarios, callback) => {
  let rota = [];
  let visitados = new Set();
  let atual = {coordenada_x: 0, coordenada_y: 0}; // Partindo da empresa em (0, 0)

  while (visitados.size < usuarios.length) {
    let proximo = null;
    let menorDistancia = Infinity;

    for (let i = 0; i < usuarios.length; i++) {
      const usuario = usuarios[i];
      if (!visitados.has(usuario) && usuario !== atual) {
        const distancia = calcularDistancia(atual, usuario);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          proximo = usuario;
        }
      }
    }

    if (proximo) {
      rota.push(proximo);
      visitados.add(proximo);
      atual = proximo;
    }
  }

  // Voltando para a empresa no final da rota
  rota.push({nome: "empresa", coordenada_x: 0, coordenada_y: 0});

  callback(null, rota);
};

module.exports = {
  melhor_rota
};
  