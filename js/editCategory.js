import { getCategory } from "./api.js";
import { mainROOT } from "./elements.js";
import { changeTitle } from "./header.js";

function createRows(data) {
  if (!data) {
    return [];
  }
  return data.pairs.map((item) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="table__cell table__cell_one" contenteditable="true">
      ${item[0]}
      </td>
      <td class="table__cell table__cell_two" contenteditable="true">
      ${item[1]}
      </td>
      `;
    const tdCell = document.createElement("td");
    tdCell.className = "table__cell";
    const btnDelete = document.createElement("button");
    btnDelete.className = "table__del";
    btnDelete.textContent = "x";
    btnDelete.addEventListener("click", () => {
      tr.remove();
    });
    tdCell.append(btnDelete);
    tr.append(tdCell);
    return tr;
  });
}

function editCategory() {
  const section = document.createElement("section");
  section.className = "edit section-offset";
  const container = document.createElement("div");
  container.className = "container edit__container";
  const h2 = document.createElement("h2");
  h2.className = "edit__title";
  h2.setAttribute("contenteditable", "true");
  h2.title = "Можно редактировать";
  h2.textContent = "Введите название категории";

  const table = document.createElement("table");
  table.className = "edit__table table";
  table.innerHTML = `
            <thead>
              <tr>
                <th class="table__cell">main</th>
                <th class="table__cell">second</th>
                <th class="table__cell"></th>
              </tr>
            </thead>`;
  const tBody = document.createElement("tbody");
  table.append(tBody);

  // const tableRows = createRows();
  // if (tableRows.length > 0) {
  //   tBody.append(...tableRows);
  // }

  const btnWrapper = document.createElement("div");
  btnWrapper.className = "edit__btn-wrapper";
  const btnAddPair = document.createElement("button");
  btnAddPair.className = "edit__btn edit__add-row";
  btnAddPair.textContent = "Добавить пару";
  btnAddPair.addEventListener("click", () => {
    tBody.append(...createRows({ id: "", pairs: [["", ""]], title: "" }));
  });
  const btnSave = document.createElement("button");
  btnSave.className = "edit__btn edit__save";
  btnSave.textContent = "Сохранить категорию";
  const btnCancel = document.createElement("button");
  btnCancel.className = "edit__btn edit__cancel";
  btnCancel.textContent = "Отмена";

  btnWrapper.append(btnAddPair, btnSave, btnCancel);

  container.append(h2, table, btnWrapper);
  section.append(container);

  async function mount(id) {
    if (id) {
      btnSave.dataset.id = id
      const data = await getCategory(id);
      let elems = createRows(data);
   
      section.querySelector(".edit__title").textContent = data.title;
      section.querySelector("tbody").append(...elems);
      changeTitle(`Категория: ${data.title}`);
    } else {
      btnSave.dataset.id = ''
      section.querySelector(".edit__title").textContent =
        "Добавить новую категорию";
      changeTitle("Новая категория");
    }
    mainROOT.append(section);
  }
  function unmount() {
    section.querySelector("tbody").innerHTML = ''
    section.remove();
  }
  return { mount, unmount, btnCancel, btnSave, tBody ,h2};
}

export { editCategory };
