<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
if(file_exists('new_esp8266.json')){
    $json = file_get_contents('new_esp8266.json');
    if(!empty($json)){
        $updatedJson = "[" . file_get_contents('new_esp8266.json') . "]";

        // json_encode está atrapalhando a formatacao - Substituido por echo sem a  funcao
        // echo json_encode($updatedJson);

        echo $updatedJson;
    }else{
        echo '"{"empty":"No record on file"}"';
    }
}else{
    echo 'new_esp8266.json does NOT exist.';
};
?>