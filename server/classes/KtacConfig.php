<?php

class KtacConfig {

  static $actorTypes = array(
    0 => "KtacActor",
    1 => "KtacSiamese1",
    2 => "KtacTree1",
  	3 => "KtacLogpile",
  );
  
  static $blockTypes = array(
    0 => "KtacUndefinedBlock",
    1 => "KtacDirtBlock",
    2 => "KtacGrassBlock",
  );
  
  static function getJson() {
    $result = new stdClass();
    $result->actorTypes = self::$actorTypes;
    $result->blockTypes = self::$blockTypes;
    return json_encode($result);
  }
}
