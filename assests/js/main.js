function Book(id, author, title, pages, read) {
  this.id = id;
  this.read = read;
  this.author = author;
  this.title = title;
  this.pages = pages;
}
Book.prototype.getAuthor = function () {
   return this.author;
}
Book.prototype.getRead = function () {
   return this.read;
}
Book.prototype.setRead = function (bol) {
   return this.read = bol;
}
Book.prototype.getTitle = function() {
    return this.title;
}
Book.prototype.getPage = function() {
    return this.pages;
}
Book.prototype.getId = function() {
    return this.id;
}

let util = {
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
  },
  
  validateInputs: function(author, title, pages) {
   const message = "Can't be Empty";
   (pages =='') ? 
     util.validationdisplay(message, 'pages') : this.validationdisplay('', 'pages');
   (author =='') ? 
     util.validationdisplay(message, 'author') : this.validationdisplay('', 'author');
   (title =='') ? 
     util.validationdisplay(message, 'title') : this.validationdisplay('', 'title');
  },
  
  validationdisplay: function(message, inputType){
    if (inputType === 'author') 
      document.getElementById('author-splash').innerHTML = message
    if (inputType === 'title') 
      document.getElementById('title-splash').innerHTML = message
    if (inputType === 'pages') 
      document.getElementById('pages-splash').innerHTML = message
  }
};

let App = {
  init: function () {
    this.books = util.store('books');
    this.bindOnDomLoaded();
    this.bindOnWindowLoaded(); 
  },
  
  renderNewBook: function () {
    let index = 0;
    if(this.title[index].value === '' || this.author[index].value === '' || this.pages[index].value === ''){
      util.validateInputs(
        this.title[index].value, this.author[index].value, this.pages[index].value);
      return;
    }else {
      util.validateInputs(
        this.title[index].value, this.author[index].value, this.pages[index].value);
    }
    this.addBookToLibrary(util.uuid(), this.title, this.author, this.pages);
    this.render();
    this.reset()
	},
  
  addBookToLibrary: function(id, title, author, pages){
    let index = 0,
        book = new Book(
            id, title[index].value, author[index].value, pages[index].value, false);
    this.books.push(book);
  },
  
  createBook: function(book) {
    var isChecked = '';
    if (book.getRead()) isChecked = 'checked';
    let bookhtml = '' +
        '<li class="book" book-id="' + book.getId() + '">' 
          + '<input class="toggler" type="checkbox" ' + isChecked + ' />'+
          book.getTitle() + '<br/>' + book.getAuthor() + ',' 
          +" "+book.getPage()+' '+'Pages' +
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
    let book = this.findBook(e),
        bookIndex = this.books.indexOf(book);
    this.books.splice(bookIndex, 1);
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
    
  bindReadEvent: function(){
    if(document.getElementsByClassName("toggler")){
      let arrButtons = document.getElementsByClassName("toggler");
      Array.from(arrButtons).forEach(readButton => {
        readButton.addEventListener('click', App.toggleRead.bind(App));
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
    App.bindReadEvent();
  },
  
  reset: function(){
    const index = 0;
    document.getElementById('input-row-author')
      .getElementsByClassName('input-text-input')[index].value = '';
    document.getElementById('input-row-name')
      .getElementsByClassName('input-text-input')[index].value = '';
    document.getElementById('input-row-pages')
      .getElementsByClassName('input-text-input')[index].value= '';  
    this.render()
  },
  
  bindOnWindowLoaded: function (){
    window.onload = function(){
      document.querySelector(".button")
        .addEventListener("click", App.renderNewBook.bind(App));
      App.title = document.getElementById('input-row-author')
        .getElementsByClassName('input-text-input');
      App.author = document.getElementById('input-row-name')
        .getElementsByClassName('input-text-input');
      App.pages = document.getElementById('input-row-pages')
        .getElementsByClassName('input-text-input');  
    } 
  },
  
  bindOnDomLoaded: function() {
    document.addEventListener("DOMContentLoaded",function(){
      let textInput = this.getElementsByClassName("input-text-input");
      Array.from(textInput).forEach(input => {
        if (input.value.length) {
          input.classList.add("has-value");
        } else {
          input.classList.remove("has-value");
          input.classList.remove("no-transition");
        }
      });
      
      this.addEventListener("keyup", function(){
        Array.from(textInput).forEach(input => {
          if (input.value.length) {
            input.classList.add("has-value");
          } else {
            input.classList.remove("has-value");
            input.classList.remove("no-transition");
          }
        });
      });
    }); 
  },
  
  toggleRead: function(el){
    let book = this.findBook(el);
    let bol = book.getRead() 
    book.setRead(!bol);
  }
};

App.init();
