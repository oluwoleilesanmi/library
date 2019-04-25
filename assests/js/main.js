function Book(id, author, title, pages) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
}
Book.prototype.getAuthor = function () {
   return this.author;
}
Book.prototype.setAuthor = function(author) {
    this.author = author;
}
Book.prototype.getTitle = function() {
    return this.title;
}
Book.prototype.setTitle = function(title) {
    this.title = title;
}
Book.prototype.getPage = function() {
    return this.pages;
}
Book.prototype.setPage = function(pages) {
    this.pages = pages;
}
Book.prototype.getId = function() {
    return this.id;
}
Book.prototype.setId = function(id) {
    this.id = id;
}

var util = {
  uuid: function () {
    /* https://www.reddit.com/r/learnprogramming/
    comments/7ovgad/using_bitwise_to_generate_a_uuid/ */
    let i, random;
		let uuid = '';
		for (i = 0; i < 32; i++) {
      random = Math.random() * 16 | 0;
      if (i === 8 || i === 12 || i === 16 || i === 20) uuid += '-';
			uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
    }
    return uuid;
  },
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      let store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    }
  }
};

let App = {
  init: function () {
    this.books = util.store('books');
    this.bindOnDomClicked();
    this.bindOnDomLoaded();
    this.bindOnWindowLoaded(); 
  },    
  bindOnDomLoaded: function() {
    document.addEventListener("DOMContentLoaded", this.eventHelperOnLoad.bind(this))
  },
  bindOnDomClicked: function() {
    document.addEventListener("click", this.eventHelper.bind(this))
  },
  bindOnWindowLoaded: function () {
    window.onload = function(){
      document.querySelector(".button")
        .addEventListener("click", App.renderNewBook.bind(App));
    } 
  },
  eventHelperOnLoad: function() {
    let textInput = document.getElementsByClassName("input-text-input");
    Array.from(textInput).forEach(input => {
      if (input.value.length) {
        input.classList.add("has-value");
        input.classList.add("no-transition");
      }
    });
  },
  eventHelper: function() {
    let textInput = document.getElementsByClassName("input-text-input");
    Array.from(textInput).forEach(input => {
      if (input.value.length) {
        input.classList.add("has-value");
      } else {
        input.classList.remove("has-value");
        input.classList.remove("no-transition");
      }
    });
  },
  renderNewBook: function () {
    let book, title, author, pages, index = 0;
    book = new Book();
    title = document.getElementById('input-row-author').getElementsByClassName('input-text-input');
    author = document.getElementById('input-row-name').getElementsByClassName('input-text-input');
    pages = document.getElementById('input-row-pages').getElementsByClassName('input-text-input');
    book.setAuthor(author[index].value); book.setTitle(title[index].value); 
    book.setPage(pages[index].value); book.setId(util.uuid());
    this.books.push(book);
    this.render();
  },
  createBook: function(book) {
    let bookhtml = '' +
        '<li class="book" book-id="' + book.getId() + '">' +
          book.getAuthor() + book.getTitle()+ book.getPage() +
          '<button class="book-del">-</button>' +
        '</li>';
    return bookhtml;
  },
  findBook: function(e) {
    let thisbook,
        id = e.target.parentNode.getAttribute('book-id');
    this.books.forEach(function(book){
      if (book.getId() === id) {
        thisbook = book;
      }
    });
    return thisbook;
  },
  deleteBook: function(e) {
    let task = this.findBook(e),
        taskIndex = this.books.indexOf(task);
    this.books.splice(taskIndex, 1);
    this.render();
  },
  bindDelEvent: function(){
    if(document.getElementsByClassName("book-del")){
      let arrButtons = document.getElementsByClassName("book-del");
      Array.from(arrButtons).forEach(delButton => {
        delButton.addEventListener('click', App.deleteBook.bind(App));
      });
    }
  },
  render: function() {
    let htmlList = ' ';
    this.books.forEach(function(book) {
      htmlList += this.createBook(book);
    }, this);
    document.getElementById('book-list').innerHTML = htmlList;
    App.bindDelEvent(); 
  }   
};
App.init();

