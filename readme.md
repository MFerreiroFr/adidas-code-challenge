## Adidas test challenge

This intends to be a "brief" rundown of the application from the tech stack to the challenges, issues and possible improvements.

##### How to run the app

This is a basic create-react-app application, so the commands are pretty standard

For running the project
npm run start

And for running the tests
npm run test

#### IMPORTANT:

I'll send to the person who sent me the technical challenge a .env file with the API KEY. If you want to use your own (As the number of api calls per day is limited), the name of the process.env variable is REACT_APP_API_KEY.

##### Stack:

React 18.
Redux Toolkit (Both redux with immer and RTKQuery).
Styled components.
RTL with MSW for the unit testing.

##### Disclaimers:

I took a 4-4-2 standard formation for the field players.
I'm no designer, so the app looks a bit wonky design wise.

##### Challenges:

**Testing**: Honestly, this is the first time I properly try to test an application (I've tinkered with unit testing in the past, but my experience is limited), and I had absolutely no idea how to test an application using redux as a global state manager.

After documenting myself using RTL and Redux docs, I decided to take a very "integration minded" approach and worry only about the behaviour of the different components. As the app is not THAT complicated (A bunch of objects moving in between arrays), I focused solely on integration like tests, and only had issues trying to generate the stores of the testing and finding ways to generate initial states that allowed me to test the things I was looking to test.

So there's basically not "unit testing" in the purest sense of the word in the application.
And although I know I could have been a little bit more thorough with the testing, I think it checks the important pars, and aside from the tests that require certain initial states to work and a couple of hiccups (it could be solvented by rendering the whole app and doing all the steps one by one, though) the tests are somewhat solid.

**Typescript**: Until I got the hang of it, I wanted to hang typescript so badly. Then when the project started growing, I could go around and change things in a moment or see issues I never thought of and now I wouldn't change it for anything (consider this is my first "full" project using ts).
Some parts of it are still opaque to me (I like to use objects instead of switches, and after some battling, typescript won, so you may see one of those around. Sorry).

#### Issues

I couldn't make neither the CI part nor the Front end persistence. The first one because I lack enough knowledge and the challenge was already pretty time consuming. The second one because I couldn't make it in time.

If I had a bit more time, I would have at least tried to save the slice of state responsible for the list of players selected (myTeam) in the local storage, and made the initial state so it would look for info in the local storage when the app starts.

If I had way more time, I would have set up a service worker and cached the info either in the cache storage or the indexedDB so i could have a proper caching strategy (In this case, considering the world cup is in like 10 days, I would have gone with a cache first strategy instead of revalidating just because it is actually pretty static info).

The file structure of the app is... messy, to say the least. This was because the initial scope I had for the app was pretty different that the end result, and some stuff was made, canceled, retaken and given up during the last week.
