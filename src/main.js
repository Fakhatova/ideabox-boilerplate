var userInputs = document.querySelectorAll('.user-input');
var starredIdeaBtn = document.querySelector('.starred-ideas-btn');
var saveIdeaBtn = document.querySelector('.save-idea-btn');
var ideaForm = document.querySelector('.user-idea-form')
var savedCardsGrid = document.querySelector('.saved-cards-grid')
var userCardTitle = document.getElementById('userCardTitle');
var userCardBody = document.getElementById('userCardBody');
// var deleteIdeaCard = document.querySelector('.delete-card-x');

ideaForm.addEventListener('keyup', checkUserInputs);
saveIdeaBtn.addEventListener('click', createNewIdea);
savedCardsGrid.addEventListener('click', deleteCard);

var savedIdeaCards = [];
saveIdeaBtn.disabled = true;

function checkUserInputs() {
  for (var i = 0; i < userInputs.length; i++) {
    if (userInputs[i].value === '') {
      saveIdeaBtn.disabled = true;
    } else {
      saveIdeaBtn.disabled = false;
    }
  }
}

function createNewIdea() {
  event.preventDefault();
  checkUserInputs();
  var newIdeaCard = new Idea(userCardTitle.value, userCardBody.value);
  savedIdeaCards.push(newIdeaCard);
  addCard();
  clearInputFields();
}


function addCard() {
  for (var i = 0; i < savedIdeaCards.length; i++) {
    savedCardsGrid.innerHTML += `
    <section class="saved-cards" id="${savedIdeaCards[i].id}">
      <div class='favorite-delete'>
        <img class='favorited-star' src="https://drive.google.com/uc?export=view&id=1TW-aKpR_uBW0Ayp6AtTqVq5cxuX27GiH" alt="favorite star">
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
}


function clearInputFields() {
  userCardTitle.value = "";
  userCardBody.value = "";
  saveIdeaBtn.disabled = true;
}


function deleteCard(event) {
  if (event.target.className === 'delete-card-x') {
    var cardId = event.target.closest('.saved-cards').id;
    console.log(event.target.closest('.saved-cards'));
    for (var i = 0; i < savedIdeaCards.length; i++) {
      if (savedIdeaCards[i].id === parseInt(cardId)) {
        savedIdeaCards.splice(i, 1);
      }
      event.target.closest('.saved-cards').remove();
    }
  }
}
