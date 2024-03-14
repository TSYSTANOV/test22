const API_URL = "https://feather-zealous-grapple.glitch.me";

function getCategory(id) {
  return fetch(`${API_URL}/api/category/${id ? id : ""}`).then((response) =>
    response.json()
  );
}
export { getCategory };

// /api/category/${id}
