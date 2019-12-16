<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
if(file_exists('esp8266.json')){
    $json = file_get_contents('esp8266.json');
    if(!empty($json)){
        $updatedJson = "[" . file_get_contents('esp8266.json') . "]";
        echo json_encode($updatedJson);
    }else{
        echo '"{"empty":"No record on file"}"';
    }
}else{
    echo 'esp8266.json does NOT exist.';
};
?>