function KtacUndefinedCube(loc) {

  KtacTerrainCube.call(this, loc);
  
  this.name = "Undefined Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";

  this.init();
} KtacUndefinedCube.prototype = Object.create(KtacTerrainCube.prototype);