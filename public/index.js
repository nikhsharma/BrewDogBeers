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
  image.height = '200';
  return image;
}

window.addEventListener('load', app);
