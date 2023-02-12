let previous = document.querySelector('#pre');
let play = document.querySelector('#play');
let next = document.querySelector('#next');
let title = document.querySelector('#title');
let recent_volume = document.querySelector('#volume');
let volume_show = document.querySelector('#volume_show');
let slider = document.querySelector('#duration_slider');
let show_duration = document.querySelector('#show_duration');
let track_image = document.querySelector('#track_image');
let auto_play = document.querySelector('#auto');
let present = document.querySelector('#present');
let total = document.querySelector('#total');
let artist = document.querySelector('#artist');


let timer;
let autoplay = 0;

let index_no = 0;
let playing_song = false;

// Creating an audio element
let track = document.createElement('audio');

//All song list
let All_song = [
    {
        name: "SomeThing",
        path: "something.mp3",
        img: "img1.jpg",
        singer: "Civilized Truth ft Atomic",
    },
    {
        name: "Corny",
        path: "song1.mp3",
        img: "img1.jpg",
        singer: "Rema",
    },
    {
        name: "Mi Girl",
        path: "Evidence.mp3",
        img: "img1.jpg",
        singer: "Atomic & Civilized Truth",
    },
    {
        name: "Lady",
        path: "song2.mp3",
        img: "img2.jpg",
        singer: "Rema",
    },
    {
        name: "Woman",
        path: "song3.mp3",
        img: "img3.jpg",
        singer: "Rema",
    },
    {
        name: "Ginger",
        path: "song4.mp3",
        img: "img4.jpg",
        singer: "Rema",
    },
    {
        name: "I can't kill myself",
        path: "song5.mp3",
        img: "img5.jpg",
        singer: "Timaya",
    }

];

// All functions

// Function to load the track
function load_track(index_no){
    reset_slider();
    track.src = All_song[index_no].path;
    title.innerHTML = All_song[index_no].name;
    track_image.src = All_song[index_no].img;
    artist.innerHTML = All_song[index_no].singer;
    track.load();


    total.innerHTML = All_song.length;
    present.innerHTML = index_no + 1;

    timer = setInterval(range_slider , 1000 );


}
load_track(index_no);


//reset song slider
function reset_slider(){
    slider.value = 0;
}

//Checking the song is playing or not
function justplay(){
    if(playing_song == false){
        playsong();
    }else{
        pausesong();
    }
}

// Play Song
function playsong(){
    track.play();
    playing_song = true;
    play.innerHTML = '<i class = "fa fa-pause"></>';
}

// Pause Song
function pausesong(){
    track.pause();
    playing_song = false;
    play.innerHTML = '<i class = "fa fa-play"></>';
}

// Next song function
function next_song(){
    if(index_no < All_song.length - 1){
        index_no += 1;
        load_track(index_no);
        playsong();
    }else{
        index_no = 0;
        load_track(index_no);
        playsong();
    }
}

//previous song
function previous_song(){
    if(index_no > 0){
        index_no -= 1;
        load_track(index_no);
        playsong()
    }else{
        index_no = All_song.length;
        load_track(index_no);
        playsong()
    }
}

//change volume
function volume_change(){
    volume_show.innerHTML = recent_volume.value;
    track.volume = recent_volume.value / 100;
}


//autoplay function
function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background = "rgba(255,255,255,0.2)"
    }else{
        autoplay = 1;
        auto_play.style.background = "#FF8A65";
    }
}


//change slider position
function change_duration(){
    slider_position = track.duration * (slider.value / 100);
    track.currentTime = slider_position;
}

function range_slider(){
     let position = 0;

     //update slider position
     if(!isNaN(track.duration)){
         position = track.currentTime * (100 / track.duration);
         slider.value = position;
     }

     //function will run when the song is over
     if(track.ended){
         play.innerHTML = '<i class="fa fa-play';
         if (autoplay==1){
             index_no += 1;
             load_track(index_no);
             playsong();
         }
     }
}