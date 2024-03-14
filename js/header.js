import { headerRoot } from "./elements.js";

function changeTitle(text) {
  document.querySelector(".header__subtitle").textContent = text;
}

function renderHeader() {
  const div = document.createElement("div");
  div.className = "container header__container";

  const headerLink = document.createElement("a");
  headerLink.className = "header__logo-link";
  headerLink.innerHTML = `<img
             class="header__logo"
             src="img/logo.svg"
             alt="Логотип сервиса Brain Cards"/>`;
  const h2 = document.createElement("h2");
  h2.className = "header__subtitle";
  h2.textContent = "Категории";
  const btnHeader = document.createElement("button");
  btnHeader.className = "header__btn";
  btnHeader.textContent = "Добавить категорию";

  div.append(headerLink, h2, btnHeader);

  return { div, btnHeader, headerLink };
}
export const headerOnPage = () => {
  return renderHeader();
};

export { changeTitle, renderHeader };
