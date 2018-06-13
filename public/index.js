var app = function(){

  const url = 'https://api.punkapi.com/v2/beers';
  makeRequest(url, requestComplete);
}

const makeRequest = function(url, requestComplete) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', requestComplete);
  request.send();
}

const requestComplete = function() {
  if (this.status !== 200) return;
  const beers = JSON.parse(this.response);
  console.log(beers);
  populateList(beers);
  populateDropdown(beers);
}

const populateList = function(beers) {
  beers.forEach(function(beer) {
    createListItem(beer);
  })
}

const createListItem = function(item) {
  const li = document.createElement('li');
  const ul = document.querySelector('#beer-list');
  li.textContent = item.name;
  li.appendChild(createImgTag(item))
  ul.appendChild(li);
}

const createImgTag = function(item) {
  const image = document.createElement('img');
  image.src = item.image_url;
  return image;
}

const populateDropdown = function(beers) {
  beers.forEach(function(beer) {
    createOptionTag(beer);
  });
  const dropdown = document.querySelector('#beerDropDown');
  dropdown.addEventListener('change', showBeer);
}

const createOptionTag = function(item) {
  const dropdown = document.querySelector('#beerDropDown');
  const option = document.createElement('option');
  option.textContent = item.name;
  const stringItem = JSON.stringify(item);
  option.value = stringItem;
  dropdown.appendChild(option);
}

const showBeer = function() {
  const ul = document.querySelector('#beer-list');
  ul.innerHTML = '';


  const selected = JSON.parse(document.querySelector('#beerDropDown').value);

  const h2 = document.createElement('h2');
  h2.textContent = selected.name;

  const section = document.querySelector('#beer');
  section.innerHTML = '';

  section.appendChild(h2);
}

window.addEventListener('load', app);
