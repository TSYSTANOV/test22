import { addCategory, deleteCategory, getCategory } from "./api.js";
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
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    editCategoryR.mount();
  });
  headerOnPageR.headerLink.addEventListener("click", () => {
    changeTitle("Категории");
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    categoryOnPageR.mount();
  });
  editCategoryR.btnCancel.addEventListener("click", () => {
    changeTitle("Категории");
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    categoryOnPageR.mount();
  });
  editCategoryR.btnSave.addEventListener('click', async()=>{
    let id = null
    if( editCategoryR.btnSave.dataset.id){
      id = editCategoryR.btnSave.dataset.id
    }
    const pairs = []
    const data = editCategoryR.tBody.querySelectorAll('tr')
    if(data.length === 0 ){
      return
    }
    data.forEach(item=>{
      let key = item.children[0].textContent.trim()
      let value = item.children[1].textContent.trim()
      if(key  && value ){
        pairs.push([key, value])
      }
    })
    if(pairs.length > 0){
      const newCategory = {pairs,
        title:editCategoryR.h2.textContent}
    if(id){
      newCategory.id = id
    }
    const newData = await addCategory(newCategory)
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    categoryOnPageR.mount(newData);
    changeTitle(`Категории`);
    }
    
    
  })
  categoryOnPageR.mount();

  categoryOnPageR.categoryList.addEventListener("click", () => {
    if (event.target.classList.contains("category__edit")) {
      const id = event.target.parentNode.dataset.id;
      allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
      editCategoryR.mount(id);
      return;
    }
    if (event.target.classList.contains("category__card")) {
      const id = event.target.parentNode.dataset.id;
      allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
      cardsByCategory.mount(id);
      return;
    }
    if(event.target.classList.contains("category__del")){
      const id = event.target.parentNode.dataset.id;
      
      deleteCategory(id)
      event.target.parentNode.remove()
      
    }
  });
  cardsByCategory.btnReturn.addEventListener("click", () => {
    allClearBeforeRender([editCategoryR, categoryOnPageR, cardsByCategory]);
    categoryOnPageR.mount();
    changeTitle(`Категории`);
  });
}
initApp();
