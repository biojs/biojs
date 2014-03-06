Clazz.declarePackage ("JSV.common");
c$ = Clazz.decorateAsClass (function () {
this.x1 = 0;
this.y1 = 0;
this.x2 = 0;
this.y2 = 0;
Clazz.instantialize (this, arguments);
}, JSV.common, "ZoomEvent");
Clazz.makeConstructor (c$, 
function (x1, y1, x2, y2) {
this.x1 = x1;
this.y1 = y1;
this.x2 = x2;
this.y2 = y2;
}, "~N,~N,~N,~N");
