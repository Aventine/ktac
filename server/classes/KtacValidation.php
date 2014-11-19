<?php

class KtacValidation {
  static function requireInteger($value) {
    if(!is_int($value)) {
      $message = "Integer required, was " . htmlentities($value);     
      self::errorOut($message);
    }
    
    return $value;
  }
  
  static function requireName($value) {
    if(!preg_match("/^[a-zA-Z0-9 ]+$/", $value) ||
        $value != trim($value)) {
      $message = "Valid name string required, was " . htmlentities($value);     
      self::errorOut($message);
    }
    
    return $value;
  }
  
  static function errorOut($message) {
    $ex = new Exception($message);
    print_r($ex->getTrace());
    throw $ex;
  }
}
