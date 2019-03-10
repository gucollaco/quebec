$(document).ready(function(){

})

var SCORE = (() => {
  // recebe uma lista de criterios (cada criterio com NOTAS (direto do banco) e RESULTADO (o valor do criterio pelo colaborador))
  function evaluate(criterios){
    for(let criterio of criterios){
      let modelo = criterio.notas
      let resultado = criterio.resultado

      /*
        #1
        modelo: {
          peso: 1,
          modelo: {
            tipo: discreto,
            valor: [0, 5]
          }
        }
        resultado: 3

        #2
        modelo: {
          peso: 2,
          lista: [{
            texto: Danificada,
            valor: -1
          }, {...}, ...]
        }
        resultado: [0, 3]
      */

      let normal;
      if(modelo.intervalo){
        normal = (resultado - modelo.valor[0])/(modelo.valor[1] - modelo.valor[0])
      }else if(modelo.boleano){
        normal = +(resultado == modelo.valor) * modelo.peso
      }else if(modelo.lista){
        let soma = modelo.lista.filter((v, i) => i in resultado).reduce((acc, cur) => acc + cur.valor, 0)
        let lista_ordenada = modelo.lista.sort((a, b) => a.valor - b.valor)
        let len_lista = modelo.lista.length

        let minimo = lista_ordenada[0].valor + lista_ordenada[1].valor
        let maximo = lista_ordenada[len_lista-1].valor + lista_ordenada[len_lista-2].valor

        normal = (soma - minimo) / (maximo - minimo)
      }

      criterio.normal = normal
      criterio.normal_ponderada = normal * modelo.peso     
    }

    let peso_total = criterios.reduce((acc, cur) => acc + cur.modelo.peso, 0)
    let nota_normal_ponderada_total = criterios.reduce((acc, cur), acc + cur.normal_ponderada, 0)

    let nota_final = nota_normal_ponderada_total / peso_total

    return {
      final: nota_final,
      criterios: criterios.map(c => {
        return {
          resultado: c.resultado,
          normal: c.normal,
          peso: c.modelo.peso,
          ponderada: c.ponderada
        }
      })
    }
  }

  return {evaluate}
})()