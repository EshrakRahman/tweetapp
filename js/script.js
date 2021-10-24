// selector

const filterTweetElm = document.querySelector(".search-items");
const writeTweetElm = document.querySelector(".write-tweet");
const submitBtn = document.querySelector(".submit");
const deleteBtn = document.querySelector(".delete-tweet");
const tweetListElm = document.querySelector(".tweet-collections");
const msgElm = document.querySelector(".msg");


// Load all listen event
function loadAllEvtListener() {
    submitBtn.addEventListener('click', addTweetToUi);
    tweetListElm.addEventListener('click', deleteTweet);
    filterTweetElm.addEventListener('keyup', searchTweet)
}
// data store
let tweetData = getDataFromLocalStorage();

function getDataFromLocalStorage() {
    let tweets = '';
    if (localStorage.getItem('allTweets') === null){
        tweets = [];
    }else {
        tweets = JSON.parse(localStorage.getItem('allTweets'));
    }
    return tweets;
}

function saveDataToLocalStorage(item) {
    let tweets = '';
    if (localStorage.getItem('allTweets') === null){
        tweets = [];
        tweets.push(item);
        localStorage.setItem('allTweets', JSON.stringify(tweets));
    }else {
        tweets = JSON.parse(localStorage.getItem('allTweets'));
        tweets.push(item);
        localStorage.setItem('allTweets', JSON.stringify(tweets));
}
}

function deleteTweetFromLocalStorage (id){
    // getting data from local storage
    const tweets = JSON.parse(localStorage.getItem('allTweets'));


    // removing data from list
    let result;
    result = tweets.filter(tweet =>{
        return tweet.id !== id;
    });
    localStorage.setItem('allTweets', JSON.stringify(result));
    // tweetData = result;
}

function showTweetToUi(tweetsList) {
    if (tweetData.length > 0){
        let li = '';
        // console.log(tweetsList.message)
        tweetsList.forEach(tweet =>{
            li = document.createElement('li');
            li.className = 'tweet-items';
            li.id = `tweet-${tweet.id}`;
            li.innerHTML = `
         <li class="tweet-items" id="tweet-${tweet.id}">
         <span>${tweet.message}:</span>
         <button class="delete-tweet">Delete</button>
        </li>
        `
            tweetListElm.appendChild(li);
        });
        msgElm.innerHTML = '';
    } else{
        showMessages(true, null);
    }
}
showTweetToUi(tweetData);
// add tweet to ui
let addTweetToUi = (evt) => {
    console.log("added");
    const tweet = writeTweetElm.value;
    let id;
    if (tweetData.length === 0){
        id = 0;
    }else {
        id = tweetData[tweetData.length - 1].id + 1;
    }


    if (tweet === ''){
        alert("Please write your tweet to tweet :)");
    }else {
        let data = {
            id,
            message: tweet
        }
        tweetData.push(data);
        saveDataToLocalStorage(data);
        tweetListElm.innerHTML = '';
        showTweetToUi(tweetData);
        writeTweetElm.value = '';
    }
};


// delete item
let deleteTweet = evt => {
    if(evt.target.classList.contains('delete-tweet')){
        // removing tweet from ui
        const deleteTweet = evt.target.parentElement;
        deleteTweet.parentElement.remove();
        // console.log(target);
        // evt.target.parentElement.parentElement.removeChild(target);
        // console.log(evt.target.parentElement.remove(target));
        const id = Number(deleteTweet.id.split('-')[1]);
        deleteTweetFromLocalStorage(id);
        console.log(id);
        let result;
        result = tweetData.filter(tweet =>{
            return tweet.id !== id;
        });
        tweetData = result;

    }
    console.log(evt.target);
};



// search tweet
let searchTweet = evt => {
    const text = evt.target.value;
    text.toLowerCase();
    const tweetMsg = document.querySelectorAll('.tweet-collections .tweet-items');
    tweetMsg.forEach(tweet => {
        const individualTweet = tweet.firstElementChild.textContent;
        individualTweet.toLowerCase();

        //    check
        if (individualTweet.indexOf(text) === -1){
            showMessages(null,true);
            tweet.style.display = 'none';
        }else {
            tweetListElm.innerHTML = '';
            tweet.style.display = 'block';
        }

    })
};


// show error messages

function showMessages(tweetItemsShow, tweetItemsSearch) {
    if (tweetItemsShow){
        tweetListElm.innerHTML = 'No tweet to show';
    } else if (tweetItemsSearch){
        tweetListElm.innerHTML = 'No tweet to found';
    }
}

loadAllEvtListener();