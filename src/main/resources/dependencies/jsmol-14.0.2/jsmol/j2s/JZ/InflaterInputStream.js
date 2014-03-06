Clazz.declarePackage ("JZ");
Clazz.load (["java.io.FilterInputStream"], "JZ.InflaterInputStream", ["java.io.EOFException", "$.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.inflater = null;
this.buf = null;
this.len = 0;
this.closed = false;
this.eof = false;
this.close_in = true;
this.myinflater = false;
this.byte1 = null;
this.b = null;
Clazz.instantialize (this, arguments);
}, JZ, "InflaterInputStream", java.io.FilterInputStream);
Clazz.prepareFields (c$, function () {
this.byte1 =  Clazz.newByteArray (1, 0);
this.b =  Clazz.newByteArray (512, 0);
});
Clazz.makeConstructor (c$, 
function ($in, inflater, size, close_in) {
Clazz.superConstructor (this, JZ.InflaterInputStream, [$in]);
this.inflater = inflater;
this.buf =  Clazz.newByteArray (size, 0);
this.close_in = close_in;
}, "java.io.InputStream,JZ.Inflater,~N,~B");
$_V(c$, "readByteAsInt", 
function () {
if (this.closed) {
throw  new java.io.IOException ("Stream closed");
}return this.read (this.byte1, 0, 1) == -1 ? -1 : this.byte1[0] & 0xff;
});
$_V(c$, "read", 
function (b, off, len) {
return this.readInf (b, off, len);
}, "~A,~N,~N");
$_M(c$, "readInf", 
function (b, off, len) {
if (this.closed) {
throw  new java.io.IOException ("Stream closed");
}if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
} else if (this.eof) {
return -1;
}var n = 0;
this.inflater.setOutput (b, off, len);
while (!this.eof) {
if (this.inflater.avail_in == 0) this.fill ();
var err = this.inflater.inflate (0);
n += this.inflater.next_out_index - off;
off = this.inflater.next_out_index;
switch (err) {
case -3:
throw  new java.io.IOException (this.inflater.msg);
case 1:
case 2:
this.eof = true;
if (err == 2) return -1;
break;
default:
}
if (this.inflater.avail_out == 0) break;
}
return n;
}, "~A,~N,~N");
$_V(c$, "available", 
function () {
if (this.closed) {
throw  new java.io.IOException ("Stream closed");
}return (this.eof ? 0 : 1);
});
$_V(c$, "skip", 
function (n) {
if (n < 0) {
throw  new IllegalArgumentException ("negative skip length");
}if (this.closed) {
throw  new java.io.IOException ("Stream closed");
}var max = Math.min (n, 2147483647);
var total = 0;
while (total < max) {
var len = max - total;
if (len > this.b.length) {
len = this.b.length;
}len = this.read (this.b, 0, len);
if (len == -1) {
this.eof = true;
break;
}total += len;
}
return total;
}, "~N");
$_V(c$, "close", 
function () {
if (!this.closed) {
if (this.myinflater) this.inflater.end ();
if (this.close_in) this.$in.close ();
this.closed = true;
}});
$_M(c$, "fill", 
function () {
if (this.closed) {
throw  new java.io.IOException ("Stream closed");
}this.len = this.$in.read (this.buf, 0, this.buf.length);
if (this.len == -1) {
if (this.inflater.istate.wrap == 0 && !this.inflater.finished ()) {
this.buf[0] = 0;
this.len = 1;
} else if (this.inflater.istate.was != -1) {
throw  new java.io.IOException ("footer is not found");
} else {
throw  new java.io.EOFException ("Unexpected end of ZLIB input stream");
}}this.inflater.setInput (this.buf, 0, this.len, true);
});
$_V(c$, "markSupported", 
function () {
return false;
});
$_V(c$, "mark", 
function (readlimit) {
}, "~N");
$_V(c$, "reset", 
function () {
throw  new java.io.IOException ("mark/reset not supported");
});
$_M(c$, "getTotalIn", 
function () {
return this.inflater.getTotalIn ();
});
$_M(c$, "getTotalOut", 
function () {
return this.inflater.getTotalOut ();
});
$_M(c$, "getAvailIn", 
function () {
if (this.inflater.avail_in <= 0) return null;
var tmp =  Clazz.newByteArray (this.inflater.avail_in, 0);
System.arraycopy (this.inflater.next_in, this.inflater.next_in_index, tmp, 0, this.inflater.avail_in);
return tmp;
});
$_M(c$, "readHeader", 
function () {
var empty = "".getBytes ();
this.inflater.setInput (empty, 0, 0, false);
this.inflater.setOutput (empty, 0, 0);
var err = this.inflater.inflate (0);
if (!this.inflater.istate.inParsingHeader ()) {
return;
}var b1 =  Clazz.newByteArray (1, 0);
do {
var i = this.$in.read (b1, 0, 1);
if (i <= 0) throw  new java.io.IOException ("no input");
this.inflater.setInput (b1, 0, b1.length, false);
err = this.inflater.inflate (0);
if (err != 0) throw  new java.io.IOException (this.inflater.msg);
} while (this.inflater.istate.inParsingHeader ());
});
$_M(c$, "getInflater", 
function () {
return this.inflater;
});
Clazz.defineStatics (c$,
"DEFAULT_BUFSIZE", 512);
});
