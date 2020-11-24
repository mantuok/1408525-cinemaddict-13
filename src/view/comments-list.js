const renderComment = (film, commentsList) => {
  
  const commentsToRender = commentsList.filter(comment => film.comments.includes(comment.id));
  const commentElements = [];

  for (let comment of commentsToRender) {
    const commentElement = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${comment.emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
    commentElements.push(commentElement);
  }
  return commentElements.join(``);
}

export const createCommentsListTemplate = (film, commentsList) => {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>
  <ul class="film-details__comments-list">
  ${renderComment(film, commentsList)}
  </ul>`;
};
