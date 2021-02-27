var userInputs = document.querySelectorAll('.user-input');
var starredIdeaBtn = document.querySelector('.starred-ideas-btn');
var saveIdeaBtn = document.querySelector('.save-idea-btn');
var ideaForm = document.querySelector('.user-idea-form')
var savedCardsGrid = document.querySelector('.saved-cards-grid')
var userCardTitle = document.getElementById('userCardTitle');
var userCardBody = document.getElementById('userCardBody');
var starImageSrc = document.querySelector('.favorited-star');
// var deleteIdeaCard = document.querySelector('.delete-card-x');

ideaForm.addEventListener('keyup', checkUserInputs);
saveIdeaBtn.addEventListener('click', createNewIdea);
savedCardsGrid.addEventListener('click', handleIdeaCardClick); //one function that would figure out what was clicked and then send you on to another fx
// savedCardsGrid.addEventListener('click', changeStar);

var savedIdeaCards = [];
var whiteStar = "https://drive.google.com/uc?export=view&id=1TW-aKpR_uBW0Ayp6AtTqVq5cxuX27GiH";
var redStar = "https://drive.google.com/uc?export=view&id=13_jn9vQvAdNzdcbdRmYoR6mBOZHoeqzU";
saveIdeaBtn.disabled = true;

function checkUserInputs() {
  saveIdeaBtn.disabled = (userCardBody.value === '' || userCardTitle.value === '');
}

function createNewIdea() {
  event.preventDefault();
  checkUserInputs();
  var newIdeaCard = new Idea(userCardTitle.value, userCardBody.value);
  addCard(newIdeaCard);
  clearInputFields();
}

function addCard(card) {
  savedIdeaCards.push(card);
  renderIdeaCards();
}

function renderIdeaCards() {
  savedCardsGrid.innerHTML = '';
  var ideaCardHtml = '';
  for (var i = 0; i < savedIdeaCards.length; i++) {
    ideaCardHtml += `
      <section class="saved-cards" id="${savedIdeaCards[i].id}">
        <div class='favorite-delete'>
          <img class='favorited-star' src="${savedIdeaCards[i].star ? redStar: whiteStar}" alt="favorite star">
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
  }
  savedCardsGrid.innerHTML = ideaCardHtml; //went from updating the Dom card# times to once
}


function clearInputFields() {
  userCardTitle.value = "";
  userCardBody.value = "";
  saveIdeaBtn.disabled = true;
}


function handleIdeaCardClick(event) {
  if (event.target.className === 'delete-card-x') {
    deleteCard(event)
  }
  if (event.target.className === 'favorited-star') {
    toggleIsFavorite(event);
  }
}

function deleteCard(event) {
    var cardId = event.target.closest('.saved-cards').id;
    for (var i = 0; i < savedIdeaCards.length; i++) {
      if (savedIdeaCards[i].id === parseInt(cardId)) {
        savedIdeaCards.splice(i, 1);
      }
      event.target.closest('.saved-cards').remove();
    }
  }


function toggleIsFavorite(event) {
  var cardId = event.target.closest('.saved-cards').id;
  for (var i = 0; i < savedIdeaCards.length; i++) {
    if (savedIdeaCards[i].id === parseInt(cardId)) {
      // console.log(savedIdeaCards[i].star)
      savedIdeaCards[i].updateIdea();

    }
    renderIdeaCards();
  }
}
