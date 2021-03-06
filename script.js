// ==UserScript==
// @name     Unbenanntes Skript 735901
// @version  1
// @grant    none
// ==/UserScript==

var timeout;

function hideMeunBar() {
  console.log("hide");
  document.getElementById("player-control-panel").classList.remove("player-control-panel-show");
  document.getElementById("player-control-panel").classList.add("player-control-panel-hover");
}

function unhideMenuBar() {
  console.log("unhide");
  document.getElementById("player-control-panel").classList.remove("player-control-panel-hover");
  document.getElementById("player-control-panel").classList.add("player-control-panel-show");
}

function loadHoverIcon(mode, msg, showCenter) {
  if (mode !== undefined) {
    let vid = document.getElementById("player");
    let pla = document.getElementById("view-box1");
    //console.log(vid);
    var ic = document.createElement("div");
    ic.classList.add("player-hover-icon");
    ic.classList.add("hover-" + mode);
    let te = document.createElement("p");
    if (msg !== undefined) {
      te.innerHTML = msg;
      te.classList.add(showCenter ? "player-hover-text-center" : "player-hover-text");
      ic.appendChild(te);
    }
    vid.insertBefore(ic, pla);
    setTimeout(function () {
      ic.remove();
    }, 1000);
  }
};

setTimeout(function () {
  loadHoverIcon();
  //unhideMeunBar();
}, 3000);
document.onload = loadHoverIcon();

document.getElementById("player").addEventListener('click', e => {
  if (e.target.id === "") {
    playPause();
  }
});

document.addEventListener('keydown', k => {
  let key = k.key;
  if (k.shiftKey && key === ':') {
    faster();
  } else if (k.shiftKey && key === ';') {
    slower();
  } else if (key === 'l') {
    skip();
  } else if (key === 'j') {
    back();
  } else if(key === 'ArrowRight') {
    skip(5);
  } else if(key === 'ArrowLeft') {
    back(5);
  } else if(key === 'L') {
    skip(60);
  } else if(key === 'J') {
    back(60);
  }
});

document.addEventListener('keyup', k => {
  if (k.key === ' ' || k.key === 'k') {
    playPause();
  }
});
/*
document.addEventListener("mousemove", function() {
      unhideMenuBar();
  if (timeout) {
  clearTimeout(timeout);
   }
timeout = setTimeout(hideMenuBar, 200);
});
*/
function getVid() {
  let vid = document.getElementsByClassName('single');
  vid = Array.prototype.slice.call(vid);
  return vid.find(a => a.localName === "video");
}


function playPause() {
  let vid = getVid();
  if (vid.paused) {
    loadHoverIcon("Play");
    vid.play();
  } else {
    loadHoverIcon("Pause");
    vid.pause();
  }
}

function faster() {
  let vid = getVid();
  if (vid.playbackRate < 2.0) {
    vid.playbackRate += 0.25;
    loadHoverIcon("speed_up", vid.playbackRate + "x");
  }
}

function slower() {
  let vid = getVid();
  if (vid.playbackRate > 0.25) {
    vid.playbackRate -= 0.25;
    loadHoverIcon("slow_down", vid.playbackRate + "x");
  }
}

function skip(time) {
  let st = time || 10;
  let vid = getVid();
  vid.currentTime += st;
  loadHoverIcon("skip", st, true);
}

function back(time) {
  let st = time || 10;
  let vid = getVid();
  vid.currentTime -= st;
  loadHoverIcon("rev", st, true);
}