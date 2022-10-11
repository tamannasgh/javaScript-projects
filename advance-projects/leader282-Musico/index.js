// getting all required elements
const searchInput = document.querySelector(".searchInput");
const input = searchInput.querySelector("input");
const resultBox = searchInput.querySelector(".resultBox");
const icon = searchInput.querySelector(".icon");
let linkTag = searchInput.querySelector("a");
let webLink;

// if user press any key and release
input.onkeyup = (e)=>{
    let userData = e.target.value; //user enetered data
    let emptyArray = [];
    if(userData){
        let suggestions_new = [];
        let suggestions = [];
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '94b93b7997mshf3ffdcdc7f382b5p129a80jsn945237b05595',
                'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
            }
        };
        
        fetch('https://spotify23.p.rapidapi.com/search/?q='+userData+'&type=multi&offset=0&limit=10&numberOfTopResults=5', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                suggestions_new = response.tracks.items
                emptyArray = suggestions_new.map((track)=>{
                    id = track.data.id;
                    return data = `<li id=${id}><img src=${track.data.albumOfTrack.coverArt.sources[0].url}></img><a href="https://open.spotify.com/track/${id}" class="songs">`+ track.data.name +`</a><p>By ${track.data.artists.items[0].profile.name}</p></li>`;
                });
                searchInput.classList.add("active"); //show autocomplete box
                showSuggestions(emptyArray);
                let allList = resultBox.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag
                    allList[i].setAttribute("onclick", "select(this)");
                }

                elements = document.getElementsByClassName("songs")
                for (let i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('click', getTrackUrl, false);
                }
            })
            .catch(err => console.error(err));
    }else{
        searchInput.classList.remove("active"); //hide autocomplete box
    }
}

function showSuggestions(list){
    let listData;
    if(!list.length){
        userValue = inputBox.value;
        listData = '<li><a>'+ userValue +'</a></li>';
    }else{
        listData = list.join('');
    }
    resultBox.innerHTML = listData;
}

let getTrackUrl = (id) => {
    let track;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '94b93b7997mshf3ffdcdc7f382b5p129a80jsn945237b05595',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
    
    fetch('https://spotify23.p.rapidapi.com/tracks/?ids='+id, options)
        .then(response => response.json())
        .then(response => track = response)
        .catch(err => console.error(err));
    
    console.log(track);
}