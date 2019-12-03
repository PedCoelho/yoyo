<?php

setlocale (LC_ALL,'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set("America/Sao_Paulo");
// $TimeStamp = "<div class='wrapper' data-aos='fade-up'><h2>" . date('l jS \of F Y - ') . (date("H")-1) . ":". date("i:") . date("sa") . "</h2>";

$TimeStampLocal = "<div class='wrapper' data-aos='fade-up'><h2>" . ucwords(strftime('%A ')) . strftime('%d de ') . ucwords(strftime('%B')) . " de " . strftime('%Y') . " - " . (date("H")-1) . ":". date("i:") . date("sa") . "</h2>";

$TimeStampLocal = mb_convert_encoding($TimeStampLocal, 'UTF-8');
	
$var1 = $_REQUEST['Message'];
$var2 = $_REQUEST['Timespan'];
$var2 = $_REQUEST['Pontos'];

$WriteMyRequest="<div class='container'><h3 class='titulo'>Yo-Yo Girando!</h3>" . "<p>" . $var1 . "</p>" . "</div></div>" ;

$myObj = new stdClass();
$myObj -> Time = $TimeStampLocal;
$myObj -> Message = $WriteMyRequest;
$myJson = json_encode($myObj);

file_put_contents('esp8266.json', $myJson, FILE_APPEND);
$updatedJson = file_get_contents('esp8266.json');
echo $updatedJson;

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