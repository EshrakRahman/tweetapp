/*
* to do
* target all elements
* submit to the ui
* store all data to localstorage
* delete btn implement to delete tweet
* search items from localstorage
*
* */
console.log('connected');

// select all elements

const writeTweetElm = document.querySelector(".write-tweet");
const submitTweetElm = document.querySelector(".submit");


function storeTweetToLocalStorage() {
    writeTweetElm.value
}

    let items;
function submitToLocalStorage() {
    let tweetMsg = writeTweetElm.value;
    if (tweetMsg !== ''){
        let data = {
            id: 0,
            message: writeTweetElm.value
        }
        items = [];
        items.push(data);
        localStorage.setItem('tweetMsg', JSON.stringify(items));
        console.log("ok")
    }
    return items;
}
getDataFromLocalStorage(items);
// get data from localStorage
function getDataFromLocalStorage(data) {
    let tweetData = JSON.parse(localStorage.getItem('tweetMsg'));
    console.log(tweetData[id]);

}

// Populate to ui
function updateUiWithTweets() {

}




function loadAllEvtListener() {
    submitTweetElm.addEventListener('click', submitToLocalStorage);
}

loadAllEvtListener();