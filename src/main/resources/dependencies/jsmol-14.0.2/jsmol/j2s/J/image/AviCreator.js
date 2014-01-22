Clazz.declarePackage ("J.image");
Clazz.load (["J.api.JmolMovieCreatorInterface"], "J.image.AviCreator", null, function () {
c$ = Clazz.decorateAsClass (function () {
this.errorMsg = null;
Clazz.instantialize (this, arguments);
}, J.image, "AviCreator", null, J.api.JmolMovieCreatorInterface);
$_V(c$, "createMovie", 
function (viewer, files, width, height, fps, fileName) {
return this.errorMsg;
}, "J.viewer.Viewer,~A,~N,~N,~N,~S");
});
