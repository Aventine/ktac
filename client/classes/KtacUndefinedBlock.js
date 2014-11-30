function KtacUndefinedBlock(loc) {

  KtacBlock.call(this, loc);

  this.className = "KtacUndefinedBlock";
  this.name = "Undefined Block";
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";

} KtacUndefinedBlock.prototype = Object.create(KtacBlock.prototype);