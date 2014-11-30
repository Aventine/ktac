function KtacDirtBlock(loc) {

  KtacBlock.call(this, loc);

  this.name = "Dirt Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/DirtBlock/dirtPath_171.jpg";

  this.init();
} KtacDirtBlock.prototype = Object.create(KtacBlock.prototype);

KtacDirtBlock.prototype.className = "KtacDirtBlock";