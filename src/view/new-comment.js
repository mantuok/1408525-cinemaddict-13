import SmartView from "./smart.js";

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

const createNewCommentTemplate = (message) => {
  const {emotion, text} = message;

  const setEmotionTemplate = () =>
    emotion !== null ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`
    : ``;

  return `<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">
    ${setEmotionTemplate()}
  </div>
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
  </label>
  <div class="film-details__emoji-list">
  ${createEmojiItemTemplate(Emoji.SMILE)}
  ${createEmojiItemTemplate(Emoji.SLEEPING)}
  ${createEmojiItemTemplate(Emoji.PUKE)}
  ${createEmojiItemTemplate(Emoji.ANGRY)}
  </div>
</div>`;
};

export default class NewComment extends SmartView {
  constructor() {
    super();

    this._data = {
      emotion: null,
      text: ``,
      scroll: 0
    }

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setScrollValue = this._setScrollValue.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  restoreState() {
    this._setScrollValue();
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value
    }, false)
  };

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value,
      scroll: evt.target.scrollTop
    }, true)
  }

  _setInnerHandlers() {
    this.getElement()
        .querySelectorAll(`.film-details__emoji-item`)
        .forEach(element => element.addEventListener(`click`, this._emojiClickHandler));
    this.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`input`, this._commentInputHandler)
  }

  _setScrollValue() {
    this.getElement()
        .querySelector(`.film-details__comment-input`)
        .scrollTop = this._data.scroll;
  }
}
