==============================================================================
===                                  Jmol                                  ===
==============================================================================
      Jmol: an open-source Java viewer for chemical structures in 3D, 
     with features for chemicals, crystals, materials and biomolecules.
==============================================================================

Jmol is an open-source molecule viewer and editor written in Java.

Full information is available at http://www.jmol.org/

Usage questions and comments should be posted to jmol-users@lists.sourceforge.net

Development questions, suggestions and comments should be posted
to jmol-developers@lists.sf.net


List of files included:
-------------------


== Files with information ==

=== README.txt ===
This file.

=== LEAME.txt ===
The Spanish version of README.txt

=== COPYRIGHT.txt ===
The copyright explanations regarding Jmol and its 3rd-party components.

=== LICENSE.txt ===
The GNU Lesser General Public License, under which Jmol is released.

=== CHANGES.txt ===
A list with a history of the feature additions in each version of Jmol.


== Batch and shell files ==
These can be used to start Jmol application from a command line and, 
particularly, to impose a certain combination of parameters 
(see http://wiki.jmol.org/index.php/Jmol_Application#Command_line_options).

=== jmol ===
???? (Some kind of batch file)

=== jmol.bat ===
A batch file to start Jmol application under Windows.

=== jmol.mac ===
??? (Some kind of batch file)

=== jmol.sh ===
A shell script to start Jmol application under Unix-like systems, like Linux, 
BSD, Solaris and Cygwin for Windows.


== Files of Jmol application ==
This is used as a standalone program.

=== Jmol.jar ===
The application executable file (a program written in Java). This works as any 
other program: opens in its own window, can be resized or minimized, admits 
drag-and-drop of files over it, has a top menu bar, can open and save files, 
etc. It can be open from the command line (particulary, using the shell or batch
files described above), but if Java is properly configured in your system, it's
usually enough to double-click on the file 
(see http://wiki.jmol.org/index.php/Jmol_Application#Starting_Jmol_Application 
for more details).

=== JmolData.jar ===
This is a slimmed down version of Jmol.jar that lacks all visualization 
capabilities. So, it betrays the whole (classic) concept of what Jmol is, but 
with JmolData and some clever scripting you can get just about any information 
you want out of a model and output it any way you want.

It operates only from the command line, designed for extracting data from a 
model or set of models. You are limited to commands that don't have to do with 
visualization: there are bonds but no "sticks", atoms but no "dots", helices but
no "cartoons".


== Files of Jmol applet ==
This is used inside web pages.

=== Jmol.js ===
The library, written in JavaScript language, that assists in the programming of 
web pages that use Jmol applet, without the need to know and write detailed 
JmolApplet code.

This library uses by default the split version of the applet (unsigned or 
signed).

Fully documented at http://jmol.org/jslibrary/

=== JmolApplet0.jar, JmolApplet0(severalSuffixes).jar ===
The applet, i.e. a version of the program that will only run when embedded in 
a web page.

The applet is divided up into several pieces according to their function, so 
that if a page does not require a component, that component is not downloaded 
from the server. 
It is still recommended that you put all JmolApplet0*.jar files on your server 
even if your page does not use the capabilities provided by some of the files, 
because the pop-up menu and Jmol console both allow users to access parts of 
Jmol you might not have considered.

This split version is the one that will be used by default if you use Jmol.js 
(which is the recommended method).
For that, use the simplest form of jmolInitialize(), just indicating the 
directory or folder containing the set of jar files:
 jmolInitialize("directory-containing-jar-files")
for example,
 jmolInitialize(".")  
     (if jar files are in the same folder as the web page)
 jmolInitialize("../jmol") 
     (if jar files are in a parallel folder, named 'jmol')

=== JmolAppletSigned0.jar, JmolAppletSigned0(severalSuffixes).jar ===
An equivalent version of the applet, but this is a "signed" applet (a term in 
Java security language). This means it must be authorized by the web 
page visitor for it to run, but then it will have less security restrictions for
 file access. For example, it can access files on any part of the user's hard 
 disk or from any other web server.

Typically users get a message asking if they want to accept the "certificate" or
 if they "trust" the applet (''see notes below''). JmolAppletSigned.jar should 
 be used with this in mind. Other than reading files, Jmol does not currently 
 use other capabilities of signed applets, such as accessing the system 
 clipboard or writing files. Use only if you know what you are doing and have 
 considered the security issues.

To use this with Jmol.js, use the form:
 jmolInitialize("directory-containing-jar-files", true)
or
 jmolInitialize("directory-containing-jar-files", "JmolAppletSigned0.jar")

Notes:
* The security feature requesting to trust the applet may not always be enabled 
  on users' systems. 
* The message requesting permission will be displayed for each of the 14 (or 
  more) loadable files. 
* The user may have the option to trust the applet permanently and so avoid 
  having to give permission every time (s)he visits a page that uses Jmol.

=== JmolApplet.jar ===
This is an all-in-one or monolithic file, kept mainly for compatibility with old
pages that call it explicitly. 
This single file is equivalent to the whole set of JmolApplet0*.jar files, 
explained above.
The recommended procedure is not to use this monolithic file, but the split 
version (JmolApplet0.jar etc.). In particular, Jmol.js uses the split version 
by default.

You may wish to use this if you want to keep your website simple or you just 
want to upload a single jar file whenever new versions are released. 
However, this will load Jmol slower than the split versions (described above), 
as all the modules (adding up to 2 MB), needed or not, must get loaded onto a 
user's machine before any structure is displayed.

To invoke JmolApplet.jar from Jmol.js, either:

a) put it in the directory containing the HTML page requiring it and do not use 
   jmolInitialize(), 

or 

b) identify it explicitly in jmolInitialize(), for example:
 jmolInitialize("directory-containing-jar-files", "JmolApplet.jar")

=== JmolAppletSigned.jar ===
An equivalent version of the monolithic applet, but this is a "signed" applet 
(a term in Java security language). This means it must be authorized by the web 
page visitor for it to run, but then it will have less security restrictions for
 file access. For example, it can access files on any part of the user's hard 
 disk or from any other web server.

Typically users get a message asking if they want to accept the "certificate" or
if they "trust" the applet, but this security feature is not always enabled.
JmolAppletSigned.jar should be used with this in mind. Other than reading files,
Jmol does not currently utilize other capabilities of signed applets, such as 
accessing the System clipboard or writing files. Use only if you know what you 
are doing and have considered the security issues.

To invoke JmolAppletSigned.jar from Jmol.js, use:
 jmolInitialize("directory-containing-jar-files", "JmolAppletSigned.jar")

=== JmolSmilesApplet.jar ===
This is currently not included in the distribution, but may be obtained from the
development site.

This is a lightweight applet, with no visible interface, that allows to check 
SMILES strings. This is particularly useful for comparison of stereochemistry, 
for example from structures drawn using the JME applet.

The same functionality is included in the regular JmolApplet.


== Notes ==

# Given the descriptions, you will realize that the distribution package 
  contains 4 full copies of the applet (signed or unsigned, split or not).
