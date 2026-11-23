const preferencesForm = document.getElementById("preferences-form");
const resultsSection = document.getElementById("results");
const resultsMessage = document.getElementById("results-message");

// function to calculate score deciding how well a game matches user preferences
function calculateScore(game, preferences) {
    let score = 0;

    // genre match is 3 points, mode match is 4, settings match is 2
    if (game.genres.includes(preferences.genre)) {
        score += 3;
    }

    if (game.modes.includes(preferences.mode)) {
        score += 4;
    }

    if (game.setting === preferences.setting) {
        score += 2;
    }

    return score;
}

// rank games scores and return top 5
function getRecommendations(preferences) {
    return games
        .map(game => ({
            ...game,
            score: calculateScore(game, preferences)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

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
    resultsMessage.textContent = "";

    recommendations.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.className = "game-card";

        const title = document.createElement("h3");
        title.textContent = game.name;

        const score = document.createElement("p");
        score.textContent = `Match score: ${game.score}/9`;

        gameElement.appendChild(title);
        gameElement.appendChild(score);

        resultsMessage.appendChild(gameElement);
    });
});