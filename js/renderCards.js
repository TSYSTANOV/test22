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

  // <button class="card__item">
  //   <span class="card__front">улыбка</span>
  //   <span class="card__back">smile</span>
  // </button>

  container.append(btnReturn);
  section.append(container);
  //   let number = 0;
  async function mount(id) {
    const data = await getCategory(id);
    console.log(data.pairs);
    changeTitle(data.title);

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

          if (number === pairs.length) {
            spanFront.innerHTML = "The end";
            setTimeout(() => {
              allClearBeforeRender([
                editCategoryR,
                categoryOnPageR,
                cardsByCategory,
              ]);
              categoryOnPageR.mount();
            }, 500);

            return;
          }
        }, 1500);
        setTimeout(() => {
          number++;
          spanFront.innerHTML = pairs[number][0];
        }, 800);
        setTimeout(() => {
          spanBack.innerHTML = pairs[number][1];
          btn.style.pointerEvents = "auto";
        }, 2000);
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
