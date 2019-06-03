function Book(author, title, pages, status) {
  this.status = status;
  this.author = author;
  this.title = title;
  this.pages = pages;
}
Book.prototype.getAuthor = function() { return this.author;};
Book.prototype.getStatus = function() { return this.status;};
Book.prototype.getTitle = function() { return this.title;};
Book.prototype.getPage = function() { return this.pages;};

const util = {
  store: function() {
    return [];
  },

  validateInputs: function(author, title, pages) {
    const message = "Can't be Empty";
    pages === ""  ? this.validationdisplay(message, "pages") : this.validationdisplay("", "pages");
    author === "" ? this.validationdisplay(message, "author") : this.validationdisplay("", "author");
    title === ""  ? this.validationdisplay(message, "title") : this.validationdisplay("", "title");
  },

  validationdisplay: function(message, inputType) {
    if (inputType === "author")
      document.getElementById("author-splash").innerHTML = message;
    if (inputType === "title")
      document.getElementById("title-splash").innerHTML = message;
    if (inputType === "pages")
      document.getElementById("pages-splash").innerHTML = message;
  }
};

const App = {
  init: function() {
    this.books = util.store();
    this.bindOnDomLoaded();
    this.bindOnWindowLoaded();
  },

  renderNewBook: function() {
    const index = 0;
    if (this.title[index].value === "" || this.author[index].value === "" || this.pages[index].value === "") {
      util.validateInputs( this.title[index].value, this.author[index].value, this.pages[index].value);
      return;
    } else {
      util.validateInputs( this.title[index].value, this.author[index].value, this.pages[index].value);
    }
    this.addBookToLibrary(this.title, this.author, this.pages, this.status);
    this.render();
    this.reset();
  },

  deleteRow: function(row) {
    let index = row.parentNode.parentNode.rowIndex;
    this.deleteBook(index);
    document.getElementById("book-list").deleteRow(index);
  },

  getSelectedOption: function(select) {
    let option;
    for (let i = 0; i < select.options.length; i++) {
      option = select.options[i];
      if (option.selected === true) {
        break;
      }
    }
    return option;
  },

  addBookToLibrary: function(title, author, pages, status) {
    let index = 0, value = this.getSelectedOption(status[index]).value,
        book = new Book( title[index].value, author[index].value, pages[index].value, value);
    this.books.push(book);
  },

  deleteBook: function(index) {
    let bookIndex = index - 1;
    this.books.splice(bookIndex, 1);
  },

  render: function() {
    let htmlList = null;
    this.books.forEach(function(book) {
      htmlList = this.createBook(book);
    }, this);
    document.getElementById("book-list").appendChild(htmlList);
  },

  reset: function() {
    const index = 0;
    document
      .getElementById("input-row-author")
      .getElementsByClassName("input-text-input")[index].value = "";
    document
      .getElementById("input-row-name")
      .getElementsByClassName("input-text-input")[index].value = "";
    document
      .getElementById("input-row-pages")
      .getElementsByClassName("input-text-input")[index].value = "";
  },

  bindOnWindowLoaded: function() {
    window.onload = function() {
      document
        .querySelector(".button")
        .addEventListener("click", App.renderNewBook.bind(App));
      App.title = document
        .getElementById("input-row-author")
        .getElementsByClassName("input-text-input");
      App.author = document
        .getElementById("input-row-name")
        .getElementsByClassName("input-text-input");
      App.pages = document
        .getElementById("input-row-pages")
        .getElementsByClassName("input-text-input");
      App.status = document
        .getElementById("input-row-status")
        .getElementsByClassName("input-text-input");
    };
  },

  bindOnDomLoaded: function() {
    document.addEventListener("DOMContentLoaded", function() {
      let textInput = this.getElementsByClassName("input-text-input");
      Array.from(textInput).forEach(input => {
        if (input.value.length) {
          input.classList.add("has-value");
        } else {
          input.classList.remove("has-value");
          input.classList.remove("no-transition");
        }
      });

      this.addEventListener("keyup", function() {
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

  createBook: function(book) {
    const row = document.createElement("tr");

    const firsttd = document.createElement("td");
    firsttd.innerText = book.getAuthor();
    const secondtd = document.createElement("td");
    secondtd.innerText = book.getTitle();
    const thirdtd = document.createElement("td");
    thirdtd.innerText = book.getPage();
    const fourthtd = document.createElement("td");
    const fifthtd = document.createElement("td");

    const firstoption = document.createElement("option");
    firstoption.innerText = "Read";
    const secondoption = document.createElement("option");
    secondoption.innerText = "Unread";
      
    const sel = document.createElement("select");

    const btn = document.createElement("button");
    btn.innerText = "Delete Book!";
    btn.setAttribute("onclick", "App.deleteRow(this)");

    sel.appendChild(firstoption);
    sel.appendChild(secondoption);
    fifthtd.appendChild(btn);
    fourthtd.appendChild(sel);

    row.appendChild(firsttd);
    row.appendChild(secondtd);
    row.appendChild(thirdtd);
    row.appendChild(fourthtd);
    row.appendChild(fifthtd);

    sel.options[book.getStatus()].selected = true;
    return row;
  }
};

App.init();
