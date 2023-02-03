

// PSEUDOCODE
// User clicks the “get a random card” button
// Button calls API :a single random card is pulled directly from the API. 
// Random card is matched with local image file
// Image, title and description are posted to the page. These are all tracked in their own State
// useState used to track user’s inputs. User enters initials and an emoji react. 
// Event listener on button. Once clicked, user input data and card info is pushed to firebase.
// Pull info from firebase to log to the “previous entries” section of the page.


// COMPONENTS OF PROJECT
// App.js
//   > Form.js
//   


// Put the info on the page.




// Call with Adrian re useEffect / useState:

// useEffect
// When app loads we want to get information > useState would hold the info and then display it when we ask.

//   Form
// State tracks what user types in, when submit, we send to firebase.Want to grab whatever input value we’ve saved in state and get the value from that. (could do something like trim whitespace or do lowercase effect on it - could change curse word)Then submit it to firebase.Call the push function and pass those values over and that gets sent to firebase

// Handle submit function that grabs values from state. 
// Within React we want to work within conventions = when i want to submit something we want to use a hook(we only want to submit when we have something).We’ll set up another value of state as a placeholder.
//   On “submit” > useEffect called - grabs info from state - pushes - only runs when State has changed.May want to ensure that a change has occurred before submitting. 

// Adrian also mentioned a stretch goal:
// Filtering past entries using ternary operators:
// Show today’s entries or past entries.If “show daily” is false, show entire database of entries. 
