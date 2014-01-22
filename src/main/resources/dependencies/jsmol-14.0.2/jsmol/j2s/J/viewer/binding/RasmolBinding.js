Clazz.declarePackage ("J.viewer.binding");
Clazz.load (["J.viewer.binding.JmolBinding"], "J.viewer.binding.RasmolBinding", null, function () {
c$ = Clazz.declareType (J.viewer.binding, "RasmolBinding", J.viewer.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.viewer.binding.RasmolBinding, []);
this.set ("selectOrToggle");
});
$_V(c$, "setSelectBindings", 
function () {
this.bindAction (33040, 30);
this.bindAction (33041, 35);
});
});
