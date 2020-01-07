var url = "http://projetosmjv.com.br/esp8266/new-provider.php";
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
        if(!isRunning) {
            return
        }

        data = json;
        renderJSON(getCurrentData(data));
        
        fetchJson(url);
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
            updateScore(filteredData[el].Points, 1);
            highlight(filteredData[el].Points, jogada, palmasImg);
        } else if (filteredData[el].Player == PLAYER2) {
            jogadas2.appendChild(jogada);
            updateScore(filteredData[el].Points, 2);
            highlight(filteredData[el].Points, jogada, palmasImg);

        } else if (filteredData[el].Player == null) {
            jogadas1.appendChild(jogada);
            updateScore(filteredData[el].Points, 1);
        }
        renderedData.push(filteredData[el]);
    }
}


//Falta implementar

function highlight(dadoJson, jogadas , palmas) {
    if (dadoJson >= 350) {
        jogadas.classList.add('purple-highlight');
        palmas.classList.remove('hidden');
        // palmas.classList.add('visible');
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
    // console.log(currentData);
    return currentData;
}