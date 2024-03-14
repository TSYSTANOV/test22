import { getCategory } from "./api.js";
import { mainROOT } from "./elements.js";

function createCategory(data) {
  return data.map((item) => {
    const li = document.createElement("li");
    li.className = "category__item";
    li.dataset.id = item.id;

    const btnItem = document.createElement("button");
    btnItem.className = "category__card";
    btnItem.innerHTML = `
                <span class="category__title">${item.title}</span>
                   <span class="category__pairs">${item.length} пар</span>`;
    const btnEdit = document.createElement("button");
    btnEdit.className = "category__btn category__edit";
    btnEdit.ariaLabel = "редактировать";

    const btnDel = document.createElement("button");
    btnDel.className = "category__btn category__del";
    btnDel.ariaLabel = "удалить";
    li.append(btnItem, btnEdit, btnDel);
    return li;
  });
}

async function renderCategory() {
  const data = await getCategory();

  const section = document.createElement("section");
  section.className = "category section-offset";

  const container = document.createElement("div");
  container.className = "container";

  const categoryList = document.createElement("ul");
  categoryList.className = "category__list";

  let elements = createCategory(data);

  categoryList.append(...elements);

  section.append(container, categoryList);

  function mount() {
    mainROOT.append(section);
  }
  function unmount() {
    section.remove();
  }
  return { mount, unmount, categoryList };
}

export const getAllCategoryOnPage = async () => {
  return await renderCategory();
};
