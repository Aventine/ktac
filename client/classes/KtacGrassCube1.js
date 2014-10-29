function KtacGrassCube1(loc) {

  KtacTerrainCube.call(this, loc);
  
  this.name = "Grass Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/GrassCube1/grass1goodtextures128.jpg";

  this.init();
} KtacGrassCube1.prototype = Object.create(KtacTerrainCube.prototype);