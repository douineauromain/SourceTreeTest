<?php
require '../flight/Flight.php';
require_once('../PHP/apiclass.php');
header('Content-Type : application/json');

Flight::route('POST /CreateStudent/', function(){
    $tl = new TimeLine();
    $user = Flight::request()->getBody();
    $tl->CreateStudent($user);
});

Flight::route('POST /CreateNote/@name', function($name){ //{"Note":10,"Matiere":"Math"}
    $tl = new TimeLine();
    $note = Flight::request()->data->Note;
    $matiere = Flight::request()->data->Matiere;
    $tl->CreateNote($name,$note,$matiere);
});

Flight::route('GET /GetAllNotes/@name', function($name){
    $tl = new TimeLine();
    $tl->GetAllNotes($name);
});

Flight::route('GET /GetAllStudents', function(){
    $tl = new TimeLine();
    $tl->GetAllStudents();
});
Flight::start();
?>