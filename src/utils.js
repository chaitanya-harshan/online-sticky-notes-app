export const autoSize = (textareaRef) => {
  //-------------
  const textarea = textareaRef.current;
  textarea.style.height = "auto"; // compulsary resetting the height for css to work properly as specific height given peviously is prioritized over auto.
  textarea.style.height = textarea.scrollHeight + "px";
};

export const setZIndex = (selectedCard) => {
  selectedCard.style.zIndex = 100;
  const cards = Array.from(document.getElementsByClassName("card"))
  cards.forEach((card) => {
    if (card !== selectedCard) {
      card.style.zIndex = card.style.zIndex - 1 > 0 ? card.style.zIndex - 1 : 0;
    }    
  })
};

export const bodyParser = (body) => {
  try {
    return JSON.parse(body);
  } catch (error) {
    return body;
  }
}