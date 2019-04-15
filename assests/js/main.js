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
      console.log("hello good people");
      return localStorage.setItem(namespace, JSON.stringify(data));
    } else {
      console.log("hello all");
      var store = localStorage.getItem(namespace);
      return (store && JSON.parse(store)) || [];
    }
  }
};
