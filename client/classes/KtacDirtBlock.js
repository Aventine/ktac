function KtacDirtBlock(loc) {

  KtacBlock.call(this, loc);

  this.className = "KtacDirtBlock";
  this.name = "Dirt Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/DirtBlock/dirtPath_171.jpg";

} KtacDirtBlock.prototype = Object.create(KtacBlock.prototype);