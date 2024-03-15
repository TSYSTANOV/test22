const API_URL = "https://feather-zealous-grapple.glitch.me";

function getCategory(id) {
  return fetch(`${API_URL}/api/category/${id ? id : ""}`).then((response) =>
    response.json()
  );
}

function addCategory(newCategory){
  console.log('update category')
  return fetch(`${API_URL}/api/category/${newCategory.id ? newCategory.id : ''}`,{
    method:`${newCategory.id ? 'PATCH' : 'POST'}`,
    body:JSON.stringify(newCategory)
  }).then((response) =>
  response.json()
);

}
function deleteCategory(id){
  console.log('delete category')
  fetch(`${API_URL}/api/category/${id}`,{
    method:'DELETE',
  }).then((response) =>
  response.json()
  )}

export { getCategory ,addCategory, deleteCategory};


