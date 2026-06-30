/**
 * api.js
 *
 * Utility module for all HTTP calls to the json-server mock API.
 * Base URL points to localhost:3001 — the server must be running before
 * the React app can fetch or persist clothing items.
 *
 * Start the mock server with:
 *   json-server --watch db.json --id _id --port 3001
 *
 * Three operations are supported:
 *   getItems   — GET  /items         (load all clothing items on startup)
 *   addItem    — POST /items         (save a new garment)
 *   deleteItem — DELETE /items/:id   (remove a garment permanently)
 */

const baseUrl = "http://localhost:3001";

/**
 * Shared response handler — resolves with JSON on 2xx, rejects otherwise.
 * @param {Response} res - raw fetch Response object
 */
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

/**
 * Fetch all clothing items stored in db.json.
 * Called once on App mount via useEffect.
 */
export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(handleResponse);
};

/**
 * POST a new clothing item to the mock server.
 * json-server auto-generates the _id field.
 *
 * @param {Object} item - { name, imageUrl, weather }
 */
export const addItem = (item) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  }).then(handleResponse);
};

/**
 * Delete a clothing item by its _id.
 * json-server uses _id as the identifier (set via --id _id flag).
 *
 * @param {string|number} id - the _id of the item to remove
 */
export const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
};
