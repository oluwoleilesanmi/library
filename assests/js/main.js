function Book(bookAuthor, bookTitle, bookPages, bookRead) {
  let author = bookAuthor;
  let title = bookTitle;
  let page = bookPages;
  let read = bookRead;
  this.getAuthor = function() {
    return author;
  };
  this.setAuthor = function(bookAuthor) {
    author = bookAuthor;
  };
  this.getTitle = function() {
    return title;
  };
  this.setTitle = function(bookTitle) {
    title = bookTitle;
  };
  this.getPage = function() {
    return page;
  };
  this.setPage = function(bookPages) {
    page = bookPages;
  };
  this.getRead = function() {
    return read;
  };
  this.setRead = function(bookRead) {
    read = bookRead;
  };
}

var util = {
  store: function(namespace, data) {
    if (arguments.length > 1) {
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    }
  },
  formHelperOnLoad: function() {
    document.addEventListener("DOMContentLoaded", function() {
      var input_text_input = document.getElementsByClassName("input-text-input");
      for (var i = 0; i < input_text_input.length; i++) {
        if (input_text_input[i].value.length) {
          input_text_input[i].classList.add("has-value");
          input_text_input[i].classList.add("no-transition");
        }
      }
    });
  },
  formHelper: function() {
    document.addEventListener("keyup", function() {
      var input_text_input = document.getElementsByClassName("input-text-input");
      for (var i = 0; i < input_text_input.length; i++) {
        if (input_text_input[i].value.length) {
          input_text_input[i].classList.add("has-value");
        } else {
          input_text_input[i].classList.remove("has-value");
          input_text_input[i].classList.remove("no-transition");
        }
      }
    });
  }
};

