Clazz.declarePackage ("J.viewer.binding");
Clazz.load (["J.viewer.binding.JmolBinding"], "J.viewer.binding.DragBinding", null, function () {
c$ = Clazz.declareType (J.viewer.binding, "DragBinding", J.viewer.binding.JmolBinding);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, J.viewer.binding.DragBinding, []);
this.set ("drag");
});
$_V(c$, "setSelectBindings", 
function () {
this.bindAction (33040, 30);
this.bindAction (33041, 35);
this.bindAction (33048, 34);
this.bindAction (33049, 32);
this.bindAction (4368, 31);
this.bindAction (8464, 13);
this.bindAction (33040, 17);
});
});
