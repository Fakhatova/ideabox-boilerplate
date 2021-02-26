var userInputTitle = document.querySelector('#userCardTitle');
var userInputBody = document.querySelector('#userCardBody');
var starredIdeaBtn = document.querySelector('.starred-ideas-btn');
var saveIdeaBtn = document.querySelector('.save-idea-btn');
var savedIdeaCards = [];

var savedCardsGrid = document.querySelector('.saved-cards-grid')



saveIdeaBtn.addEventListener('click', createNewIdea);
// starredIdeaBtn.addEventListener('click', )




function createNewIdea() {
  event.preventDefault();
  var newIdeaCard = new Idea(userInputTitle.value, userInputBody.value);
  addCard()
  return newIdeaCard;
}


function addCard() {
  savedCardsGrid.innerHTML += `
  <section class="saved-cards">
    <div class='favorite-delete'>
      <img class='favorited-star' src="https://drive.google.com/uc?export=view&id=1TW-aKpR_uBW0Ayp6AtTqVq5cxuX27GiH" alt="favorite star">
      <img class='delete-card-x' src="https://drive.google.com/uc?export=view&id=1DFdu572EVYb1SXhsXQ0XDqvfZ7prhJWg" alt="delete card x">
    </div>
    <article class='idea-title-body'>
      <p class='idea-card-title'>${userInputTitle.value}</p>
      <p class='idea-card-body'>${userInputBody.value}</p>
    </article>
    <div class='comment-bar'>
      <img class='add-comment' src="https://drive.google.com/uc?export=view&id=1xk4FryiJY3UgKdzYQhKdKPBe75ubWaYt" alt="add comment">
      <span>Comment</span>
    </div>
  </section>
  `
}