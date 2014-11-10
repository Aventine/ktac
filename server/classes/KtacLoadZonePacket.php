<?php
class KtacLoadZonePacket extends KtacPacket {

  public $packetName = "KtacLoadZonePacket";
  public $requiredVars = array("zone");


  function process() {
    parent::validate();

    $zoneId = $this->validateNumeric("zone", $this->vars['zone']);

    $zone = new KtacZone($zoneId);

    $blocks = array();
    foreach($zone->blocks as $x => $xblocks) {
      foreach($xblocks as $y => $yblocks) {
        foreach($yblocks as $z => $blocktype) {
          $block = new stdClass();
          $block->zone = $zoneId;
          $block->x = $x;
          $block->y = $y;
          $block->z = $z;
          $block->blocktype = $blocktype;
          $blocks[] = $block;
        }
      }
    }

    $response = new stdClass();
    $response->type = "success";
    $response->blocks = $blocks;
    drupal_json_output($response);
    exit;
  }
}