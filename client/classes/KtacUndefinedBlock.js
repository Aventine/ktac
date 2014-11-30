function KtacUndefinedBlock(loc) {

  KtacBlock.call(this, loc);

  this.name = "Undefined Block";
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";

  this.init();
} KtacUndefinedBlock.prototype = Object.create(KtacBlock.prototype);

KtacUndefinedBlock.prototype.className = "KtacUndefinedBlock";