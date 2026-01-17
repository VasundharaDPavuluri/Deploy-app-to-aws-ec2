/**
 * Fetch public configuration from backend
 * Safe to expose
 */
fetch("/config")
  .then(res => res.json())
  .then(data => {
    document.getElementById("output").textContent =
      "Public Key from backend: " + data.publicKey;
  })
  .catch(err => {
    document.getElementById("output").textContent =
      "Error loading config";
    console.error(err);
  });

/**
 * Call secure backend API
 * No secrets sent from frontend
 */
document.getElementById("btn").addEventListener("click", () => {
  fetch("/secure-action", {
    method: "POST"
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
    })
    .catch(err => {
      document.getElementById("output").textContent =
        "Error calling secure API";
      console.error(err);
    });
});