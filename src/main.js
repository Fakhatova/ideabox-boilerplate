// var userInputs = document.querySelectorAll('.user-input');
var showStarredIdeaBtn = document.querySelector('.starred-ideas-btn');
var saveIdeaBtn = document.querySelector('.save-idea-btn');
var ideaForm = document.querySelector('.user-idea-form')
var savedCardsGrid = document.querySelector('.saved-cards-grid')
var cardTitleInput = document.getElementById('userCardTitle');
var cardBodyInput = document.getElementById('userCardBody');
var searchBarInput = document.querySelector('.search-cards');

window.addEventListener('load', renderLocalStorageCards)
ideaForm.addEventListener('keyup', saveBtnStatus);
saveIdeaBtn.addEventListener('click', createNewIdea);
savedCardsGrid.addEventListener('click', targetCardClick); //one function that would figure out what was clicked and then send you on to another fx
showStarredIdeaBtn.addEventListener('click', showStarredIdeas);

searchBarInput.addEventListener('keyup', searchIdeas);

var savedIdeaCards = [];
var filteredIdeaCards = [];
var whiteStarSrc = "https://drive.google.com/uc?export=view&id=1TW-aKpR_uBW0Ayp6AtTqVq5cxuX27GiH";
var redStarSrc = "https://drive.google.com/uc?export=view&id=13_jn9vQvAdNzdcbdRmYoR6mBOZHoeqzU";
saveIdeaBtn.disabled = true;
var startStar = false;

function saveBtnStatus() {
  saveIdeaBtn.disabled = (cardBodyInput.value === '' || cardTitleInput.value === '');
}

function createNewIdea() {
  event.preventDefault();
  saveBtnStatus();
  var newIdeaCard = new Idea(Date.now(), cardTitleInput.value, cardBodyInput.value, startStar);
  newIdeaCard.saveToStorage(newIdeaCard);
  renderIdeaCards();
  clearInputFields();
}


function renderIdeaCards() {
  // savedCardsGrid.innerHTML = '';
  var ideaCardHtml = '';
  for (var i = 0; i < savedIdeaCards.length; i++) {
    ideaCardHtml += `
      <section class="saved-cards" id="${savedIdeaCards[i].id}">
        <div class='favorite-delete'>
          <img class='favorited-star' src="${savedIdeaCards[i].star ? redStarSrc: whiteStarSrc}" alt="favorite star">
          <img class='delete-card-x' src="https://drive.google.com/uc?export=view&id=1DFdu572EVYb1SXhsXQ0XDqvfZ7prhJWg" alt="delete card x">
          </div>
          <article class='idea-title-body'>
            <p class='idea-card-title'>${savedIdeaCards[i].title}</p>
            <p class='idea-card-body'>${savedIdeaCards[i].body}</p>
          </article>
        <div class='comment-bar'>
          <img class='add-comment' src="https://drive.google.com/uc?export=view&id=1xk4FryiJY3UgKdzYQhKdKPBe75ubWaYt" alt="add comment">
          <span>Comment</span>
        </div>
      </section>
    `
    savedCardsGrid.innerHTML = ideaCardHtml;
  } //went from updating the Dom card# times to once
}
//

function clearInputFields() {
  cardTitleInput.value = "";
  cardBodyInput.value = "";
  saveIdeaBtn.disabled = true;
}


function targetCardClick(event) {
  var cardEl = event.target.closest('.saved-cards'); //get the idea card element (so this will be null if id card is not clicked on)
  var cardId = cardEl && parseInt(cardEl.id); //if element exists, then access the id key, the right side is only executed if left is true
  if (event.target.className === 'delete-card-x') {
    deleteCard(cardId)
  }
  if (event.target.className === 'favorited-star') {
    toggleIsFavorite(cardId);
  }
}

function deleteCard(cardId) { //can for loop be refactored to be DRY?
  for (var i = 0; i < savedIdeaCards.length; i++) {
    if (savedIdeaCards[i].id === cardId) {
      savedIdeaCards[i].deleteFromStorage(cardId);
      savedIdeaCards.splice(i, 1);
    }
    event.target.closest('.saved-cards').remove();
  }
}



function toggleIsFavorite(cardId) {
  for (var i = 0; i < savedIdeaCards.length; i++) {
    if (savedIdeaCards[i].id === cardId) {
      // savedIdeaCards[i].updateIdea();
      savedIdeaCards[i].updateIdea(savedIdeaCards[i]);
      //use this ID to find the correct key in local storage, reassign the value with the new info
    }
  }
  renderIdeaCards();
}

function renderLocalStorageCards() {
  var ideaCardHtml = '';
  for (var i = 0; i < localStorage.length; i++) {
    var id = localStorage.key(i);
    var item = JSON.parse(localStorage.getItem(id));
    var newIdeaCard = new Idea(item.id, item.title, item.body, item.star)
    savedIdeaCards.push(newIdeaCard);
  }
  renderIdeaCards();
}


function showStarredIdeas() {
  if (showStarredIdeaBtn.innerText === "Show Starred Ideas") {
    var ideaCardHtml = '';
    for (var i = 0; i < savedIdeaCards.length; i++)  {
      if (savedIdeaCards[i].star) {
        ideaCardHtml += `
          <section class="saved-cards" id="${savedIdeaCards[i].id}">
            <div class='favorite-delete'>
              <img class='favorited-star' src="${savedIdeaCards[i].star ? redStarSrc: whiteStarSrc}" alt="favorite star">
              <img class='delete-card-x' src="https://drive.google.com/uc?export=view&id=1DFdu572EVYb1SXhsXQ0XDqvfZ7prhJWg" alt="delete card x">
              </div>
              <article class='idea-title-body'>
                <p class='idea-card-title'>${savedIdeaCards[i].title}</p>
                <p class='idea-card-body'>${savedIdeaCards[i].body}</p>
              </article>
            <div class='comment-bar'>
              <img class='add-comment' src="https://drive.google.com/uc?export=view&id=1xk4FryiJY3UgKdzYQhKdKPBe75ubWaYt" alt="add comment">
              <span>Comment</span>
            </div>
          </section>
        `
        savedCardsGrid.innerHTML = ideaCardHtml;
      }
    }
  } else {
    renderIdeaCards()
  }
  toggleStarredIdeasBtn();
}


function toggleStarredIdeasBtn() {
  // showStarredIdeaBtn.innerText = "Show Starred Ideas" ? "Show All Ideas" : "Show Starred Ideas";
  if (showStarredIdeaBtn.innerText === "Show Starred Ideas") {
    showStarredIdeaBtn.innerText = "Show All Ideas";
  } else {
    showStarredIdeaBtn.innerText = "Show Starred Ideas"
  }
}

function searchIdeas(e) {
  var searchString = e.target.value.toLowerCase();
  var filteredIdeas = savedIdeaCards.filter(idea =>
    idea.title.toLowerCase().includes(searchString) || idea.body.toLowerCase().includes(searchString)
  );
  var ideaCardHtml = '';
  for (var i = 0; i < filteredIdeas.length; i++)  {
    ideaCardHtml += `
      <section class="saved-cards" id="${filteredIdeas[i].id}">
        <div class='favorite-delete'>
          <img class='favorited-star' src="${filteredIdeas[i].star ? redStarSrc: whiteStarSrc}" alt="favorite star">
          <img class='delete-card-x' src="https://drive.google.com/uc?export=view&id=1DFdu572EVYb1SXhsXQ0XDqvfZ7prhJWg" alt="delete card x">
          </div>
          <article class='idea-title-body'>
            <p class='idea-card-title'>${filteredIdeas[i].title}</p>
            <p class='idea-card-body'>${filteredIdeas[i].body}</p>
          </article>
        <div class='comment-bar'>
          <img class='add-comment' src="https://drive.google.com/uc?export=view&id=1xk4FryiJY3UgKdzYQhKdKPBe75ubWaYt" alt="add comment">
          <span>Comment</span>
        </div>
      </section>
    `
    savedCardsGrid.innerHTML = ideaCardHtml;
  }
}
