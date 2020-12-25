import Abstract from "../view/abstract";

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const render = (container, child, position = Position.BEFOREEND) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }
  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (position) {
    case Position.AFTERBEGIN:
      container.prepend(child);
      break;
    case Position.BEFOREEND:
      container.append(child);
      break;
    default:
      throw new Error(`Unknown render position ${position}`);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof Abstract) {
    oldChild = oldChild.getElement();
  }
  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }

  if (oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting element`);
  }

  oldChild.replaceWith(newChild);
};

export const remove = (component) => {

  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
