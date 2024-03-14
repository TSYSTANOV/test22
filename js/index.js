import { getCategory } from "./api.js";
import { editCategory } from "./editCategory.js";
import { headerRoot } from "./elements.js";
import { changeTitle, headerOnPage, renderHeader } from "./header.js";
import { cardsRender } from "./renderCards.js";
import { getAllCategoryOnPage } from "./renderCategory.js";

function allClearBeforeRender(params) {
  params.forEach((item) => {
    item.unmount();
  });
}

async function initApp() {
  const headerOnPageR = headerOnPage();
  const categoryOnPageR = await getAllCategoryOnPage();
  const cardsByCategory = cardsRender();
  const editCategoryR = editCategory();
  headerRoot.append(headerOnPageR.div);
  headerOnPageR.btnHeader.addEventListener("click", () => {
    changeTitle("Новая категория");
    allClearBeforeRender([editCategoryR, categoryOnPageR]);
    editCategoryR.mount();
  });
  headerOnPageR.headerLink.addEventListener("click", () => {
    changeTitle("Категории");
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    categoryOnPageR.mount();
  });
  editCategoryR.btnCancel.addEventListener("click", () => {
    changeTitle("Категории");
    allClearBeforeRender([editCategoryR, categoryOnPageR]);
    categoryOnPageR.mount();
  });
  categoryOnPageR.mount();

  categoryOnPageR.categoryList.addEventListener("click", () => {
    if (event.target.classList.contains("category__edit")) {
      const id = event.target.parentNode.dataset.id;
      allClearBeforeRender([editCategoryR, categoryOnPageR]);
      editCategoryR.mount(id);
      return;
    }
    if (event.target.classList.contains("category__card")) {
      const id = event.target.parentNode.dataset.id;
      allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
      cardsByCategory.mount(id);
      return;
    }
  });
  cardsByCategory.btnReturn.addEventListener("click", () => {
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    categoryOnPageR.mount();
  });
}
initApp();
