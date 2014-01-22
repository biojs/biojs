// JSmolJavaExt.js
// will be wrapped by anonymous function using ANT in build_03_tojs.xml

// BH 12/4/2013 9:20:44 PM fix for reassigning Date.prototype.toString()
// BH 12/3/2013 11:43:10 AM bizarre Safari bug in reassigning Boolean (OK, I admit, we shouldn't have done that...) 
// BH 12/1/2013 6:50:16 AM evit Number.prototype.toString assignment removed!
// BH 11/30/2013 1:46:31 PM fixing Byte, Short, Long, Integer, Float, Double to reflect proper bounds and error conditions
// BH 11/29/2013 8:58:49 PM removing Boolean.toString(boolean)
// BH 11/4/2013 7:34:26 AM changing "var nativeClazz" to "var nativeClass" to avoid ANT replacement of "nativeClazz." to "nativeClazz_"
// BH 10/19/2013 1:29:27 PM fixed String.$replace()
// BH 10/18/2013 6:09:23 PM fixed (Double|Float).valueOf(NaN).valueOf(), which should return NaN, not throw an error
// BH 10/12/2013 11:18:44 AM fixed bug in Double(String) and Float(String) that was returning typeof "string"
// BH 10/10/2013 2:40:20 PM  added Math.log10   
// BH 7/23/2013 7:24:01 AM fixing Number.shortValue() and Number.byteValue() for negative values
// BH 6/16/2013 1:31:30 PM adding /| in String.replace -- thank you David Koes
// BH 3/13/2013 12:49:23 PM setting Boolean.valueOf() "@" 
// BH 3/2/2013 10:46:45 PM removed Double.valueOf(String)
// BH 11/6/2012 8:26:33 PM added instanceof Int32Array in String.instantialize
// BH 10/13/2012 11:38:07 PM corrected Integer.parseInt to allow only +-0123456789; created Integer.parseIntRadix
// BH 11/1/2012 added Short
// BH 9/10/2012 6:27:21 AM added java.net.URL... classes
// BH 1/7/2013 7:40:06 AM added Clazz.dateToString

Math.log10||(Math.log10=function(a){return Math.log(a)/2.302585092994046});

var ntsp = Number.prototype.toString; // don't touch this one

java.lang.Number=Number;
if(Clazz.supportsNativeObject){
  for(var i=0;i<Clazz.extendedObjectMethods.length;i++){
    var p=Clazz.extendedObjectMethods[i];
    Number.prototype[p]=JavaObject.prototype[p];
  }
}

Number.prototype.toString = ntsp;

Number.__CLASS_NAME__="Number";
Clazz.implementOf(Number,java.io.Serializable);
Number.equals=Clazz.innerFunctions.equals;
Number.getName=Clazz.innerFunctions.getName;


$_M(Number,"shortValue",
function(){
var x = Math.round(this)&0xffff;
return (this < 0 && x > 0 ? x - 0x10000 : x);
});

$_M(Number,"byteValue",
function(){
var x = Math.round(this)&0xff;
return (this < 0 && x > 0 ? x - 0x100 : x);
});

$_M(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

$_M(Number,"longValue",
function(){
return Math.round(this);
});

$_M(Number,"floatValue",
function(){
return this.valueOf();
});
$_M(Number,"doubleValue",
function(){
return parseFloat(this.valueOf());
});

$_V(Number,"hashCode",
function(){
return this.valueOf();
});

java.lang.Integer=Integer=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Integer,"Integer",Number,Comparable,null,true);
Integer.prototype.valueOf=function(){return 0;};
Integer.toString=Integer.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
} else if(this===Integer){
return"class java.lang.Integer";
}
return""+this.valueOf();
};

/*

Clazz.makeConstructor(Integer,
function(){
this.valueOf=function(){
return 0;
};
});
*/


$_k(Integer, function(v){
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseIntRadix(v, 10);
 this.valueOf=function(){return v;};
}); //BH
/*
Clazz.makeConstructor(Integer,
function(s){
var value=Integer.parseInt(s,10);
this.valueOf=function(){
return value;
};
},"String");
*/
Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
Integer.TYPE=Integer.prototype.TYPE=Integer;


$_M(Integer,"bitCount",
function(i) {
  i = i - ((i >>> 1) & 0x55555555);
  i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
  i = (i + (i >>> 4)) & 0x0f0f0f0f;
  i = i + (i >>> 8);
  i = i + (i >>> 16);
  return i & 0x3f;
},"Number");
Integer.bitCount=Integer.prototype.bitCount;

$_M(Integer,"numberOfLeadingZeros",
function(i) {
 if (i == 0) return 32;
 var n = 1;
 if (i >>> 16 == 0) { n += 16; i <<= 16; }
 if (i >>> 24 == 0) { n +=  8; i <<=  8; }
 if (i >>> 28 == 0) { n +=  4; i <<=  4; }
 if (i >>> 30 == 0) { n +=  2; i <<=  2; }
 n -= i >>> 31;
 return n;
},"Number");
Integer.numberOfLeadingZeros=Integer.prototype.numberOfLeadingZeros;

$_M(Integer,"numberOfTrailingZeros",
function(i) {
  if (i == 0) return 32;
  var n = 31;
  var y = i <<16; if (y != 0) { n = n -16; i = y; }
  y = i << 8; if (y != 0) { n = n - 8; i = y; }
  y = i << 4; if (y != 0) { n = n - 4; i = y; }
  y = i << 2; if (y != 0) { n = n - 2; i = y; }
  return n - ((i << 1) >>> 31);
},"Number");
Integer.numberOfTrailingZeros=Integer.prototype.numberOfTrailingZeros;

$_M(Integer,"parseIntRadix",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
if (radix == 10) {
	for (var i = s.length; --i >= 0;) {
	  var c = s.charCodeAt(i);
	  if (c >= 48 && c <= 57) continue;
	  if (i > 0 || c != 43 && c != 45)
		  throw new NumberFormatException("Not a Number : "+s);

	}
}
var i=parseInt(s,radix);
if(isNaN(i)){
throw new NumberFormatException("Not a Number : "+s);
}
return i;
},"String, Number");
Integer.parseIntRadix=Integer.prototype.parseIntRadix;

$_M(Integer,"parseInt",
function(s){
return Integer.parseIntRadix(s,10);
},"String");
Integer.parseInt=Integer.prototype.parseInt;

/*
$_M(Integer,"$valueOf",
function(s){
return new Integer(Integer.parseIntRadix(s,10));
},"String");
*/

$_V(Integer,"$valueOf",
function(s){
return new Integer(s);
});

/*
$_M(Integer,"$valueOf",
function(s,r){
return new Integer(Integer.parseIntRadix(s,r));
},"String, Number");
*/

Integer.$valueOf=Integer.prototype.$valueOf;


$_V(Integer,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Integer.toHexString=Integer.prototype.toHexString=function(d){
if(d.valueOf)d=d.valueOf();
if (d < 0) {
var b = d & 0xFFFFFF;
var c = ((d>>24)&0xFF);
return c._numberToString(16) + (b = b._numberToString(16)).substring(b.length - 6);
}
return d._numberToString(16);};
Integer.toOctalString=Integer.prototype.toOctalString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(8);};
Integer.toBinaryString=Integer.prototype.toBinaryString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(2);};

Integer.decodeRaw=$_M(Integer,"decodeRaw", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
// The general problem with parseInt is that is not strict -- ParseInt("10whatever") == 10.
// Number is strict, but Number("055") does not work, though ParseInt("055", 8) does.
n = Number(n);
return (radix == 8 ? parseInt(n, 8) : n);
},"~S");

Integer.decode=$_M(Integer,"decode", function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
  throw new NumberFormatException("Invalid Integer");
  return new Integer(n);
},"~S");

$_V(Integer,"hashCode",
function(){
return this.valueOf();
});

// Note that Long is problematic in JavaScript 

java.lang.Long=Long=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Long,"Long",Number,Comparable,null,true);
Long.prototype.valueOf=function(){return 0;};
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};

$_k(Long, function(v){
 v == null && (v = 0);
 v = (typeof v == "number" ? Math.round(v) : Integer.parseIntRadix(v, 10));
this.valueOf=function(){return v;};
});

//Long.MIN_VALUE=Long.prototype.MIN_VALUE=-0x8000000000000000;
//Long.MAX_VALUE=Long.prototype.MAX_VALUE=0x7fffffffffffffff;
Long.TYPE=Long.prototype.TYPE=Long;

$_M(Long,"parseLong",
function(s,radix){
 return Integer.parseInteger(s, radix || 10);
});

Long.parseLong=Long.prototype.parseLong;

$_V(Long,"$valueOf",
function(s){
return new Long(s);
});
/*
$_M(Long,"$valueOf",
function(s){
return new Long(s);
},"Number");

$_M(Long,"$valueOf",
function(s,r){
return new Long(Long.parseLong(s,r));
},"String, Number");
*/
Long.$valueOf=Long.prototype.$valueOf;
$_V(Long,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Long.toHexString=Long.prototype.toHexString=function(i){
return i.toString(16);
};
Long.toOctalString=Long.prototype.toOctalString=function(i){
return i.toString(8);
};
Long.toBinaryString=Long.prototype.toBinaryString=function(i){
return i.toString(2);
};


Long.decode=$_M(Long,"decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n))
    throw new NumberFormatException("Invalid Long");
  return new Long(n);
},"~S");

java.lang.Short = Short = function () {
Clazz.instantialize (this, arguments);
};
Clazz.decorateAsType (Short, "Short", Number, Comparable, null, true);
Short.prototype.valueOf = function () { return 0; };
Short.toString = Short.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Short) {
		return "class java.lang.Short"; // Short.class.toString
	}
	return "" + this.valueOf ();
};

$_k (Short,
function (v) {
 v == null && (v = 0);
 if (typeof v != "number")
  v = Integer.parseIntRadix(v, 10);
 v = v.shortValue();
 this.valueOf = function () {return v;};
});


Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
Short.TYPE = Short.prototype.TYPE = Short;

$_M(Short, "parseShortRadix",
function (s, radix) {
return Integer.parseIntRadix(s, radix).shortValue();
}, "String, Number");
Short.parseShortRadix = Short.prototype.parseShortRadix;

$_M(Short, "parseShort",
function (s) {
return Short.parseShortRadix (s, 10);
}, "String");

Short.parseShort = Short.prototype.parseShort;

/*
$_M(Short, "$valueOf",
function (s) {
return new Short(Short.parseShort (s, 10));
}, "String");
  */
  
$_V(Short, "$valueOf",
function (s) {
return new Short(s);
});

/*
$_M(Short, "$valueOf",
function (s, r) {
return new Short(Short.parseShort (s, r));
}, "String, Number");
  */
  
Short.$valueOf = Short.prototype.$valueOf;
$_V(Short, "equals",
function (s) {
if(s == null || !Clazz.instanceOf(s, Short) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
Short.toHexString = Short.prototype.toHexString = function (i) {
	return i.toString (16);
};
Short.toOctalString = Short.prototype.toOctalString = function (i) {
	return i.toString (8);
};
Short.toBinaryString = Short.prototype.toBinaryString = function (i) {
	return i.toString (2);
};
Short.decode = $_M(Short, "decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < -32768|| n > 32767)
    throw new NumberFormatException("Invalid Short");
  return new Short(n);
}, "~S");

java.lang.Byte=Byte=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Byte,"Byte",Number,Comparable,null,true);
Byte.prototype.valueOf=function(){return 0;};
Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};
Clazz.makeConstructor(Byte,
function(v){
 if (typeof v != "number")
   v = Integer.parseIntRadix(v, 10);
 v = v.byteValue();
this.valueOf=function(){
return v;
};
});

Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
Byte.TYPE=Byte.prototype.TYPE=Byte;

$_M(Byte,"parseByteRadix",
function(s,radix){
 return Integer.parseIntRadix(s, radix).byteValue();
},"String, Number");
Byte.parseByteRadix=Byte.prototype.parseByteRadix;

$_M(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
},"String");

Byte.parseByte=Byte.prototype.parseByte;

$_V(Byte, "$valueOf",
function (s) {
return new Byte(s);
});

Byte.$valueOf=Byte.prototype.$valueOf;
$_V(Byte,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Byte.toHexString=Byte.prototype.toHexString=function(i){
return i.toString(16);
};
Byte.toOctalString=Byte.prototype.toOctalString=function(i){
return i.toString(8);
};
Byte.toBinaryString=Byte.prototype.toBinaryString=function(i){
return i.toString(2);
};
Byte.decode=$_M(Byte,"decode",
function(n){
  n = Integer.decodeRaw(n);
  if (isNaN(n) || n < -128|| n > 127)
    throw new NumberFormatException("Invalid Byte");
return new Byte(n);
},"~S");

java.lang.Float=Float=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Float,"Float",Number,Comparable,null,true);
Float.prototype.valueOf=function(){return 0;};
Float.toString=Float.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Float){
return"class java.lang.Float";
}
return""+this.valueOf();
};

$_k(Float, function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Number(v);
 this.valueOf=function(){return v;}
});

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=3.4028235e+38;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=1.4e-45;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
Float.TYPE=Float.prototype.TYPE=Float;

$_M(Float,"parseFloat",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var floatVal=Number(s);
if(isNaN(floatVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return floatVal;
},"String");
Float.parseFloat=Float.prototype.parseFloat;

$_V(Float,"$valueOf",
function(s){
return new Float(s);
});

Float.$valueOf=Float.prototype.$valueOf;

$_M(Float,"isNaN",
function(num){
return isNaN(num);
},"Number");
Float.isNaN=Float.prototype.isNaN;
$_M(Float,"isInfinite",
function(num){
return!isFinite(num);
},"Number");
Float.isInfinite=Float.prototype.isInfinite;

$_V(Float,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

java.lang.Double=Double=function(){
Clazz.instantialize(this,arguments);
};
Clazz.decorateAsType(Double,"Double",Number,Comparable,null,true);
Double.prototype.valueOf=function(){return 0;};
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Double){
return"class java.lang.Double";
}
return""+this.valueOf();
};

$_k(Double, function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
  v = Double.parseDouble(v);
 this.valueOf=function(){return v;};
}); // BH

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
Double.TYPE=Double.prototype.TYPE=Double;

$_M(Double,"isNaN",
function(num){
return isNaN(num);
},"Number");
Double.isNaN=Double.prototype.isNaN;
$_M(Double,"isInfinite",
function(num){
return!isFinite(num);
},"Number");
Double.isInfinite=Double.prototype.isInfinite;

$_M(Double,"parseDouble",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var doubleVal=Number(s);
if(isNaN(doubleVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return doubleVal;
},"String");
Double.parseDouble=Double.prototype.parseDouble;

/*
$_M(Double,"$valueOf",
function(s){
return new Double(this.parseDouble(s));
},"String");
*/

$_M(Double,"$valueOf",
function(v){
return new Double(v);
},"Number");

Double.$valueOf=Double.prototype.$valueOf;

$_V(Double,"equals",
function(s){
if(s==null||!Clazz.instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");


java.lang.B00lean = Boolean;
Boolean = java.lang.Boolean = Boolean || function () {Clazz.instantialize (this, arguments);};
if (Clazz.supportsNativeObject) {
	for (var i = 0; i < Clazz.extendedObjectMethods.length; i++) {
		var p = Clazz.extendedObjectMethods[i];
		Boolean.prototype[p] = JavaObject.prototype[p];
	}
}
Boolean.__CLASS_NAME__="Boolean";
Clazz.implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
Boolean.equals=Clazz.innerFunctions.equals;
Boolean.getName=Clazz.innerFunctions.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;

//Clazz.makeConstructor(Boolean,
//function(value){
//this.valueOf=function(){
//return value;
//};
//},"~B");

Clazz.overrideConstructor(Boolean,
function(s){
  var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
  this.valueOf=function(){return b;};
},"~O");

Boolean.parseBoolean=$_M(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
},"~S");
$_M(Boolean,"booleanValue",
function(){
return this.valueOf();
});
Boolean.$valueOf=$_V(Boolean,"$valueOf",
function(b){
return(b?Boolean.TRUE:Boolean.FALSE);
});

/*
Boolean.toString=$_M(Boolean,"toString",
function(b){
return b?"true":"false";
},"~B");
*/

$_V(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
$_V(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
$_V(Boolean,"equals",
function(obj){
if(Clazz.instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
},"~O");
Boolean.getBoolean=$_M(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz.instanceOf(e,IllegalArgumentException)){
}else if(Clazz.instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
},"~S");
$_V(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
},"Boolean");
Boolean.toBoolean=$_M(Boolean,"toBoolean",
($fz=function(name){
return((name!=null)&&name.equalsIgnoreCase("true"));
},$fz.isPrivate=true,$fz),"~S");
Boolean.TRUE=Boolean.prototype.TRUE=new Boolean(true);
Boolean.FALSE=Boolean.prototype.FALSE=new Boolean(false);
Boolean.TYPE=Boolean.prototype.TYPE=Boolean;


Encoding=new Object();
Encoding.UTF8="utf-8";
Encoding.UTF16="utf-16";
Encoding.ASCII="ascii";


Encoding.guessEncoding=function(str){
if(str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF){
return Encoding.UTF8;
}else if(str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.readUTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[arrs.length]=str.charAt(i);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
i++;
var c2=str.charCodeAt(i)&0x3f;
i++;
var c3=str.charCodeAt(i)&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
return str;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}

var offset=0;
var arrs=new Array(offset+str.length-startIdx);

for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[offset+i-startIdx]=str.charAt(i);
}else if(charCode<=0x07ff){
var c1=0xc0+((charCode&0x07c0)>>6);
var c2=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2);
}else{
var c1=0xe0+((charCode&0xf000)>>12);
var c2=0x80+((charCode&0x0fc0)>>6);
var c3=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2)+String.fromCharCode(c3);
}
}
return arrs.join('');
};
Encoding.base64Chars=new Array(
'A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X',
'Y','Z','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n',
'o','p','q','r','s','t','u','v',
'w','x','y','z','0','1','2','3',
'4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2;
while(index<length){
c0=str.charCodeAt(index++);
buf[buf.length]=b64[c0>>2];
if(index<length){
c1=str.charCodeAt(index++);
buf[buf.length]=b64[((c0<<4)&0x30)|(c1>>4)];
if(index<length){
c2=str.charCodeAt(index++);
buf[buf.length]=b64[((c1<<2)&0x3c)|(c2>>6)];
buf[buf.length]=b64[c2&0x3F];
}else{
buf[buf.length]=b64[((c1<<2)&0x3c)];
buf[buf.length]='=';
}
}else{
buf[buf.length]=b64[(c0<<4)&0x30];
buf[buf.length]='=';
buf[buf.length]='=';
}
}
return buf.join('');
};
Encoding.decodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var xb64=Encoding.xBase64Chars;
if(Encoding.xBase64Chars==null){
xb64=new Object();
for(var i=0;i<b64.length;i++){
xb64[b64[i]]=i;
}
Encoding.xBase64Chars=xb64;
}
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2,c3;
var c=0;
while(index<length&&c++<60000){
c0=xb64[str.charAt(index++)];
c1=xb64[str.charAt(index++)];
c2=xb64[str.charAt(index++)];
c3=xb64[str.charAt(index++)];
buf[buf.length]=String.fromCharCode(((c0<<2)&0xff)|c1>>4);
if(c2!=null){
buf[buf.length]=String.fromCharCode(((c1<<4)&0xff)|c2>>2);
if(c3!=null){
buf[buf.length]=String.fromCharCode(((c2<<6)&0xff)|c3);
}
}
}
return buf.join('');
};

if(String.prototype.$replace==null){
java.lang.String=String;
if(Clazz.supportsNativeObject){
for(var i=0;i<Clazz.extendedObjectMethods.length;i++){
var p=Clazz.extendedObjectMethods[i];
if("to$tring"==p||"toString"==p||"equals"==p||"hashCode"==p){
continue;
}
String.prototype[p]=JavaObject.prototype[p];
}
}

Clazz.implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.getName=Clazz.innerFunctions.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;

String.prototype.$replace=function(c1,c2){
	if (c1 == c2 || this.indexOf (c1) < 0) return "" + this;
	if (c1.length == 1) {
    if ("\\$.*+|?^{}()[]".indexOf(c1) >= 0) 	c1 = "\\" + c1;
  } else {    
    c1=c1.replace(/([\\\$\.\*\+\|\?\^\{\}\(\)\[\]])/g,function($0,$1){return"\\"+$1;});
  }
  return this.replace(new RegExp(c1,"gm"),c2);
};
String.prototype.$generateExpFunction=function(str){
var arr=[];
var orders=[];
var idx=0;
arr[0]="";
var i=0;
for(;i<str.length;i++){
var ch=str.charAt(i);
if(i!=str.length-1&&ch=='\\'){
i++;
var c=str.charAt(i);
if(c=='\\'){
arr[idx]+='\\';
}
arr[idx]+=c;
}else if(i!=str.length-1&&ch=='$'){
i++;
orders[idx]=parseInt(str.charAt(i));
idx++;
arr[idx]="";
}else if(ch=='\r'){
arr[idx]+="\\r";
}else if(ch=='\n'){
arr[idx]+="\\n";
}else if(ch=='\t'){
arr[idx]+="\\t";
}else if(ch=='\"'){
arr[idx]+="\\\"";
}else{
arr[idx]+=ch;
}
}
var funStr="f = function (";
var max=Math.max.apply({},orders);
for(i=0;i<=max;i++){
funStr+="$"+i;
if(i!=max){
funStr+=", ";
}
}
funStr+=") { return ";
for(i=0;i<arr.length-1;i++){
funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
}
funStr+="\""+arr[i]+"\"; }";
var f=null;
eval(funStr)
return f;
};

String.prototype.replaceAll=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,this.$generateExpFunction(str));
};
String.prototype.replaceFirst=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,this.$generateExpFunction(str));
};
String.prototype.matches=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
String.prototype.regionMatches=function(ignoreCase,toffset,
other,ooffset,len){

if(typeof ignoreCase=="number"
||(ignoreCase!=true&&ignoreCase!=false)){
len=ooffset;
ooffset=other;
other=toffset;
toffset=ignoreCase;
ignoreCase=false;
}
var to=toffset;
var po=ooffset;

if((ooffset<0)||(toffset<0)||(toffset>this.length-len)||
(ooffset>other.length-len)){
return false;
}
var s1=this.substring(toffset,toffset+len);
var s2=other.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};



String.prototype.$plit=function(regex,limit){

if(limit!=null&&limit>0){
if(limit==1){
return this;
}
var regExp=new RegExp("("+regex+")","gm");
var count=1;
var s=this.replace(regExp,function($0,$1){
count++;
if(count==limit){
return"@@_@@";
}else if(count>limit){
return $0;
}else{
return $0;
}
});
regExp=new RegExp(regex,"gm");
var arr=this.split(regExp);
if(arr.length>limit){
arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
arr.length=limit;
}
return arr;
}else{
var regExp=new RegExp(regex,"gm");
return this.split(regExp);
}
};

String.prototype.trim=function(){
var len=this.length;
var st=0;

while((st<len)&&(this.charAt(st)<=' ')){
st++;
}
while((st<len)&&(this.charAt(len-1)<=' ')){
len--;
}
return((st>0)||(len<len))?this.substring(st,len):this;
};

String.prototype.trim=function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
};


String.prototype.startsWith_string_number=function(prefix,toffset){
var to=toffset;
var po=0;
var pc=prefix.length;

if((toffset<0)||(toffset>this.length-pc)){
return false;
}
while(--pc>=0){
if(this.charAt(to++)!=prefix.charAt(po++)){
return false;
}
}
return true;
};

String.prototype.startsWith=function(prefix){
if(arguments.length==1){
return this.startsWith_string_number(arguments[0],0);
}else if(arguments.length==2){
return this.startsWith_string_number(arguments[0],arguments[1]);
}else{
return false;
}
};

String.prototype.endsWith=function(suffix){
return this.startsWith(suffix,this.length-suffix.length);
};

String.prototype.equals=function(anObject){
return this.valueOf()==anObject;
};

String.prototype.equalsIgnoreCase=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


String.prototype.hash=0;

String.prototype.hashCode=function(){
var h=this.hash;
if(h==0){
var off=0;
var len=this.length;
for(var i=0;i<len;i++){
h=31*h+this.charCodeAt(off++);
h&=0xffffffff;
}
this.hash=h;
}
return h;
};

String.prototype.getBytes=function(){
if(arguments.length==4){
return this.getChars(arguments[0],arguments[1],arguments[2],arguments[3]);
}
var s=this;
if(arguments.length==1){
var cs=arguments[0].toString().toLowerCase();
var charset=[
"utf-8","UTF8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030","gbk"
];
var existed=false;
for(var i=0;i<charset.length;i++){
if(charset[i]==cs){
existed=true;
break;
}
}
if(!existed){
throw new java.io.UnsupportedEncodingException();
}
if(cs=="utf-8"||cs=="utf8"){
s=Encoding.convert2UTF8(this);
}
}
var arrs=new Array(s.length);
var c=0,ii=0;
for(var i=0;i<s.length;i++){
c=s.charCodeAt(i);
if(c>255){
arrs[ii]=0x1a;
arrs[ii+1]=c&0xff;
arrs[ii+2]=(c&0xff00)>>8;
ii+=2;
}else{
arrs[ii]=c;
}
ii++;
}
return arrs;
};

/*
String.prototype.compareTo=function(anotherString){
if(anotherString==null){
throw new java.lang.NullPointerException();
}
var len1=this.length;
var len2=anotherString.length;
var n=Math.min(len1,len2);
var k=0;
while(k<n){
var c1=this.charCodeAt(k);
var c2=anotherString.charCodeAt(k);
if(c1!=c2){
return c1-c2;
}
k++;
}
return len1-len2;
};

*/

String.prototype.contains = function(a) {return this.indexOf(a) >= 0}  // bh added
String.prototype.compareTo = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh added
  


String.prototype.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};
String.value0f=String.valueOf;
String.valueOf=function(o){
if(o=="undefined"){
return String.value0f();
}
if(o instanceof Array){
if(arguments.length==1){
return o.join('');
}else{
var off=arguments[1];
var len=arguments[2];
var oo=new Array(len);
for(var i=0;i<len;i++){
oo[i]=o[off+i];
}
return oo.join('');
}
}
return""+o;
};

String.prototype.subSequence=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

String.prototype.compareToIgnoreCase=function(str){
if(str==null){
throw new NullPointerException();
}
var s1=this.toUpperCase();
var s2=str.toUpperCase();
if(s1==s2){
return 0;
}else{
var s1=this.toLowerCase();
var s2=str.toLowerCase();
if(s1==s2){
return 0;
}else if(s1>s2){
return 1;
}else{
return-1;
}
}
};

String.prototype.contentEquals=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=this.length;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

String.prototype.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
if(dst==null){
throw new NullPointerException();
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};
String.prototype.$concat=String.prototype.concat;
String.prototype.concat=function(s){
if(s==null){
throw new NullPointerException();
}
return this.$concat(s);
};

String.prototype.$lastIndexOf=String.prototype.lastIndexOf;
String.prototype.lastIndexOf=function(s,last){
if(last!=null&&last+this.length<=0){
return-1;
}
if(last!=null){
return this.$lastIndexOf(s,last);
}else{
return this.$lastIndexOf(s);
}
};

String.prototype.intern=function(){
return this.valueOf();
};
String.copyValueOf=String.prototype.copyValueOf=function(){
if(arguments.length==1){
return String.instantialize(arguments[0]);
}else{
return String.instantialize(arguments[0],arguments[1],arguments[2]);
}
};
String.indexOf=function(source,sourceOffset,sourceCount,
target,targetOffset,targetCount,fromIndex){
if(fromIndex>=sourceCount){
return(targetCount==0?sourceCount:-1);
}
if(fromIndex<0){
fromIndex=0;
}
if(targetCount==0){
return fromIndex;
}

var first=target[targetOffset];
var i=sourceOffset+fromIndex;
var max=sourceOffset+(sourceCount-targetCount);

startSearchForFirstChar:
while(true){

while(i<=max&&source[i]!=first){
i++;
}
if(i>max){
return-1;
}


var j=i+1;
var end=j+targetCount-1;
var k=targetOffset+1;
while(j<end){
if(source[j++]!=target[k++]){
i++;

continue startSearchForFirstChar;
}
}
return i-sourceOffset;
}
};

/*


String.instantialize=function(){
if(arguments.length==0){
return new String();
}else if(arguments.length==1){
var x=arguments[0];
if(typeof x=="string"||x instanceof String){
return new String(x);
}else if(x instanceof Array){
if(x.length>0&&typeof x[0]=="number"){
var arr=new Array(x.length);
for(var i=0;i<x.length;i++){
arr[i]=String.fromCharCode(x[i]&0xff);
}
return Encoding.readUTF8(arr.join(''));
}
return x.join('');
}else if(x.__CLASS_NAME__=="StringBuffer"
||x.__CLASS_NAME__=="java.lang.StringBuffer"){
var value=x.shareValue();
var length=x.length();
var valueCopy=new Array(length);
for(var i=0;i<length;i++){
valueCopy[i]=value[i];
}
return valueCopy.join('')

}else{
return""+x;
}
}else if(arguments.length==2){
var x=arguments[0];
var hibyte=arguments[1];
if(typeof hibyte=="string"){
return String.instantialize(x,0,x.length,hibyte);
}else{
return String.instantialize(x,hibyte,0,x.length);
}
}else if(arguments.length==3){
var bytes=arguments[0];
var offset=arguments[1];
var length=arguments[2];
if(arguments[2]instanceof Array){
bytes=arguments[2];
offset=arguments[0];
length=arguments[1];
}
var arr=new Array(length);
if(offset<0||length+offset>bytes.length){
throw new IndexOutOfBoundsException();
}
if(length>0){
var isChar=(bytes[offset].length!=null);
if(isChar){
for(var i=0;i<length;i++){
arr[i]=bytes[offset+i];
}
}else{
for(var i=0;i<length;i++){
arr[i]=String.fromCharCode(bytes[offset+i]);
}
}
}
return arr.join('');
}else if(arguments.length==4){
var bytes=arguments[0];
var y=arguments[3];
if(typeof y=="string"||y instanceof String){
var offset=arguments[1];
var length=arguments[2];
var arr=new Array(length);
for(var i=0;i<length;i++){
arr[i]=bytes[offset+i];
if(typeof arr[i]=="number"){
arr[i]=String.fromCharCode(arr[i]&0xff);
}
}
var cs=y.toLowerCase();
if(cs=="utf-8"||cs=="utf8"){
return Encoding.readUTF8(arr.join(''));
}else{
return arr.join('');
}
}else{
var count=arguments[3];
var offset=arguments[2];
var hibyte=arguments[1];
var value=new Array(count);
if(hibyte==0){
for(var i=count;i-->0;){
value[i]=String.fromCharCode(bytes[i+offset]&0xff);
}
}else{
hibyte<<=8;
for(var i=count;i-->0;){
value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
}
}
return value.join('');
}
}else{
var s="";
for(var i=0;i<arguments.length;i++){
s+=arguments[i];
}
return s;
}
};


*/


String.instantialize=function(){
switch (arguments.length) {
case 0:
	return new String();
case 1:
	var x=arguments[0];
	if(typeof x=="string"||x instanceof String){
		return new String(x);
	}
	if(x instanceof Array || x instanceof Int32Array){
		if(x.length>0&&typeof x[0]=="number"){
			var arr=new Array(x.length);
			for(var i=0;i<x.length;i++){
				arr[i]=String.fromCharCode(x[i]&0xff);
			}
			return Encoding.readUTF8(arr.join(''));
		}
		return x.join('');
	}
	if(x.__CLASS_NAME__=="StringBuffer"||x.__CLASS_NAME__=="java.lang.StringBuffer"){
		var value=x.shareValue();
		var length=x.length();
		var valueCopy=new Array(length);
		for(var i=0;i<length;i++){
			valueCopy[i]=value[i];
		}
		return valueCopy.join('')
	}
	return""+x;
case 2:	
	var x=arguments[0];
	var hibyte=arguments[1];
	if(typeof hibyte=="string"){
		return String.instantialize(x,0,x.length,hibyte);
	}
	return String.instantialize(x,hibyte,0,x.length);
case 3:
	var bytes=arguments[0];
	var offset=arguments[1];
	var length=arguments[2];
	if(arguments[2]instanceof Array){
		bytes=arguments[2];
		offset=arguments[0];
		length=arguments[1];
	}
	var arr=new Array(length);
	if(offset<0||length+offset>bytes.length){
		throw new IndexOutOfBoundsException();
	}
	if(length>0){
		var isChar=(bytes[offset].length!=null);
		if(isChar){
			for(var i=0;i<length;i++){
				arr[i]=bytes[offset+i];
			}
		}else{
			for(var i=0;i<length;i++){
				arr[i]=String.fromCharCode(bytes[offset+i]);
			}
		}
	}
	return arr.join('');
case 4:
	var bytes=arguments[0];
	var y=arguments[3];
	if(typeof y=="string"||y instanceof String){
		var offset=arguments[1];
		var length=arguments[2];
		var arr=new Array(length);
		for(var i=0;i<length;i++){
			arr[i]=bytes[offset+i];
			if(typeof arr[i]=="number"){
				arr[i]=String.fromCharCode(arr[i]&0xff);
			}
		}
		var cs=y.toLowerCase();
		if(cs=="utf-8"||cs=="utf8"){
			return Encoding.readUTF8(arr.join(''));
		}
		return arr.join('');
	}
	var count=arguments[3];
	var offset=arguments[2];
	var hibyte=arguments[1];
	var value=new Array(count);
	if(hibyte==0){
		for(var i=count;i-->0;){
			value[i]=String.fromCharCode(bytes[i+offset]&0xff);
		}
	}else{
		hibyte<<=8;
		for(var i=count;i-->0;){
			value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
		}
	}
	return value.join('');
default:
	var s="";
	for(var i=0;i<arguments.length;i++){
		s+=arguments[i];
	}
	return s;
}
};


if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){
String.prototype.toString=function(){
return this;
};
}

}
c$=$_C(function(){
this.value=0;
$_Z(this,arguments);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
$_K(c$,
function(value){
this.value=value;
},"~N");
$_M(c$,"charValue",
function(){
return this.value;
});
$_V(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
$_V(c$,"equals",
function(obj){
if($_O(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
},"~O");
$_V(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
},"Character");
c$.toLowerCase=$_M(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
},"~N");
c$.toUpperCase=$_M(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
},"~N");
c$.isDigit=$_M(c$,"isDigit",
function(c){
if(('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt(0))return true;
if((c).charCodeAt(0)<1632)return false;
return false;
},"~N");
c$.isUpperCase=$_M(c$,"isUpperCase",
function(c){
if(('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt(0)){
return true;
}return false;
},"~N");
c$.isLowerCase=$_M(c$,"isLowerCase",
function(c){
if(('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt(0)){
return true;
}return false;
},"~N");
c$.isWhitespace=$_M(c$,"isWhitespace",
function(c){
if(((c).charCodeAt(0)>=0x1c&&(c).charCodeAt(0)<=0x20)||((c).charCodeAt(0)>=0x9&&(c).charCodeAt(0)<=0xd))return true;
if((c).charCodeAt(0)==0x1680)return true;
if((c).charCodeAt(0)<0x2000||(c).charCodeAt(0)==0x2007)return false;
return(c).charCodeAt(0)<=0x200b||(c).charCodeAt(0)==0x2028||(c).charCodeAt(0)==0x2029||(c).charCodeAt(0)==0x3000;
},"~N");
c$.isLetter=$_M(c$,"isLetter",
function(c){
if((('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt (0)) || (('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt(0)))return true;
if((c).charCodeAt(0)<128)return false;
return false;
},"~N");
c$.isLetterOrDigit=$_M(c$,"isLetterOrDigit",
function(c){
return Character.isLetter(c)||Character.isDigit(c);
},"~N");
c$.isSpaceChar=$_M(c$,"isSpaceChar",
function(c){
if((c).charCodeAt(0)==0x20||(c).charCodeAt(0)==0xa0||(c).charCodeAt(0)==0x1680)return true;
if((c).charCodeAt(0)<0x2000)return false;
return(c).charCodeAt(0)<=0x200b||(c).charCodeAt(0)==0x2028||(c).charCodeAt(0)==0x2029||(c).charCodeAt(0)==0x202f||(c).charCodeAt(0)==0x3000;
},"~N");
c$.digit=$_M(c$,"digit",
function(c,radix){
if(radix>=2&&radix<=36){
if((c).charCodeAt(0)<128){
var result=-1;
if(('0').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('9').charCodeAt(0)){
result=(c).charCodeAt(0)-('0').charCodeAt(0);
}else if(('a').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('z').charCodeAt(0)){
result=(c).charCodeAt(0)-(87);
}else if(('A').charCodeAt (0) <= (c).charCodeAt (0) && (c).charCodeAt (0) <= ('Z').charCodeAt(0)){
result=(c).charCodeAt(0)-(55);
}return result<radix?result:-1;
}}return-1;
},"~N,~N");
$_V(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=$_V(c$,"toString",
function(c){
{
if(this===Character){
return"class java.lang.Character";
}
}return String.valueOf(c);
},"~N");
$_S(c$,
"MIN_VALUE",'\u0000',
"MAX_VALUE",'\uffff',
"MIN_RADIX",2,
"MAX_RADIX",36,
"TYPE",null);

java.lang.Character.TYPE=java.lang.Character.prototype.TYPE=java.lang.Character;
Array.getComponentType=function(){
return Object;
};c$=$_T(java.lang.reflect,"Array");
c$.newInstance=$_M(c$,"newInstance",
function(componentType,size){
return $_A(length);
},"Class,~N");

java.util.Date=Date;
Date.TYPE="java.util.Date";
Date.__CLASS_NAME__="Date";
Clazz.implementOf(Date,[java.io.Serializable,java.lang.Comparable]);

$_M(java.util.Date,"clone",
function(){
return new Date(this.getTime());
});

$_M(java.util.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"java.util.Date");
$_M(java.util.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"java.util.Date");
$_M(java.util.Date,"equals",
function(obj){
return Clazz.instanceOf(obj,java.util.Date)&&this.getTime()==(obj).getTime();
},"Object");
$_M(java.util.Date,"compareTo",
function(anotherDate){
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"java.util.Date");
$_M(java.util.Date,"compareTo",
function(o){
return this.compareTo(o);
},"Object");
$_V(java.util.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

c$=$_C(function(){
this.source=null;
$_Z(this,arguments);
},java.util,"EventObject",null,java.io.Serializable);
$_K(c$,
function(source){
if(source!=null)this.source=source;
else throw new IllegalArgumentException();
},"~O");
$_M(c$,"getSource",
function(){
return this.source;
});
$_V(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
$_I(java.util,"EventListener");

c$=$_C(function(){
this.listener=null;
$_Z(this,arguments);
},java.util,"EventListenerProxy",null,java.util.EventListener);
$_K(c$,
function(listener){
this.listener=listener;
},"java.util.EventListener");
$_M(c$,"getListener",
function(){
return this.listener;
});
$_I(java.util,"Iterator");

$_I(java.util,"ListIterator",java.util.Iterator);
$_I(java.util,"Enumeration");
$_I(java.util,"Collection",Iterable);

$_I(java.util,"Set",java.util.Collection);
$_I(java.util,"Map");
$_I(java.util.Map,"Entry");

$_I(java.util,"List",java.util.Collection);

$_I(java.util,"Queue",java.util.Collection);
$_I(java.util,"RandomAccess");
c$=$_C(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
$_Z(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
$_Y(c$,function(){
this.cause=this;
//alert("e0 "+ arguments.callee.caller.caller.caller.caller.caller)
});
$_K(c$,
function(){
this.fillInStackTrace();
});
$_K(c$,
function(message){
this.fillInStackTrace();
this.detailMessage=message;
},"~S");
$_K(c$,
function(message,cause){
this.fillInStackTrace();
this.detailMessage=message;
this.cause=cause;
},"~S,Throwable");
$_K(c$,
function(cause){
this.fillInStackTrace();
this.detailMessage=(cause==null?null:cause.toString());
this.cause=cause;
},"Throwable");
$_M(c$,"getMessage",
function(){
{
if(typeof this.message!="undefined"){
return this.message;
}
}return this.detailMessage;
});
$_M(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
$_M(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
$_M(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
$_V(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.getLocalizedMessage();
return(message!=null)?(s+": "+message):s;
});
$_M(c$,"printStackTrace",
function(){
System.err.println(this);
for(var i=0;i<this.stackTrace.length;i++){
var t=this.stackTrace[i];
var x=t.methodName.indexOf("(");
var n=t.methodName.substring(0,x).replace(/\s+/g,"");
if(n!="construct"||t.nativeClazz==null
||Clazz.getInheritedLevel(t.nativeClazz,Throwable)<0){
System.err.println(t);
}
}
});
$_M(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
$_M(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
$_M(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz.callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClass=null;
if(!noLooping||caller==Clazz.tryToSearchAndExecute||caller==$_U||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz.callingStackTraces[index].caller;
nativeClass=Clazz.callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.claxxOwner!=null){
nativeClass=superCaller.claxxOwner;
}else if(superCaller.exClazz!=null){
nativeClass=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClass!=null&&nativeClass.__CLASS_NAME__.length!=0)?
nativeClass.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+Clazz.getParamsType(superCaller.arguments)+")",
null,-1);
st.nativeClazz=nativeClass;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){

var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz.initializingException=false;
return this;
});
$_M(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");

c$=$_C(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
$_Z(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
$_K(c$,
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},"~S,~S,~S,~N");
$_V(c$,"equals",
function(obj){
if(!($_O(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
},"~O");
$_M(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
$_M(c$,"getFileName",
function(){
return this.fileName;
});
$_M(c$,"getLineNumber",
function(){
return this.lineNumber;
});
$_M(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
$_V(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
$_M(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
$_V(c$,"toString",
function(){
var buf=new StringBuilder(80);
buf.append(this.getClassName());
buf.append('.');
buf.append(this.getMethodName());
if(this.isNativeMethod()){
buf.append("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf.append("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf.append('(');
buf.append(fName);
if(lineNum>=0){
buf.append(':');
buf.append(lineNum);
}buf.append(')');
}}return buf.toString();
});

c$=$_T(java.lang,"Error",Throwable);

c$=$_T(java.lang,"LinkageError",Error);

c$=$_T(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=$_T(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=$_T(java.lang,"AssertionError",Error);
$_K(c$,
function(detailMessage){
$_R(this,AssertionError,[String.valueOf(detailMessage),($_O(detailMessage,Throwable)?detailMessage:null)]);
},"~O");
$_K(c$,
function(detailMessage){
this.construct(String.valueOf(detailMessage));
},"~B");
$_K(c$,
function(detailMessage){
this.construct(String.valueOf(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Integer.toString(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Long.toString(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Float.toString(detailMessage));
},"~N");
$_K(c$,
function(detailMessage){
this.construct(Double.toString(detailMessage));
},"~N");

c$=$_T(java.lang,"ClassCircularityError",LinkageError);

c$=$_T(java.lang,"ClassFormatError",LinkageError);

c$=$_C(function(){
this.exception=null;
$_Z(this,arguments);
},java.lang,"ExceptionInInitializerError",LinkageError);
$_K(c$,
function(){
$_R(this,ExceptionInInitializerError);
this.initCause(null);
});
$_K(c$,
function(detailMessage){
$_R(this,ExceptionInInitializerError,[detailMessage]);
this.initCause(null);
},"~S");
$_K(c$,
function(exception){
$_R(this,ExceptionInInitializerError);
this.exception=exception;
this.initCause(exception);
},"Throwable");
$_M(c$,"getException",
function(){
return this.exception;
});
$_V(c$,"getCause",
function(){
return this.exception;
});

c$=$_T(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=$_T(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=$_T(java.lang,"VirtualMachineError",Error);

c$=$_T(java.lang,"InternalError",VirtualMachineError);

c$=$_T(java.lang,"NoClassDefFoundError",LinkageError);

c$=$_T(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=$_T(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=$_T(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=$_T(java.lang,"StackOverflowError",VirtualMachineError);

c$=$_T(java.lang,"UnknownError",VirtualMachineError);

c$=$_T(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=$_T(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=$_T(java.lang,"VerifyError",LinkageError);

c$=$_T(java.lang,"ThreadDeath",Error);
$_K(c$,
function(){
$_R(this,ThreadDeath,[]);
});

c$=$_T(java.lang,"Exception",Throwable);

c$=$_T(java.lang,"RuntimeException",Exception);

c$=$_T(java.lang,"ArithmeticException",RuntimeException);

c$=$_T(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=$_T(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
$_K(c$,
function(index){
$_R(this,ArrayIndexOutOfBoundsException,["Array index out of range: "+index]);
},"~N");

c$=$_T(java.lang,"ArrayStoreException",RuntimeException);

c$=$_T(java.lang,"ClassCastException",RuntimeException);

c$=$_C(function(){
this.ex=null;
$_Z(this,arguments);
},java.lang,"ClassNotFoundException",Exception);
$_K(c$,
function(){
$_R(this,ClassNotFoundException,[Clazz.castNullAs("Throwable")]);
});
$_K(c$,
function(detailMessage){
$_R(this,ClassNotFoundException,[detailMessage,null]);
},"~S");
$_K(c$,
function(detailMessage,exception){
$_R(this,ClassNotFoundException,[detailMessage]);
this.ex=exception;
},"~S,Throwable");
$_M(c$,"getException",
function(){
return this.ex;
});
$_V(c$,"getCause",
function(){
return this.ex;
});

c$=$_T(java.lang,"CloneNotSupportedException",Exception);

c$=$_T(java.lang,"IllegalAccessException",Exception);

c$=$_T(java.lang,"IllegalArgumentException",RuntimeException);
$_K(c$,
function(cause){
$_R(this,IllegalArgumentException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_T(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=$_T(java.lang,"IllegalStateException",RuntimeException);
$_K(c$,
function(cause){
$_R(this,IllegalStateException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_T(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=$_T(java.lang,"InstantiationException",Exception);

c$=$_T(java.lang,"InterruptedException",Exception);

c$=$_T(java.lang,"NegativeArraySizeException",RuntimeException);

c$=$_T(java.lang,"NoSuchFieldException",Exception);

c$=$_T(java.lang,"NoSuchMethodException",Exception);

c$=$_T(java.lang,"NullPointerException",RuntimeException);

c$=$_T(java.lang,"NumberFormatException",IllegalArgumentException);

c$=$_T(java.lang,"SecurityException",RuntimeException);
$_K(c$,
function(cause){
$_R(this,SecurityException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_T(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
$_K(c$,
function(index){
$_R(this,StringIndexOutOfBoundsException,["String index out of range: "+index]);
},"~N");

c$=$_T(java.lang,"UnsupportedOperationException",RuntimeException);
$_K(c$,
function(){
$_R(this,UnsupportedOperationException,[]);
});
$_K(c$,
function(cause){
$_R(this,UnsupportedOperationException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=$_C(function(){
this.target=null;
$_Z(this,arguments);
},java.lang.reflect,"InvocationTargetException",Exception);
$_K(c$,
function(){
$_R(this,java.lang.reflect.InvocationTargetException,[Clazz.castNullAs("Throwable")]);
});
$_K(c$,
function(exception){
$_R(this,java.lang.reflect.InvocationTargetException,[null,exception]);
this.target=exception;
},"Throwable");
$_K(c$,
function(exception,detailMessage){
$_R(this,java.lang.reflect.InvocationTargetException,[detailMessage,exception]);
this.target=exception;
},"Throwable,~S");
$_M(c$,"getTargetException",
function(){
return this.target;
});
$_V(c$,"getCause",
function(){
return this.target;
});

c$=$_C(function(){
this.undeclaredThrowable=null;
$_Z(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
$_K(c$,
function(exception){
$_R(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
$_K(c$,
function(exception,detailMessage){
$_R(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
$_M(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
$_V(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=$_T(java.io,"IOException",Exception);


c$=$_T(java.io,"CharConversionException",java.io.IOException);

c$=$_T(java.io,"EOFException",java.io.IOException);

c$=$_T(java.io,"FileNotFoundException",java.io.IOException);

c$=$_C(function(){
this.bytesTransferred=0;
$_Z(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=$_T(java.io,"ObjectStreamException",java.io.IOException);

c$=$_C(function(){
this.classname=null;
$_Z(this,arguments);
},java.io,"InvalidClassException",java.io.ObjectStreamException);
$_K(c$,
function(className,detailMessage){
$_R(this,java.io.InvalidClassException,[detailMessage]);
this.classname=className;
},"~S,~S");
$_M(c$,"getMessage",
function(){
var msg=$_U(this,java.io.InvalidClassException,"getMessage",[]);
if(this.classname!=null){
msg=this.classname+';' + ' '+msg;
}return msg;
});

c$=$_T(java.io,"InvalidObjectException",java.io.ObjectStreamException);

c$=$_T(java.io,"NotActiveException",java.io.ObjectStreamException);

c$=$_T(java.io,"NotSerializableException",java.io.ObjectStreamException);

c$=$_C(function(){
this.eof=false;
this.length=0;
$_Z(this,arguments);
},java.io,"OptionalDataException",java.io.ObjectStreamException);

c$=$_T(java.io,"StreamCorruptedException",java.io.ObjectStreamException);

c$=$_T(java.io,"SyncFailedException",java.io.IOException);

c$=$_T(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=$_T(java.io,"UTFDataFormatException",java.io.IOException);

c$=$_C(function(){
this.detail=null;
$_Z(this,arguments);
},java.io,"WriteAbortedException",java.io.ObjectStreamException);
$_K(c$,
function(detailMessage,rootCause){
$_R(this,java.io.WriteAbortedException,[detailMessage]);
this.detail=rootCause;
this.initCause(rootCause);
},"~S,Exception");
$_M(c$,"getMessage",
function(){
var msg=$_U(this,java.io.WriteAbortedException,"getMessage",[]);
if(this.detail!=null){
msg=msg+"; "+this.detail.toString();
}return msg;
});
$_V(c$,"getCause",
function(){
return this.detail;
});

c$=$_T(java.util,"ConcurrentModificationException",RuntimeException);
$_K(c$,
function(){
$_R(this,java.util.ConcurrentModificationException,[]);
});

c$=$_T(java.util,"EmptyStackException",RuntimeException);

c$=$_C(function(){
this.className=null;
this.key=null;
$_Z(this,arguments);
},java.util,"MissingResourceException",RuntimeException);
$_K(c$,
function(detailMessage,className,resourceName){
$_R(this,java.util.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
$_M(c$,"getClassName",
function(){
return this.className;
});
$_M(c$,"getKey",
function(){
return this.key;
});

c$=$_T(java.util,"NoSuchElementException",RuntimeException);

c$=$_T(java.util,"TooManyListenersException",Exception);

c$=$_T(java.lang,"Void");
$_S(c$,
"TYPE",null);
{
java.lang.Void.TYPE=java.lang.Void;
}$_I(java.lang.reflect,"GenericDeclaration");
$_I(java.lang.reflect,"AnnotatedElement");

c$=$_T(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
$_K(c$,
function(){
});
$_M(c$,"isAccessible",
function(){
return false;
});
c$.setAccessible=$_M(c$,"setAccessible",
function(objects,flag){
return;
},"~A,~B");
$_M(c$,"setAccessible",
function(flag){
return;
},"~B");
$_V(c$,"isAnnotationPresent",
function(annotationType){
return false;
},"Class");
$_V(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
$_V(c$,"getAnnotations",
function(){
return new Array(0);
});
$_V(c$,"getAnnotation",
function(annotationType){
return null;
},"Class");
c$.marshallArguments=$_M(c$,"marshallArguments",
function(parameterTypes,args){
return null;
},"~A,~A");
$_M(c$,"invokeV",
function(receiver,args){
return;
},"~O,~A");
$_M(c$,"invokeL",
function(receiver,args){
return null;
},"~O,~A");
$_M(c$,"invokeI",
function(receiver,args){
return 0;
},"~O,~A");
$_M(c$,"invokeJ",
function(receiver,args){
return 0;
},"~O,~A");
$_M(c$,"invokeF",
function(receiver,args){
return 0.0;
},"~O,~A");
$_M(c$,"invokeD",
function(receiver,args){
return 0.0;
},"~O,~A");
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
$_I(java.lang.reflect,"InvocationHandler");
c$=$_I(java.lang.reflect,"Member");
$_S(c$,
"PUBLIC",0,
"DECLARED",1);

c$=$_T(java.lang.reflect,"Modifier");
$_K(c$,
function(){
});
c$.isAbstract=$_M(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
},"~N");
c$.isFinal=$_M(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
},"~N");
c$.isInterface=$_M(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
},"~N");
c$.isNative=$_M(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
},"~N");
c$.isPrivate=$_M(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
},"~N");
c$.isProtected=$_M(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
},"~N");
c$.isPublic=$_M(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
},"~N");
c$.isStatic=$_M(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
},"~N");
c$.isStrict=$_M(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
},"~N");
c$.isSynchronized=$_M(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
},"~N");
c$.isTransient=$_M(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
},"~N");
c$.isVolatile=$_M(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
},"~N");
c$.toString=$_M(c$,"toString",
function(modifiers){
var sb=new Array(0);
if(java.lang.reflect.Modifier.isPublic(modifiers))sb[sb.length]="public";
if(java.lang.reflect.Modifier.isProtected(modifiers))sb[sb.length]="protected";
if(java.lang.reflect.Modifier.isPrivate(modifiers))sb[sb.length]="private";
if(java.lang.reflect.Modifier.isAbstract(modifiers))sb[sb.length]="abstract";
if(java.lang.reflect.Modifier.isStatic(modifiers))sb[sb.length]="static";
if(java.lang.reflect.Modifier.isFinal(modifiers))sb[sb.length]="final";
if(java.lang.reflect.Modifier.isTransient(modifiers))sb[sb.length]="transient";
if(java.lang.reflect.Modifier.isVolatile(modifiers))sb[sb.length]="volatile";
if(java.lang.reflect.Modifier.isSynchronized(modifiers))sb[sb.length]="synchronized";
if(java.lang.reflect.Modifier.isNative(modifiers))sb[sb.length]="native";
if(java.lang.reflect.Modifier.isStrict(modifiers))sb[sb.length]="strictfp";
if(java.lang.reflect.Modifier.isInterface(modifiers))sb[sb.length]="interface";
if(sb.length>0){
return sb.join(" ");
}return"";
},"~N");
$_S(c$,
"PUBLIC",0x1,
"PRIVATE",0x2,
"PROTECTED",0x4,
"STATIC",0x8,
"FINAL",0x10,
"SYNCHRONIZED",0x20,
"VOLATILE",0x40,
"TRANSIENT",0x80,
"NATIVE",0x100,
"INTERFACE",0x200,
"ABSTRACT",0x400,
"STRICT",0x800,
"BRIDGE",0x40,
"VARARGS",0x80,
"SYNTHETIC",0x1000,
"ANNOTATION",0x2000,
"ENUM",0x4000);

c$=$_C(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
$_Z(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
$_K(c$,
function(declaringClass,parameterTypes,checkedExceptions,modifiers){
$_R(this,java.lang.reflect.Constructor,[]);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~A,~A,~N");
$_V(c$,"getTypeParameters",
function(){
return null;
});
$_M(c$,"toGenericString",
function(){
return null;
});
$_M(c$,"getGenericParameterTypes",
function(){
return null;
});
$_M(c$,"getGenericExceptionTypes",
function(){
return null;
});
$_M(c$,"getParameterAnnotations",
function(){
return null;
});
$_M(c$,"isVarArgs",
function(){
return false;
});
$_V(c$,"isSynthetic",
function(){
return false;
});
$_V(c$,"equals",
function(object){
if(object!=null&&$_O(object,java.lang.reflect.Constructor)){
var other=object;
if(this.getDeclaringClass()===other.getDeclaringClass()){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
$_V(c$,"getDeclaringClass",
function(){
return this.clazz;
});
$_M(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
$_V(c$,"getModifiers",
function(){
return this.modifiers;
});
$_V(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
$_M(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
$_V(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
$_M(c$,"newInstance",
function(args){
var instance=new this.clazz($_G);
$_Z(instance,args);
return instance;
},"~A");
$_V(c$,"toString",
function(){
return null;
});

c$=$_T(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
$_V(c$,"isSynthetic",
function(){
return false;
});
$_M(c$,"toGenericString",
function(){
return null;
});
$_M(c$,"isEnumConstant",
function(){
return false;
});
$_M(c$,"getGenericType",
function(){
return null;
});
$_V(c$,"equals",
function(object){
return false;
},"~O");
$_V(c$,"getDeclaringClass",
function(){
return null;
});
$_V(c$,"getName",
function(){
return null;
});
$_M(c$,"getType",
function(){
return null;
});
$_V(c$,"hashCode",
function(){
return 0;
});
$_V(c$,"toString",
function(){
return null;
});

c$=$_C(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
$_Z(this,arguments);
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
$_K(c$,
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
$_R(this,java.lang.reflect.Method,[]);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~S,~A,Class,~A,~N");
$_V(c$,"getTypeParameters",
function(){
return null;
});
$_M(c$,"toGenericString",
function(){
return null;
});
$_M(c$,"getGenericParameterTypes",
function(){
return null;
});
$_M(c$,"getGenericExceptionTypes",
function(){
return null;
});
$_M(c$,"getGenericReturnType",
function(){
return null;
});
$_M(c$,"getParameterAnnotations",
function(){
return null;
});
$_M(c$,"isVarArgs",
function(){
return false;
});
$_M(c$,"isBridge",
function(){
return false;
});
$_V(c$,"isSynthetic",
function(){
return false;
});
$_M(c$,"getDefaultValue",
function(){
return null;
});
$_V(c$,"equals",
function(object){
if(object!=null&&$_O(object,java.lang.reflect.Method)){
var other=object;
if((this.getDeclaringClass()===other.getDeclaringClass())&&(this.getName()===other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
$_V(c$,"getDeclaringClass",
function(){
return this.clazz;
});
$_M(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
$_V(c$,"getModifiers",
function(){
return this.modifiers;
});
$_V(c$,"getName",
function(){
return this.name;
});
$_M(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
$_M(c$,"getReturnType",
function(){
return this.returnType;
});
$_V(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
$_M(c$,"invoke",
function(receiver,args){
var m=this.clazz.prototype[this.getName()];
if(m==null){
m=this.clazz[this.getName()];
}
if(m!=null){
m.apply(receiver,args);
}else{

}
},"~O,~A");
$_V(c$,"toString",
function(){
return null;
});


