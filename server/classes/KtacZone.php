<?php
class KtacZone {

  public $tiles = null;

  function __construct($zoneId) {
    
    $results = db_select('ktac_block')
    ->fields('ktac_blcok')
    ->condition('zone', $zoneId, '=')
    ->execute();

    $this->tiles = array();
    while($result = $results->fetchAssoc()) {
      if(!is_array($this->tiles[$result["x"]])) {
        $this->tiles[$result["x"]] = array();
      }
      if(!is_array($this->tiles[$result["y"]])) {
        $this->tiles[$result["y"]] = array();
      }
      $this->tiles[$result["x"]][$result["y"]][$result["z"]] = $result['tiletype'];
    }
  }
}