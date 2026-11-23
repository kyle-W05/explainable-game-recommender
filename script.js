const preferencesForm = document.getElementById("preferences-form");
const resultsSection = document.getElementById("results");
const resultsMessage = document.getElementById("results-message");
const explanationStyle = document.getElementById("explanation-style");

// store the current preferences and recommendations
let currentPreferences = null;
let currentRecommendations = [];

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

// convert stored values into readable labels
const genreLabels = {
    fps: "FPS",
    rpg: "RPG",
    strategy: "Strategy",
    survival: "Survival"
};

const modeLabels = {
    singleplayer: "Single-player",
    multiplayer: "Multiplayer",
    coop: "Co-op"
};

const settingLabels = {
    scifi: "Science Fiction",
    fantasy: "Fantasy",
    modern: "Modern",
    historical: "Historical"
};

// generate an explanation for a recommendation
function generateExplanation(game, preferences, style) {
    const matches = [];
    const mismatches = [];

    if (game.genres.includes(preferences.genre)) {
        matches.push(
            `Matches your preferred ${genreLabels[preferences.genre]} genre`
        );
    } else {
        mismatches.push(
            `Does not match your preferred ${genreLabels[preferences.genre]} genre`
        );
    }

    if (game.modes.includes(preferences.mode)) {
        matches.push(
            `Supports your preferred ${modeLabels[preferences.mode]} mode`
        );
    } else {
        mismatches.push(
            `Does not support your preferred ${modeLabels[preferences.mode]} mode`
        );
    }

    if (game.setting === preferences.setting) {
        matches.push(
            `Matches your preferred ${settingLabels[preferences.setting]} setting`
        );
    } else {
        mismatches.push(
            `Does not match your preferred ${settingLabels[preferences.setting]} setting`
        );
    }

    if (style === "tradeoff") {
        return [
            ...matches.map(text => ({ text, match: true })),
            ...mismatches.map(text => ({ text, match: false }))
        ];
    }

    if (matches.length === 0) {
        return [{
            text: "No selected preferences match this game.",
            match: false
        }];
    }

    return matches.map(text => ({ text, match: true }));
}

// display the recommendations and their explanations
function displayRecommendations() {
    resultsMessage.textContent = "";

    const style = explanationStyle.value;

    currentRecommendations.forEach(game => {
        const gameElement = document.createElement("div");
        gameElement.className = "game-card";

        const title = document.createElement("h3");
        title.textContent = game.name;

        const score = document.createElement("p");
        score.textContent = `Match score: ${game.score}/9`;

        const explanationHeading = document.createElement("h4");
        explanationHeading.textContent = "Why was this recommended?";

        const explanationList = document.createElement("ul");
        explanationList.className = "explanation-list";

        const explanations = generateExplanation(
            game,
            currentPreferences,
            style
        );

        explanations.forEach(explanation => {
            const item = document.createElement("li");
            item.textContent = explanation.text;

            item.className = explanation.match
                ? "match"
                : "mismatch";

            explanationList.appendChild(item);
        });

        gameElement.appendChild(title);
        gameElement.appendChild(score);
        gameElement.appendChild(explanationHeading);
        gameElement.appendChild(explanationList);

        resultsMessage.appendChild(gameElement);
    });
}

// handle preference form submission
preferencesForm.addEventListener("submit", function(event) {
    event.preventDefault();

    currentPreferences = {
        genre: document.getElementById("genre").value,
        mode: document.getElementById("mode").value,
        setting: document.getElementById("setting").value
    };

    console.log("User preferences:", currentPreferences);

    currentRecommendations = getRecommendations(currentPreferences);

    resultsSection.hidden = false;

    displayRecommendations();
});

// update explanations when the user changes the style
explanationStyle.addEventListener("change", function() {
    if (currentPreferences !== null) {
        displayRecommendations();
    }
});