var gameStarted = false;
var playButton = document.getElementById('play');
var resetButton = document.getElementById('reset');

var sectionPlayer1 = $('.player1-section');
var sectionPlayer2 = $('.player2-section');
var placar1 = $(sectionPlayer1).children('.placar-total').children('h1')[0];
var placar2 = $(sectionPlayer2).children('.placar-total').children('h1')[0];
var jogadas1 = $(sectionPlayer1).children('.container-pontos')[0];
var jogadas2 = $(sectionPlayer2).children('.container-pontos')[0];

var retry = document.getElementsByClassName("retry");

var playerBadges = $('body>img');

var score1 = 0;
var score2 = 0;

var isRunning = false;

var estrelas;

playButton.addEventListener('click', play);
resetButton.addEventListener('click', resetScore);
document.addEventListener('DOMContentLoaded', initialize);

for (var i = 0; i < retry.length; i++) {
    retry[i].addEventListener('click', tryAgain);
}

function play() {
    if (!gameStarted) {
        playButton.classList.add('disabled');
        momentoAtual = moment();
        resetScore();
        showScore();
        badgesOut();
        clock.start();
        isRunning = true;
        fetchJson(url);
        gameStarted = true;

    } else {

        return null;
    }
}

function initialize() {
    cleanUp();
    badgesIn();
}

function badgesIn() {
    yIn = 300;
    xIn = 150;

    for (i = 0; i - playerBadges.length; i++) {
        playerBadges[i].style.opacity = 0;
        playerBadges[i].style.width = '300px';
        $(playerBadges[i]).fadeTo('slow', 1);
    }

    playerBadges[0].style.top = yIn + 'px';
    playerBadges[0].style.left = xIn + 'px';
    playerBadges[1].style.top = yIn + 'px';
    playerBadges[1].style.right = xIn + 'px';
}

function badgesOut() {
    playerBadges[0].removeAttribute('style');
    playerBadges[1].removeAttribute('style');
}


function cleanUp() {

    fadeOut(placar1);
    fadeOut(placar2);
    fadeOut(jogadas1);
    fadeOut(jogadas2);

    jogadas1.innerHTML = "";
    jogadas2.innerHTML = "";

}

function fadeOut(el) {
    el.classList.add('hidden');
} // classe de destaque para pontuações altas


//falta remover a classe disabled do playButton ao terminar o jogo e reverter gameStarted


function resetScore() {

    if (gameStarted) {
        playButton.classList.remove('disabled');
        clock.setTime(60);
        clock.stop();
        gameStarted = false;
        cleanUp();
        badgesIn();
        renderedData = [];
        isRunning = false;
        score1 = 0;
        score2 = 0;
        // momentoAtual = moment();
    }

}

function victory() {
    var winner;

    isRunning = false;

    if (score1 > score2) {
        winner = 'Player 1';
    } else if (score2 > score1) {
        winner = 'Player 2';
    } else if (score1 == score2) {
        winner = 'Empate!';
    } else {
        winner = undefined;
    }

    if (clock.getTime() == 0) {

        if (winner == 'Player 1') {
            winscreen = $('#victory-screen-1')[0];
            winscreen.classList.remove('hidden');
            estrelas = getStars(winscreen);
        } else if (winner == 'Player 2') {
            winscreen = $('#victory-screen-2')[0];
            winscreen.classList.remove('hidden');
            getStars(winscreen);
            estrelas = getStars(winscreen);
        } else {
            winscreen = $('#tie-screen')[0];
            winscreen.classList.remove('hidden');
            getStars(winscreen);
            estrelas = getStars(winscreen);
        }
        estrelas.play();
    } else {
        return console.log('Jogo resetado. Sem vencedor.');
    }
}

function updateScore(ponto, player) {
    if (player == 2) {
        score2 += ponto;
        placar2.innerHTML = score2;
    } else if (player == 1) {
        score1 += ponto;
        placar1.innerHTML = score1;
    }

}

function tryAgain(){
    //dívida tecnica (precisa melhorar)
    winscreen = $('#victory-screen-1')[0];
    winscreen2 = $('#victory-screen-2')[0];
    winscreen3 = $('#tie-screen')[0];

    winscreen.classList.add('hidden');
    winscreen2.classList.add('hidden');
    winscreen3.classList.add('hidden');
    resetScore();
    estrelas.pause();
}

function showScore() {
    placar1.innerHTML = 0;
    placar2.innerHTML = 0;
    placar1.classList.remove('hidden');
    placar2.classList.remove('hidden');
    jogadas1.classList.remove('hidden');
    jogadas2.classList.remove('hidden');
}