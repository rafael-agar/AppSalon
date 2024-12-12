<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

function esUltimo($actual, $proximo){
    if ($actual !== $proximo){
        return true;
    }
    return false;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

function isAuth() : void {
    if(!isset($_SESSION['login'])){
        header('Location: /');
    }
}

function isAdmin(): void{
    
    if(!isset($_SESSION['admin']) ) {
        header('Location: /');
    }
}