function KtacGrassBlock(loc) {

  KtacBlock.call(this, loc);

  this.name = "Grass Block";
  this.texture = KTAC_CLIENT_LINK + "assets/GrassBlock/grass1goodtextures128.jpg";

  this.init();
} KtacGrassBlock.prototype = Object.create(KtacBlock.prototype);

KtacGrassBlock.prototype.className = "KtacGrassBlock";