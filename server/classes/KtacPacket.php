<?php
class KtacPacket {

  public $packetName = "KtacPacket";
  public $requiredVars = array();
  public $vars = array();

  function validate() {

    foreach($this->requiredVars as $requiredVar) {
      $value = $this->getPost($requiredVar, null);
      if($value === null) {
        $this->errorResponse("missing var " . $requiredVar . ".");
      }
      $this->vars[$requiredVar] = $value;
    }
  }

  function getPost($varname, $default = "") {

    if(!isset($_POST[$varname])) {
      return $default;
    }
    return $_POST[$varname];
  }

  function errorResponse($message) {
    $response = new stdClass();
    $response->type = "error";
    $response->message = "Error: Packet " . $this->packetName . ": " . $message;
    drupal_json_output($response);
    exit;
  }

  function validateNumeric($varName, $var) {
    if(!is_numeric($var)) {
      $this->errorResponse($varName . " must be numeric, was " . $var);
    }
    return $var;
  }
}