Clazz.declarePackage ("J.util");
Clazz.load (["J.api.JmolPatternMatcher"], "J.util.PatternMatcher", ["java.util.regex.Pattern"], function () {
c$ = Clazz.declareType (J.util, "PatternMatcher", null, J.api.JmolPatternMatcher);
$_V(c$, "compile", 
function (sFind, isCaseInsensitive) {
return java.util.regex.Pattern.compile (sFind, isCaseInsensitive ? 2 : 0);
}, "~S,~B");
});
