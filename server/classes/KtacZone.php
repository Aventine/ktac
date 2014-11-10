<?php
class KtacZone {

  public $blocks = null;

  function __construct($zoneId) {
    
    $results = db_select('ktac_block')
    ->fields('ktac_block')
    ->condition('zone', $zoneId, '=')
    ->execute();

    $this->blocks = array();
    while($result = $results->fetchAssoc()) {
      if(!is_array($this->blocks[$result["x"]])) {
        $this->blocks[$result["x"]] = array();
      }
      if(!is_array($this->blocks[$result["y"]])) {
        $this->blocks[$result["y"]] = array();
      }
      $this->blocks[$result["x"]][$result["y"]][$result["z"]] = $result['blocktype'];
    }
  }
}