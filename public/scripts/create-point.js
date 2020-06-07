
const populateUF = () => {
  const ufSelect = document.querySelector('select[name=uf]')
  
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
    .then(res => res.json())
    .then(states => {
      ufSelect.innerHTML += states
        .map(state => `<option value="${state.id}">${state.nome}</option>`)
    })
}

populateUF();


const getCities = (event) => {
  const citySelect = document.querySelector("select[name=city]");

  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;
  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then(res => res.json())
    .then(cities => {
      for(const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    })
};

document
  .querySelector("select[name=uf]")
  .addEventListener('change', getCities)


  // items de coleta

const collectedItems = document.querySelector('input[name=items');

let selectedItems = [];

const handleSelectedItem = (event) => {
  const itemLi = event.target;
   // adicionar ou remover classes

  itemLi.classList.toggle('selected')
    
  const itemId = itemLi.dataset.id;

  // verificar se eistem ites selecionados, se sim
  // pegar os items selecionados

  const alreadySelected = selectedItems
    .findIndex((item) => item === itemId);  // retorna true ou false, parecido com o find

  // se já estiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    })
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
}

// atualizar o campo escondido com os items selecionados


  

const itemsToCollect = document.querySelectorAll('.items-grid li');
  for (let item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}