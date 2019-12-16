var gameStarted = false;
var playButton = document.getElementById('play');
var resetButton = document.getElementById('reset');
var sectionPlayer1 = $('.player1-section');
var sectionPlayer2 = $('.player2-section');
var playerBadges = $('body>img');

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
        clock.start();

        gameStarted = true;
    } else {}
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
    var placar1 = $(sectionPlayer1).children('.placar-total').children('h1')[0];
    var placar2 = $(sectionPlayer2).children('.placar-total').children('h1')[0];
    var jogadas1 = $(sectionPlayer1).children('.container-pontos')[0];
    var jogadas2 = $(sectionPlayer2).children('.container-pontos')[0];
    var promise = new Promise(function (resolve, reject) {

        function fade() {
            fadeOut(placar1);
            fadeOut(placar2);
            fadeOut(jogadas1);
            fadeOut(jogadas2);
        }

        fade();

        setTimeout(() => resolve(), 210);
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


//Falta implementar

function highlight(dadoJson, jogadaElement) {
    if (dadoJson.Pontos >= 30) {
        let palmasElement = $(jogadaElement).children("img");
        jogadaElement.classList.add('purple-highlight');
        palmasElement.classList.add('visible');
        palmasElement.classList.remove('hidden');
    }
}

//falta remover a classe disabled do playButton ao terminar o jogo e reverter gameStarted


if (!gameStarted) {
    playButton.classList.remove('disabled');
}

function resetScore() {
    var placar1 = $(sectionPlayer1).children('.placar-total').children('h1')[0];
    var placar2 = $(sectionPlayer2).children('.placar-total').children('h1')[0];

    if (gameStarted) {
        playButton.classList.remove('disabled');
        clock.reset(function() {});
        console.log('reset');
        gameStarted = false;
    }

    // cleanUp();
    placar1.innerHTML = "0";
    placar2.innerHTML = "0";
    placar1.classList.remove('hidden');
    placar2.classList.remove('hidden');

}

