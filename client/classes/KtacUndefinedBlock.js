function KtacUndefinedBlock(loc) {

  KtacBlock.call(this, loc);
  
  this.name = "Undefined Cube";
  this.texture = KTAC_CLIENT_LINK + "assets/Missing/missing.jpg";
  this.blockId = KtacUndefinedBlock.blockId;

  this.init();
} KtacUndefinedBlock.prototype = Object.create(KtacBlock.prototype);
