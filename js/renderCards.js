import { getCategory } from "./api.js";
import { mainROOT } from "./elements.js";
import { changeTitle } from "./header.js";

function renderCards() {
  const section = document.createElement("section");
  section.className = "card section-offset";
  const container = document.createElement("div");
  container.className = "container card__container";

  const btnReturn = document.createElement("button");
  btnReturn.className = "card__return";
  btnReturn.setAttribute("aria-label", "Возврат к категориям");



  container.append(btnReturn);
  section.append(container);

  async function mount(id) {
    const data = await getCategory(id);
    changeTitle(data.title);
    section.querySelector(".container").innerHTML = ''
    section.querySelector('.container').append(btnReturn)
    
    let cards = renderBtnCard(data.pairs);
    section.querySelector(".container").append(cards);

    mainROOT.append(section);
  }
  function renderBtnCard(pairs) {
    let number = 0;
    
    const btn = document.createElement("button");
    btn.className = "card__item";
    const spanFront = document.createElement("span");
    spanFront.className = "card__front";
    spanFront.innerHTML = pairs[number][0];
    const spanBack = document.createElement("span");
    spanBack.className = "card__back";
    spanBack.innerHTML = pairs[number][1];
    btn.append(spanFront, spanBack);

    btn.addEventListener("click", () => {
 
      if (btn.classList.contains("card__item_flipped")) {
        btn.classList.remove("card__item_flipped");
      } else {
        btn.classList.add("card__item_flipped");
        btn.style.pointerEvents = "none";
        setTimeout(() => {
          btn.classList.remove("card__item_flipped");
          setTimeout(() => {
            number++;
            if (number >= pairs.length) {
              spanFront.innerHTML = "The end";
              setTimeout(() => {
                btn.remove()
                btnReturn.click()
              }, 500);
            }else{
              spanFront.innerHTML = pairs[number][0];
              setTimeout(() => {
                spanBack.innerHTML = pairs[number][1];
                btn.style.pointerEvents = "auto";
              }, 100);
            }
          }, 100);
        }, 1500);
      }
    });
    return btn;
  }

  function unmount() {
    section.remove();
  }
  return { mount, unmount, btnReturn };
}
export const cardsRender = () => {
  return renderCards();
};
