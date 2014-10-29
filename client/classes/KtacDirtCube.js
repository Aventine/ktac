function KtacDirtCube(loc) {

  KtacTerrainCube.call(this, loc);
  
  this.name = "Dirt Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/DirtCube/dirtPath_171.jpg";

  this.init();
} KtacDirtCube.prototype = Object.create(KtacTerrainCube.prototype);