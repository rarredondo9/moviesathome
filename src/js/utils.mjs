//Helper functions used by every page

// Returns the JSON from a response or throws the APIs error message
export async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw new Error(
    data.status_message || `Request failed (status ${res.status})`,
  );
}

// Shortcut for querySelector
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Builds a full TMDb image URL
export function getPosterUrl(path, size = "w342") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}

//Renders a list through a template function into the page
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "beforeend",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Shows a message in a status element; isError makes it red
export function setStatus(element, message = "", isError = false) {
  element.textContent = message;
  element.classList.toggle("status--error", isError);
}

// Reads one value from the page URL
export function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

// Turn minutes into "0h 0m" format
export function formatRuntime(minutes) {
  if (!minutes) {
    return "";
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours ? `${hours}h ${mins}m` : `${mins}m`;
}

// Escapes text so it is safe to insert as HTML
export function escapeHtml(text = '') {
  return String(text)
  .replaceAll('&', '&amp;')
  .replaceAll('<','&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');
}