export default async function buscaCep(cep) {
    let retorno = [];
    await fetch(
      `https://viacep.com.br/ws/${cep}/json/`,
    )
      .then((value) => value.json())
      .then((dados) => {
        retorno = dados;
      })
      .catch((erro) => {
        console.log(erro);
      });
    return retorno;
  }