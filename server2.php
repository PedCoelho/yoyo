<?php

setlocale (LC_ALL,'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set("America/Sao_Paulo");

$timestamp = "<h2>" . ucwords(strftime('%A ')) . strftime('%d de ') . ucwords(strftime('%B')) . " de " . strftime('%Y') . " - " . (date("H")-1) . ":". date("i:") . date("sa") . "</h2>";
$timestamp = mb_convert_encoding($timestamp, 'UTF-8');
	
$var1 = $_REQUEST['Message'];
$var2 = $_REQUEST['Timespan'];
$var3 = ceil(($var2*$var2)/100000);

$write1="<h3 class='titulo'>Yo-Yo Girando!</h3>" . "<p>" . $var1 . "</p>";
$write2="<h3 class='titulo'>Tempo girando:</h3>" . "<p>" . $var2 . " ms</p>";
$write3="<h3 class='titulo'>Pontos:</h3>" . "<p>" . $var3 . "</p>";

$myObj = new stdClass();
$myObj -> Time = $timestamp;
$myObj -> Message = $write1;
$myObj -> Timespan = $write2;
$myObj -> Points = $write3;

$myJson = json_encode($myObj);

$currentJson = file_get_contents('esp8266.json');

if(empty($currentJson)){
    file_put_contents('esp8266.json', $myJson, FILE_APPEND);
    echo file_get_contents('esp8266.json');
}else{
    $newJson =  $currentJson . "," . $myJson;
    file_put_contents('esp8266.json', $newJson);
    echo file_get_contents('esp8266.json');
}

//último processo
$updatedJson = "[" . file_get_contents('esp8266.json') . "]";
echo $updatedJson;

?>