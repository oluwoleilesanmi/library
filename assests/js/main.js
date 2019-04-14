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
