<?php
class KtacPacket {

  public $packetName = "KtacPacket";
  public $requiredVars = array();
  public $vars = array();
  public $rawData = stdClass;

  function __construct($packetData) {
    $this->rawData = json_decode($packetData);
  }

  // function validate() {
// 
    // foreach($this->requiredVars as $requiredVar) {
      // $value = $this->rawData->$requiredVar;
      // if($value === null) {
        // $this->errorResponse("missing var " . $requiredVar . ".");
      // }
      // $this->$requiredVar = $value;
    // }
//     
    // foreach($this->validation as $varName => $validationType) {
      // if(!isset($this->rawData->$varName)) {
        // $this->errorResponse("missing var " . varName . ".");
      // }
      // $value = $this->rawData->$varName;
      // switch($validationType) {
//           
        // case "validInteger":
          // $this->validateInteger($varName, $value);
          // break;
//           
        // case "validNumeric":
          // $this->validateNumeric($varName, $value);
          // break;
//           
        // default:
          // $this->errorResponse("Server-side code error: bad validation type: " . $validationType . ".");
          // break;  
      // }
//       
      // $this->$varName = $value;
    // }
  // }

  /*function getPost($varname, $default = "") {

    if(!isset($_POST[$varname])) {
      return $default;
    }
    return $_POST[$varname];
  }*/

  // function errorResponse($message) {
    // ktacAjaxErrorBailout("Packet " . $this->packetName . ": " . $message);
    // exit;
  // }
// 
  // function validateNumeric($varName, $var) {
    // if(!is_numeric($var)) {
      // $this->errorResponse($varName . " must be numeric, was " . print_r($var,1));
    // }
    // return $var;
  // }
//   
  // function validateInteger($varName, $var) {
    // if(!is_int($var)) {
      // $this->errorResponse($varName . " must be an integer, was " . print_r($var,1));
    // }
    // return $var;
  // }
}