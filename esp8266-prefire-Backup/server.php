<?php

setlocale (LC_ALL,'pt_BR', 'pt_BR.utf-8', 'pt_BR.utf-8', 'portuguese');
date_default_timezone_set("America/Sao_Paulo");

$timestamp = date('D M d Y ') . (date('H')-1) . ':' .  date('i:s');
	
$var1 = $_REQUEST['Message'];
$var2 = $_REQUEST['Timespan'];
$var3 = ceil(($var2*$var2)/10000);
$var4 = $_REQUEST['Player'];


$myObj = new stdClass();
$myObj -> Time = $timestamp;
$myObj -> Timespan = $var2;
$myObj -> Points = $var3;
$myObj -> Player = $var4;

$myJson = json_encode($myObj);

if(file_exists('new_esp8266.json')){

    $currentJson = file_get_contents('new_esp8266.json');

    if(!empty($currentJson)){
        $newJson =  $currentJson . "," . $myJson;
        file_put_contents('new_esp8266.json', $newJson);
    }else{
        file_put_contents('new_esp8266.json', $myJson, FILE_APPEND);
    }
}else{
    $currentJson = file_put_contents('new_esp8266.json', $myJson, FILE_APPEND);

}
//último processo
$updatedJson = "[" . file_get_contents('new_esp8266.json') . "]";
echo $updatedJson;
?>