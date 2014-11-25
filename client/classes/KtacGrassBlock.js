function KtacGrassBlock(loc) {

  KtacBlock.call(this, loc);
  
  this.name = "Grass Block";
  this.texture = KTAC_CLIENT_LINK + "assets/GrassBlock/grass1goodtextures128.jpg";
  this.blockId = KtacGrassBlock.blockId;

  this.init();
} KtacGrassBlock.prototype = Object.create(KtacBlock.prototype);
