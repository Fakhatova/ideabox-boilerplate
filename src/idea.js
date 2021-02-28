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
      if (cardId === id) {
        localStorage.removeItem(id)
      }
    }
  }

  updateIdea(instance) {
    this.star = !this.star;
    for (var i = 0; i < localStorage.length; i++) {
      var id = localStorage.key(i);
      var item = JSON.parse(localStorage.getItem(id));
      if (parseInt(id) === instance.id) {
        console.log(item);
        console.log(instance);
        item.star = this.star
        localStorage.setItem(id, JSON.stringify(instance));
      }
    }
  }
}