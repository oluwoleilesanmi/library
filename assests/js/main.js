function Book(bookAuthor, bookTitle, bookPages) {
  let id = 0;
  let author = bookAuthor;
  let title = bookTitle;
  let page = bookPages;
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
  this.getId = function() {
    return id;
  };
  this.setId = function(bookid) {
    id = bookid;
  };
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

