Clazz.declarePackage ("J.awtjs");
c$ = Clazz.declareType (J.awtjs, "JSFont");
c$.newFont = $_M(c$, "newFont", 
function (fontFace, isBold, isItalic, fontSize) {
return null;
}, "~S,~B,~B,~N");
c$.getFontMetrics = $_M(c$, "getFontMetrics", 
function (graphics, font) {
return null;
}, "~O,~O");
c$.getAscent = $_M(c$, "getAscent", 
function (fontMetrics) {
return 0;
}, "~O");
c$.getDescent = $_M(c$, "getDescent", 
function (fontMetrics) {
return 0;
}, "~O");
c$.stringWidth = $_M(c$, "stringWidth", 
function (font, text) {
return 0;
}, "javajs.awt.Font,~S");
