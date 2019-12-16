
var url = "http://projetosmjv.com.br/esp8266/json-provider.php";
const PLAYER1 = 1;
const PLAYER2 = 2;
var renderedData = [];
var data;


setInterval('fetchJSON(url)', 200);    


function containsObject(obj, list) {
 
    for (i = 0; i < list.length; i++) {
        if (list[i].Time === obj.Time) {
            return true;
        }
    }
    return false;
}

function fetchJSON(url){
    $.getJSON(url, function (json) {
        data = JSON.parse(json);
        renderJSON(data);
        if(filteredData.length > 0){
            scrolled = false;
            updateScroll();
        }
    });
}

function renderJSON(data){
    wrappers = document.getElementsByClassName("wrapper");
    body = document.getElementById("corpo");

    lastWrapper = wrappers.length > 0 ? wrappers[-1] : null;
    filteredData = data.filter(item => !containsObject(item, renderedData));

    // console.log('rendered', renderedData);
    // console.log('filtered', filteredData);

    for(var el in filteredData){
        wrapper = document.createElement("div");
        wrapper.className = 'wrapper';
        wrapper.setAttribute('data-aos', 'fade-up');
        wrapper.innerHTML = filteredData[el].Time;

        container = document.createElement("div");
        container.className = 'container';
        container.innerHTML = filteredData[el].Message + filteredData[el].Timespan + filteredData[el].Points;

        wrapper.appendChild(container);

        if(filteredData[el].Player == PLAYER1){
            wrapper.className += 'playerOne';
        }else if(filteredData[el].Player == PLAYER2){
            wrapper.className += 'playerTwo'; 
        }

        if (lastWrapper) {
            $(lastWrapper).after(wrapper);
        }else{
            $(wrapper).appendTo(body);
        }

        renderedData.push(filteredData[el]);
    }
}
