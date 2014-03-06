Clazz.load (["java.io.FilterInputStream"], "java.io.PushbackInputStream", ["java.io.IOException", "java.lang.IllegalArgumentException", "$.IndexOutOfBoundsException", "$.NullPointerException"], function () {
c$ = Clazz.decorateAsClass (function () {
this.buf = null;
this.pos = 0;
Clazz.instantialize (this, arguments);
}, java.io, "PushbackInputStream", java.io.FilterInputStream);
$_M(c$, "ensureOpen", 
($fz = function () {
if (this.$in == null) throw  new java.io.IOException ("Stream closed");
}, $fz.isPrivate = true, $fz));
Clazz.makeConstructor (c$, 
function ($in, size) {
Clazz.superConstructor (this, java.io.PushbackInputStream, [$in]);
if (size <= 0) {
throw  new IllegalArgumentException ("size <= 0");
}this.buf =  Clazz.newByteArray (size, 0);
this.pos = size;
}, "java.io.InputStream,~N");
$_V(c$, "readByteAsInt", 
function () {
this.ensureOpen ();
if (this.pos < this.buf.length) {
return this.buf[this.pos++] & 0xff;
}return this.$in.readByteAsInt ();
});
$_V(c$, "read", 
function (b, off, len) {
this.ensureOpen ();
if (b == null) {
throw  new NullPointerException ();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException ();
} else if (len == 0) {
return 0;
}var avail = this.buf.length - this.pos;
if (avail > 0) {
if (len < avail) {
avail = len;
}System.arraycopy (this.buf, this.pos, b, off, avail);
this.pos += avail;
off += avail;
len -= avail;
}if (len > 0) {
len = this.$in.read (b, off, len);
if (len == -1) {
return avail == 0 ? -1 : avail;
}return avail + len;
}return avail;
}, "~A,~N,~N");
$_M(c$, "unreadByte", 
function (b) {
this.ensureOpen ();
if (this.pos == 0) {
throw  new java.io.IOException ("Push back buffer is full");
}this.buf[--this.pos] = b;
}, "~N");
$_M(c$, "unread", 
function (b, off, len) {
this.ensureOpen ();
if (len > this.pos) {
throw  new java.io.IOException ("Push back buffer is full");
}this.pos -= len;
System.arraycopy (b, off, this.buf, this.pos, len);
}, "~A,~N,~N");
$_V(c$, "available", 
function () {
this.ensureOpen ();
var n = this.buf.length - this.pos;
var avail = this.$in.available ();
return n > (2147483647 - avail) ? 2147483647 : n + avail;
});
$_V(c$, "skip", 
function (n) {
this.ensureOpen ();
if (n <= 0) {
return 0;
}var pskip = this.buf.length - this.pos;
if (pskip > 0) {
if (n < pskip) {
pskip = n;
}this.pos += pskip;
n -= pskip;
}if (n > 0) {
pskip += this.$in.skip (n);
}return pskip;
}, "~N");
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
$_V(c$, "close", 
function () {
if (this.$in == null) return;
this.$in.close ();
this.$in = null;
this.buf = null;
});
});
