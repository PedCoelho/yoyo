var json;

function fetchJson(){
 

    $.getJSON("http://projetosmjv.com.br/esp8266/esp8266.json", function (data) {
          console.log('pegueiJson');
          json = data;
        }
    );
}