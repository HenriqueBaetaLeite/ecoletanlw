
const populateUF = () => {
  const ufSelect = document.querySelector('select[name=uf]')
  
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(res => res.json())
    .then(states => {
      ufSelect.innerHTML += states
        .map(state => `<option value="${state.id}">${state.nome}</option>`)
    })
}

populateUF();


const getCities = (event) => {
  const citySelect = document.querySelector("select[name=city]");
  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
      }
      citySelect.disabled = false;
    })

}

document
  .querySelector("select[name=uf]")
  .addEventListener('change', getCities)
  