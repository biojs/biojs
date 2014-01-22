Clazz.declarePackage ("JSV.popup");
Clazz.load (["JSV.popup.PopupResource"], "JSV.popup.JSVPopupResourceBundle", ["JU.SB"], function () {
c$ = Clazz.declareType (JSV.popup, "JSVPopupResourceBundle", JSV.popup.PopupResource);
$_V(c$, "getMenuName", 
function () {
return "appMenu";
});
$_V(c$, "buildStructure", 
function () {
this.addItems (JSV.popup.JSVPopupResourceBundle.menuContents);
this.addItems (JSV.popup.JSVPopupResourceBundle.structureContents);
});
$_V(c$, "getWordContents", 
function () {
var words = [];
return words;
});
$_V(c$, "getMenuAsText", 
function (title) {
return "# Jmol.mnu " + title + "\n\n" + "# Part I -- Menu Structure\n" + "# ------------------------\n\n" + this.dumpStructure (JSV.popup.JSVPopupResourceBundle.menuContents) + "\n\n" + "# Part II -- Key Definitions\n" + "# --------------------------\n\n" + this.dumpStructure (JSV.popup.JSVPopupResourceBundle.structureContents) + "\n\n" + "# Part III -- Word Translations\n" + "# -----------------------------\n\n" + this.dumpWords ();
}, "~S");
$_M(c$, "dumpWords", 
($fz = function () {
var wordContents = this.getWordContents ();
var s =  new JU.SB ();
for (var i = 0; i < wordContents.length; i++) {
var key = wordContents[i++];
if (this.structure.getProperty (key) == null) s.append (key).append (" | ").append (wordContents[i]).appendC ('\n');
}
return s.toString ();
}, $fz.isPrivate = true, $fz));
$_M(c$, "dumpStructure", 
($fz = function (items) {
var previous = "";
var s =  new JU.SB ();
for (var i = 0; i < items.length; i++) {
var key = items[i][0];
var label = this.words.getProperty (key);
if (label != null) key += " | " + label;
s.append (key).append (" = ").append (items[i][1] == null ? previous : (previous = items[i][1])).appendC ('\n');
}
return s.toString ();
}, $fz.isPrivate = true, $fz), "~A");
Clazz.defineStatics (c$,
"menuContents", [["appMenu", "Toggle_Grid Toggle_X_Axis Toggle_Y_Axis Toggle_Coordinates Reverse_Plot - Next_View Previous_View Clear_Views Reset_View Set_Zoom... - Views... Overlay_Offset... Script... - Properties"], ["appletMenu", "_SIGNED_FileMenu ViewMenu ZoomMenu Views... Overlay_Offset... - Measurements Peaks Integration Toggle_Trans/Abs Predicted_Solution_Colour - Script... - Print... - AboutMenu"], ["_SIGNED_FileMenu", "SaveAsMenu ExportAsMenu"], ["SaveAsMenu", "Original... JDXMenu CML XML(AnIML)"], ["JDXMenu", "XY DIF DIFDUP FIX PAC SQZ"], ["ExportAsMenu", "JPG PNG SVG PDF"], ["ViewMenu", "Toggle_Grid Toggle_X_Axis Toggle_Y_Axis Toggle_Coordinates Reverse_Plot Show_Header... Show_Overlay_Key... Window"], ["ZoomMenu", "Next_View Previous_View Reset_View Clear_Views Set_Zoom..."], ["AboutMenu", "VERSION"]],
"structureContents", [["Show_Header...", "showProperties"], ["Window", "window"], ["Show_Overlay_Key...", "showKey"], ["Next_View", "zoom next;showMenu"], ["Previous_View", "zoom prev;showMenu"], ["Clear_Views", "zoom clear"], ["Reset_View", "zoom out"], ["Views...", "view"], ["Overlay_Offset...", "stackOffsetY"], ["Script...", "script INLINE"], ["Set_Zoom...", "zoom"], ["Properties", "showProperties"], ["Toggle_X_Axis", "XSCALEON toggle;showMenu"], ["Toggle_Y_Axis", "YSCALEON toggle;showMenu"], ["Toggle_Grid", "GRIDON toggle;showMenu"], ["Toggle_Coordinates", "COORDINATESON toggle;showMenu"], ["Reverse_Plot", "REVERSEPLOT toggle;showMenu"], ["Measurements", "SHOWMEASUREMENTS"], ["Peaks", "SHOWPEAKLIST"], ["Integration", "SHOWINTEGRATION"], ["Toggle_Trans/Abs", "IRMODE TOGGLE"], ["Predicted_Solution_Colour", "GETSOLUTIONCOLOR"], ["Print...", "print"], ["Original...", "write SOURCE"], ["CML", "write CML"], ["XML(AnIML)", "write XML"], ["XY", "write XY"], ["DIF", "write DIF"], ["DIFDUP", "write DIFDUP"], ["FIX", "write FIX"], ["PAC", "write PAC"], ["SQZ", "write SQZ"], ["JPG", "write JPG"], ["SVG", "write SVG"], ["PNG", "write PNG"], ["PDF", "write PDF"]]);
});
