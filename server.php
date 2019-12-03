<?php

/*
  ESP8266: send data to your Domain(or mine)
  Embedded-iot.net/dht11/dataCollector.php

  Uses POST command to send DHT data to a designated website
  The circuit:
  * DHT
  * Post to Domain

   Stephen Borsay
   Embedded-iot.net
   www.udemy.com/all-about-arduino-wireless
   https://www.hackster.io/detox
   https://github.com/sborsay/Arduino_Wireless
*/

setlocale (LC_ALL,'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');

date_default_timezone_set("America/Sao_Paulo");

$TimeStampLocal = "<div class='wrapper' data-aos='fade-up'><h2>" . ucwords(strftime('%A ')) . strftime('%d de ') . ucwords(strftime('%B')) . " de " . strftime('%Y') . " - " . (date("H")-1) . ":". date("i:") . date("sa") . "</h2>";

echo $TimeStampLocal;

$TimeStampLocal = mb_convert_encoding($TimeStampLocal, 'UTF-8');

file_put_contents('esp8266.html', $TimeStampLocal, FILE_APPEND);



   if( $_REQUEST["Message"] || $_REQUEST["timespan"] || $_REQUEST["Pontos"] ) 
   {
   echo " Mensagem: ". $_REQUEST['Message']. "<br />";
   // echo " Timespan: ". $_REQUEST['Timespan']. "<br />";
   // echo " Pontos: ". $_REQUEST['Pontos']. "<br />";
   }
	
$var1 = $_REQUEST['Message'];
$var2 = $_REQUEST['Timespan'];
$var2 = $_REQUEST['Pontos'];

$WriteMyRequest=
"<div class='container'><h3 class='titulo'>Yo-Yo Girando!</h3>" . "<p>" . $var1 . "</p>" . "</div></div>" ;
// .
// "<div class='container'><h3 class='titulo'>Tempo girando:</h3>" . "<p>" . $var2 . "</p>" . "</div>" .
// "<div class='container'><h3 class='titulo'>Pontos:</h3>" . "<p>" . $var3 . "</p>" . "</div>";

file_put_contents('esp8266.html', $WriteMyRequest, FILE_APPEND);

// appendHTML();

// function appendHTML() {
 
// $html = file_get_contents('esp8266.html');

// libxml_use_internal_errors(true);

// $doc = new DOMDocument(); 
// $doc->loadHTML($html);

// //get the element you want to append to
// $body = $doc->getElementById('corpo');
// //create the fragment
// $fragment = $doc->createDocumentFragment();
// //add content to fragment
// $fragment->appendXML($WriteMyRequest);
// //actually append the element
// $body->appendChild($fragment);

// echo $doc->saveHTML();

// }

?>