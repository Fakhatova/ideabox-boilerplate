class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage(card) {
    savedIdeaCards.push(card);
    var cardId = card.id;
    localStorage.setItem(cardId, JSON.stringify(card));
  }
  deleteFromStorage(cardId) {
    for (var i = 0; i < localStorage.length; i++) {
      var id = JSON.parse(localStorage.key(i));
      console.log(id);

      if (cardId === id) {
        localStorage.removeItem(id)
      }
    }

  }

  updateIdea() {
    this.star = !this.star;
  }
}