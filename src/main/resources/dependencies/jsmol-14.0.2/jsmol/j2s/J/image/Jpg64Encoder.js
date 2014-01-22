Clazz.declarePackage ("J.image");
Clazz.load (["J.image.JpgEncoder"], "J.image.Jpg64Encoder", ["JU.Base64"], function () {
c$ = Clazz.decorateAsClass (function () {
this.outTemp = null;
Clazz.instantialize (this, arguments);
}, J.image, "Jpg64Encoder", J.image.JpgEncoder);
$_M(c$, "setParams", 
function (params) {
this.defaultQuality = 75;
this.outTemp = params.remove ("outputChannelTemp");
Clazz.superCall (this, J.image.Jpg64Encoder, "setParams", [params]);
}, "java.util.Map");
$_M(c$, "generate", 
function () {
var out0 = this.out;
this.out = this.outTemp;
Clazz.superCall (this, J.image.Jpg64Encoder, "generate", []);
var bytes = JU.Base64.getBytes64 (this.out.toByteArray ());
this.outTemp = null;
this.out = out0;
this.out.write (bytes, 0, bytes.length);
});
});
