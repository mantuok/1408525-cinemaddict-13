import SmartView from "./smart.js";
import he from "he";

const Emoji = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const EMPTY_COMMENT = {
  text: ``,
  emotion: ``
};

const createEmojiItemTemplate = (emoji, isChecked, isInProcess) => {
  return `<input class="film-details__emoji-item visually-hidden"
      name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}"
      ${isChecked ? ` checked` : ``}
      ${isInProcess ? ` disabled` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`;
};

const createNewCommentTemplate = (message) => {
  // const {emotion, text, isDisabled, isSaving} = message;
  const {emotion, text, isInProcess} = message;

  const isChecked = (emoji) => emoji === emotion;

  const setEmotionTemplate = () =>
    emotion !== null ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`
      : ``;

  return `<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">
    ${setEmotionTemplate()}
  </div>
  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input"
    placeholder="Select reaction below and write comment here" name="comment"${isInProcess ? ` disabled` : ``}>${isInProcess ? `Saving...` : he.encode(text)}</textarea>
  </label>
  <div class="film-details__emoji-list">
  ${createEmojiItemTemplate(Emoji.SMILE, isChecked(Emoji.SMILE), isInProcess)}
  ${createEmojiItemTemplate(Emoji.SLEEPING, isChecked(Emoji.SLEEPING), isInProcess)}
  ${createEmojiItemTemplate(Emoji.PUKE, isChecked(Emoji.PUKE), isInProcess)}
  ${createEmojiItemTemplate(Emoji.ANGRY, isChecked(Emoji.ANGRY), isInProcess)}
  </div>
</div>`;
};

export default class NewComment extends SmartView {
  constructor() {
    super();

    this._data = {
      emotion: null,
      text: ``,
      scroll: 0,
      isInProcess: false
      // isDisabled: false,
      // isSaving: false
    };

    this._newComment = EMPTY_COMMENT;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setScrollValue = this._setScrollValue.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createNewCommentTemplate(this._data);
  }

  get() {
    return this._newComment;
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setScrollValue();
  }

  _setScrollValue() {
    this.getElement()
        .querySelector(`.film-details__comment-input`)
        .scrollTop = this._data.scroll;
  }

  _setInnerHandlers() {
    this.getElement()
        .querySelectorAll(`.film-details__emoji-item`)
        .forEach((element) => element.addEventListener(`click`, this._emojiClickHandler));
    this.getElement()
        .querySelector(`.film-details__comment-input`)
        .addEventListener(`input`, this._commentInputHandler);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();

    this.updateData({
      emotion: evt.target.value
    }, false);

    this._newComment = Object.assign(
        {},
        this._newComment,
        {
          emotion: evt.target.value
        }
    );
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value,
      scroll: evt.target.scrollTop
    }, true);

    this._newComment = Object.assign(
        {},
        this._newComment,
        {
          text: evt.target.value,
          date: new Date()
        }
    );
  }
}
