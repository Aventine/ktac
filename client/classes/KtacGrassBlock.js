function KtacGrassBlock(loc) {

  KtacBlock.call(this, loc);

  this.className = "KtacGrassBlock";
  this.name = "Grass Block";
  this.texture = KTAC_CLIENT_LINK + "assets/GrassBlock/grass1goodtextures128.jpg";

} KtacGrassBlock.prototype = Object.create(KtacBlock.prototype);
