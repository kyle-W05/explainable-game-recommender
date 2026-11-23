const preferencesForm = document.getElementById("preferences-form");
const resultsSection = document.getElementById("results");
const resultsMessage = document.getElementById("results-message");

preferencesForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const genre = document.getElementById("genre").value;
    const mode = document.getElementById("mode").value;
    const setting = document.getElementById("setting").value;

    const preferences = {
        genre: genre,
        mode: mode,
        setting: setting
    };

    console.log("User preferences:", preferences);

    resultsSection.hidden = false;
    resultsMessage.textContent =
        "Your preferences have been saved for this session. " +
        "Recommendation generation will be added next.";
});