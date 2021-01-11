import Observer from "./observer.js"

export default class Films extends Observer {
   constructor() {
     super();
     this._comments = [];
   }


  setComments(comments) {
    this._comments = comments.slice();
  }

  getCmmentso() {
    return this._comments;
  }

 }
