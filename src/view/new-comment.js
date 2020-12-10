import AbstractView from "./abstract.js";

const Emoji = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const createEmojiItemTemplate = (emoji) => {
  return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`;
};

const createNewCommentTemplate = () => {
  return `<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label"></div>
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
  </label>
  <div class="film-details__emoji-list">
  ${createEmojiItemTemplate(Emoji.SMILE)}
  ${createEmojiItemTemplate(Emoji.SLEEPING)}
  ${createEmojiItemTemplate(Emoji.PUKE)}
  ${createEmojiItemTemplate(Emoji.ANGRY)}
  </div>
</div>`;
};

export default class NewComment extends AbstractView {
  getTemplate() {
    return createNewCommentTemplate();
  }
}
