var gameStarted = false;
var playButton = document.getElementById('play');
var resetButton = document.getElementById('reset');

var sectionPlayer1 = $('.player1-section');
var sectionPlayer2 = $('.player2-section');
var placar1 = $(sectionPlayer1).children('.placar-total').children('h1')[0];
var placar2 = $(sectionPlayer2).children('.placar-total').children('h1')[0];
var jogadas1 = $(sectionPlayer1).children('.container-pontos')[0];
var jogadas2 = $(sectionPlayer2).children('.container-pontos')[0];

var playerBadges = $('body>img');
var monitoring;

var score1 = 0;
var score2 = 0;

playButton.addEventListener('click', play);
resetButton.addEventListener('click', resetScore);
document.addEventListener('DOMContentLoaded', initialize);


function play() {
    if (!gameStarted) {
        playButton.classList.add('disabled');
        badgesOut();
        resetScore();
        showScore();
        clock.start();
        // ATENÇÃO \_(O.O)_/ em teste 
        momentoAtual = moment();
        monitoring = setInterval('fetchJson(url)', 100);
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
    playerBadges[0].removeAttribute('style');
    playerBadges[1].removeAttribute('style');
    playerBadges[1].removeAttribute('style');
}


function cleanUp() {

    var promise = new Promise(function (resolve, reject) {

        function fade() {
            fadeOut(placar1);
            fadeOut(placar2);
            fadeOut(jogadas1);
            fadeOut(jogadas2);
        }

        fade();

        setTimeout(() => resolve(), 10);
    });
    promise.then(function () {
        placar1.innerHTML = "";
        placar2.innerHTML = "";
        jogadas1.innerHTML = "";
        jogadas2.innerHTML = "";
    });
}

function fadeOut(el) {
    el.classList.add('hidden');
} // classe de destaque para pontuações altas


//falta remover a classe disabled do playButton ao terminar o jogo e reverter gameStarted


function resetScore() {

    
    if (gameStarted) {
        playButton.classList.remove('disabled');
        clock.setTime(180);
        clock.stop();
        gameStarted = false;
        cleanUp();
        badgesIn();
        clearInterval(monitoring);
        
    }
    
    renderedData = [];
    placar1.innerHTML = "0";
    placar2.innerHTML = "0";
    
}

function victory() {
    var winner;

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
        console.log('Jogo encerrado. Vencedor = ' + winner);
    } else {
        clearInterval(monitoring);
        return console.log('Countdown não finalizado');
    }
}

function updateScore(ponto, playerScore) {

    playerScore += ponto;

    if (playerScore == score2) {
        sectionPlayer2[0].firstElementChild.innerHTML = '<h1>' + playerScore + '<h1>';
    } else if (playerScore == score1) {
        sectionPlayer1[0].firstElementChild.innerHTML = '<h1>' + playerScore + '<h1>';
    }

}

function showScore() {
    placar1.classList.remove('hidden');
    placar2.classList.remove('hidden');
    jogadas1.classList.remove('hidden');
    jogadas2.classList.remove('hidden');
}