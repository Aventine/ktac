function KtacDirtBlock(loc) {

  KtacBlock.call(this, loc);
  
  this.name = "Dirt Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/DirtBlock/dirtPath_171.jpg";
  this.blockId = KtacDirtBlock.blockId;

  this.init();
} KtacDirtBlock.prototype = Object.create(KtacBlock.prototype);

KtacDirtBlock.blockId = 1;
KtacBlock.registerBlockType(KtacDirtBlock);