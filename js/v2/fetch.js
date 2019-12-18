var url = "http://projetosmjv.com.br/esp8266/new_php/new-provider.php";
const PLAYER1 = 1;
const PLAYER2 = 2;
var renderedData = [];
var data;

//para controlar renderização ao longo do tempo
var momentoAtual;

//APENAS PARA TESTE / DESENVOLVIMENTO
// document.addEventListener('keydown', function(){
//     if(event.key = 'm'){
//         console.log('M pressionado');
//         momentoAtual = moment();
//     }
// });

function fetchJson(url) {
    $.getJSON(url, function (json) {
        data = json;
        renderJSON(getCurrentData(data));
        if (filteredData.length > 0) {
            //nada implementado ainda -> precisa de alguma coisa?
        }
    });
}

function renderJSON(data) {

    filteredData = data.filter(item => !containsObject(item, renderedData));

    for (var el in filteredData) {

        //-------- ponto ---------//
        let ponto = filteredData[el].Points;

        //-------- pai de todos --------//

        //-------- elemento pai --------//
        let jogada = document.createElement("div");
        jogada.className = 'jogada';
        jogada.setAttribute('data-aos', 'fade-up');

        //-------- filho <p></p> --------//
        let textoPonto = document.createElement('p');
        textoPonto.innerHTML = '+ ' + ponto + ' pts';

        //-------- filho <img> --------//
        let palmasImg = document.createElement('img');
        palmasImg.classList.add('hidden');
        palmasImg.setAttribute('src', './img/palmas.png');

        jogada.appendChild(textoPonto);
        jogada.appendChild(palmasImg);

        if (filteredData[el].Player == PLAYER1) {
            jogadas1.appendChild(jogada);
            updateScore(filteredData[el].Points, score1);
        } else if (filteredData[el].Player == PLAYER2) {
            jogadas2.appendChild(jogada);
            updateScore(filteredData[el].Points, score2);
        } else if (filteredData[el].Player == null) {
            jogadas1.appendChild(jogada);
            updateScore(filteredData[el].Points, score1);
        }
        renderedData.push(filteredData[el]);
    }
}


//Falta implementar

function highlight(dadoJson, jogadaElement) {
    if (dadoJson.Pontos >= 30) {
        let palmasElement = $(jogadaElement).children("img");
        jogadaElement.classList.add('purple-highlight');
        palmasElement.classList.add('visible');
        palmasElement.classList.remove('hidden');
    }
}

//filtro do que já foi renderizado antes
function containsObject(obj, list) {
    for (i = 0; i < list.length; i++) {
        if (list[i].Time === obj.Time) {
            return true;
        }
    }
    return false;
}

//função de seleção de dados atuais
function getCurrentData(data) {
    let currentData = [];
    currentData = data.filter(item => moment(item.Time) >= momentoAtual);
    console.log(currentData);
    return currentData;
}