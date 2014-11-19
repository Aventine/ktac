<?php

class KtacLocation {
  
  public $zone;
  public $x;
  public $y;
  public $z;
  
  function __construct($zone, $x, $y, $z) {
    
    if(is_object($zone)) {
      $js = $zone;
      $this->zone = KtacValidation::requireInteger($js->zone);
      $this->x = KtacValidation::requireInteger($js->x);
      $this->y = KtacValidation::requireInteger($js->y);
      $this->z = KtacValidation::requireInteger($js->z);
    } else {
      $this->zone = $zone;
      $this->x = $x;
      $this->y = $y;
      $this->z = $z;
    }
  }
  
}
