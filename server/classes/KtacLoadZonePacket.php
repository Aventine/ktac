<?php
class KtacLoadZonePacket extends KtacPacket {

  public $packetName = "KtacLoadZonePacket";
  public $requiredVars = array("zone");


  function process() {
    parent::validate();

    $zone = $this->validateNumeric("zone", $this->vars['zone']);

    $zone = new KtacZone($zone);

    $tiles = array();
    foreach($zone->tiles as $x => $xtiles) {
      foreach($xtiles as $y => $ytiles) {
        foreach($ytiles as $z => $tiletype) {
          $tile = new stdClass();
          $tile->x = $x;
          $tile->y = $y;
          $tile->z = $z;
          $tile->tiletype = $tiletype;
          $tiles[] = $tile;
        }
      }
    }

    $response = new stdClass();
    $response->type = "success";
    $response->tiles = $tiles;
    drupal_json_output($response);
    exit;
  }
}