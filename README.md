# Explainable video game recommendation system
README word count: 911

## Project status
This is a simple prototype for an explainable recommendation system, designed to demonstrate the very basics of how a full system may work, exploring how different explanation styles may influence a users’ ability to evaluate recommendations. 

This prototype includes a series of features: user preference selection, a weighted recommendation system using a locally stored dataset of 12 games, display of the 5 highest scoring game recommendations, feature-based explanations highlighting matching attributes, trade-off explanations highlighting matching and mismatching attributes, controls for a user to approve or disapprove of a recommendation, and session based adaptation to remember and exclude rejected recommendations from future recommendations. 

As a result of this prototype’s limited scope, many features are not included as they have been deemed too advanced, and some limitations must be kept in mind: the dataset is manually curated, rather than being pulled from an external API, recommendation weights are pre-defined rather than learned, and feedback is lost after a page refresh.

## Tech stack
**HTML:** Used to structure the preference form and build the frontend user interface.

**CSS:** Used to provide the simple styling and visual feedback.

**Javascript:** Used to develop the logic behind the more complicated background works of the system, including weighted recommendation scoring, user feedback, and explanation generation. 

**ChatGPT:** While technically not a direct part of the tech stack, ChatGPT was used as assistance in the development process. ChatGPT in particular helped with speeding up development within the HTML file, providing lots of the code to match the layout I came up with. Furthermore, it was used a few times for debugging. For example, in commit [ad32bf2 ‘Added missing line to fix UncaughtReference error’](https://github.com/kyle-W05/explainable-game-recommender/commit/ad32bf201aec044a1c18ab74217ee6fdae5891aa), ChatGPT was used to identify what was causing this issue and provide a fix. 

## Running the prototype
1.	Clone or download the github repository
2.	Open the project folder, either in vscode or another IDE.
3.	Open index.html in a web browser.
4.	Select preferred genre, mode, and setting.
5.	Select ‘Get recommendations’ to get the 5 highest scoring games.
6.	Switch between explanation styles to see how they differ.
7.	Use feedback buttons to mark interest.
No additional dependencies or API keys required.

## Development record
1.  **Initial interface development:** Used HTML, CSS and javascript to create an initial user interface, which contained simple drop down menus to allow users to select their preferred genre, mode and setting. Users couldn’t yet get any recommendations, this step was simply to ensure we had an interface that was functional at a base level. 

This simple form-based interface was chosen to minimise complexity and easily support the limited input users could choose to make. This kept the project focused on its main task of generating recommendations, rather than worrying about having a vast array of user options that ultimately don’t change the effectiveness of this project’s ability to address its main objective. 

Testing was done here to ensure users could select preferences, and receive confirmation that their input was captured. Relevant commit: [‘Added basic functionality to the page’, 30927e3](https://github.com/kyle-W05/explainable-game-recommender/commit/30927e3dd0c84bc48b5cf24f1c9d517ec21e955d)

2. **Game dataset and recommendation algorithm:** Created a manually curated dataset containing 12 games, each described with genre, mode and setting. Then implemented a very simple weighted algorithm in script, which assigns scores to games based on how closely they match a user’s preferences. 

This weighted scoring approach was used instead of a machine learning model with dynamic scoring due to the project’s limited scope. The dataset was also locally curated for this exact reason, it is much easier to create our own simple dataset than pull from an API and have to parse the information for us to use, whilst still ultimately proving the same thing. Game mode was given the highest weighting as it can significantly alter whether a game meets a users’ requirements. 

I tested this step by calculating what the score should be for games using the FPS, Coop, and SCI-Fi preferences, then ensuring the results on the page matched this. Relevant commit: [ad32bf2 ‘Added styling for recommendations’.](https://github.com/kyle-W05/explainable-game-recommender/commit/66553d3a25117d8966c69d8464053c87298cb354)

3. **Explainable recommendations:** The next step was to introduce two explanation styles: Trade-off and feature based. These styles were chosen to address the question established in my literature review. I allowed people to freely switch between the 2 styles to compare them and decide which they like best, allowing my literature question to be better addressed by investigating if including negative information affects a user’s ability to recognise unsuitable recommendations. 

This was tested by ensuring explanation content was matching with a user’s preferences and the game’s stored attributes. I then verified that switching explanation styles would change this accordingly. Relevant commit: [‘Added trade-off and feature based explanation options.’ 9421911.](https://github.com/kyle-W05/explainable-game-recommender/commit/9421911187d87f6729e311b3de23083c115937a0)

4. **User feedback and adaptation:** Added Interested and Not Interested buttons to each recommendation. Interested selections get marked visually, whilst uninterested gets removed from the recommendation list and replaced with the next highest game. 

This was introduced to demonstrate a basic form of adaptation, session based filtering was used over a complex learning algorithm to fit the scope and keep it reasonably achievable. 

Testing was done to ensure they worked as described. Initially, the Not Interested button was not working when pressed, as a filtering option was missing in the recommendation function, which was subsequently fixed. Relevant commit: [‘Added ability to accept or reject recommendations.’ b7eca95](https://github.com/kyle-W05/explainable-game-recommender/commit/b7eca9549660a6a31629d5aecfa9c1fa98b89e41)

## All required files
**index.html:** Main webpage and user interface.
**style.css:** Interface styling.
**script.js:** Recommendation algorithm, explanation generation and feedback handling.
**games.js:** Manually curated game dataset.

