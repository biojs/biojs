<?php

// from http://us3.php.net/file_get_contents 

// Tip
//
// A URL can be used as a filename with this function if the fopen wrappers 
// have been enabled. See fopen() for more details on how to specify the 
// filename. See the Supported Protocols and Wrappers for links to information 
// about what abilities the various wrappers have, notes on their usage, and 
// information on any predefined variables they may provide.

// jsmol.php
// Bob Hanson hansonr@stolaf.edu 1/11/2013
//
// last modified: 30 Oct 2013 -- saveFile should not convert " to _
//
// 30 Sep 2013 -- adjusted error handling to only report E_ERROR not E_WARNING
// 7 Sep 2013 -- adding PHP error handling
//
// Server-side Jmol delivers:
//   simple relay for cross-domain files
//
//   options:
//
//   call
//         "saveFile"
//             returns posted data in "data=" with mime type "mimetype=" to file name "filename="
//         "getInfoFromDatabase" 
//             returns XML data
//             requires database="=" (RCSB REST service)
//         "getImageForFileLoad","getImageFromDatabase"
//             returns an image in binary format 
//             uses JmolData.jar in silent restricted mode
//             requires JmolData.jar version 12.3.22 or higher
//             use $database.$query in Jmol's LOAD command
//             getImageFromDatabase applies "script" option after loading
//         "getRawDataFromDatabase"
//             if database one of:
//               "$" (NCI CACTVS query, default)
//                  uses JmolData.jar in silent restricted mode
//                  applies "script" option after loading
//               ":" (pubChem)
//                  uses JmolData.jar in silent restricted mode
//               "_" 
//                  just use $query
//               (anything else)
//                  use $database.$query
//
//   encoding
//         ""        no encoding (default)
//         "base64"  BASE64-encoded binary files for Chrome synchronous AJAX
//                      prepends ";base64," to encoded output  
//
// simple server tests:
//
// http://foo.wherever/jsmol.php?call=getRawDataFromDatabase&database=_&query=http://chemapps.stolaf.edu/jmol/data/t.pdb.gz
// http://goo.wherever/jsmol.php?call=getRawDataFromDatabase&database=_&query=http://chemapps.stolaf.edu/jmol/data/t.pdb.gz&encoding=base64


$myerror = "";

function handleError($severity, $msg, $filename, $linenum) {
  global $myerror;
  switch($severity) {
  case E_ERROR:
    $myerror = "PHP error:$severity $msg $filename $linenum";
    break;
  }
  return true;
}

set_error_handler("handleError");

$cmd = '/home/mscs/common/bin32/java -Djava.awt.headless=true -jar JmolData.jar -iRJ ';


function getValueSimple($json, $key, $default) {
 if ($json == "") {
	$val = $_REQUEST[$key];
 } else {
 // just do a crude check for "key"..."value"  -- nothing more than that;
 // only for very simple key/value pairs; mostly because we don't have the JSON
 // module set up for our server.

	list($junk,$info) = explode('"'.$key.'"', $json, 2);
	list($junk,$val) = explode('"', $info, 3);
	if ($val == "") {
		$val = str_replace('"','_',$_REQUEST[$key]);
	}
 }
 if ($val == "") {
   $val = $default;
 }
 return $val;
}

if ($_GET['isform']=="true") {
	$values = "";
} else {
	$values= file_get_contents("php://input");
}
$encoding = getValueSimple($values, "encoding", "");
$call = getValueSimple($values, "call", "getRawDataFromDatabase");
$query = getValueSimple($values, "query", "morphine");
$database = getValueSimple($values, "database", "$");
$postLoad = getValueSimple($values, "script","");

if ($database == '$') {
	$database = '\\$';  // NCI query
}

if (substr($query, 0, 1) == '$') {
	$query = '\\'.$query;  // 2D query
}

$imagedata = "";
$contentType = 'image/png';
$output = "";
$isBinary = false;
$filename = "";

if ($call == "getInfoFromDatabase") {
	if ($database == '=') {
		$restQueryUrl = "http://www.pdb.org/pdb/rest/search";
		$restReportUrl = "http://www.pdb.org/pdb/rest/customReport";
		$xml = "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>$query</keywords></orgPdbQuery>";
		$context = stream_context_create(array('http' => array(
			'method' => 'POST',
			'header' => 'Content-Type: application/x-www-form-urlencoded',
			'content' => $xml))
		);
		$output = file_get_contents($restQueryUrl, false, $context);
		$n = strlen($output)/5;
		if ($n == 0) {
			$output = "ERROR: \"$query\" not found";
		} else {
			if (strlen($query) == 4 && $n != 1) {
				$QQQQ = strtoupper($query);
				if (strpos("123456789", substr($QQQQ, 0, 1)) == 0 && strpos($output, $QQQQ) > 0) {
					$output = "$QQQQ\n".$output.str_replace("$QQQQ\n", "",$output);
				}		  
			}
			if ($n > 50) {
				$output = substr($output, 0, 250);
			}
			$output = str_replace("\n",",",$output);
			//http://www.rcsb.org/pdb/rest/customReport?pdbids=1crn,1d66,1blu,&customReportColumns=structureId,structureTitle
			$output = $restReportUrl."?pdbids=".$output."&customReportColumns=structureId,structureTitle";
			$output = "<result query=\"$query\" count=\"$n\">".file_get_contents($output)."</result>";
		}
	}
	
} else if ($call == "getImageForFileLoad" || $call == "getImageFromDatabase") {

	// max size for image is 1000x1000

	$imagefile = "/tmp/img".rand().".png";
	$width = $_REQUEST[width];
	$height = $_REQUEST[height];

	if (!$width || $width > 1000) { 
		$width = 300; 
	}
	if (!$height || $height > 1000) { 
		$height = 300; 
	}
	if ($call == "getImageFromDatabase") {
		$cmd = $cmd.'"load \\"'.$database.$query.'\\"'.$postLoad.'" -g'.$width.'x'.$height.' -wPNG:'.$imagefile;		
	} else {
		$file = $_REQUEST[file];
		$params = $_REQUEST[params];
		$cmd = $cmd.'"load \\"'.$file.'\\" '.$params.'" -g'.$width.'x'.$height.' -wPNG:'.$imagefile;
	}
	exec($cmd, $v);
	$imagedata = file_get_contents($imagefile);

} else if ($call == "getRawDataFromDatabase") {
	$isBinary = (strpos(".gz", $query) >= 0);
	if ($database == '\\$') { // NCI -- needs post load
		if (substr($query, 0, 2) == '\\$')
			$cmd = $cmd.'"print load(\\"'.$database.$query.'\\")"'; 
		else
			$cmd = $cmd.'"load \\"'.$database.$query.'\\"'.$postLoad.';write MOL"'; 
		exec($cmd, $result);
		$output = implode("\n",$result);
	} else if ($database == ":") { // PubChem -- just get file, including charge data
		$cmd = $cmd.'"print load(\\"'.$database.$query.'\\")"'; 
		exec($cmd, $result);
		$output = implode("\n",$result);
	} else {
		if ($database != "_")
			$query = $database.$query;
		if (strpos($query, '?POST?') > 0) {
			list($query,$data) = explode('?POST?', $query, 2);
			$context = stream_context_create(array('http' => array(
				'method' => 'POST',
				'header' => 'Content-Type: application/x-www-form-urlencoded',
				'content' => $data))
			);
			$output = file_get_contents($query, false, $context);
		} else {
			$output = file_get_contents($query);
		}
	}
} else if ($call == "saveFile") {
	$imagedata = $_REQUEST["data"];//getValueSimple($values, "data", ""); don't want to convert " to _ here
	$filename = getValueSimple($values, "filename", "");
	$contentType = getValueSimple($values, "mimetype", "application/octet-stream");
	if ($encoding == "base64") {
		$imagedata = base64_decode($imagedata);
		$encoding = "";
	}
} else {

  // just the test result -- penicillin
	$result = '{"mol":{"a":[{"x":78.474,"y":18.444,"z":3.67},{"x":64.958,"y":64.212006,"z":7.6419997},{"x":103.462,"y":26.569998,"z":-4.9280005},{"x":89.946,"y":72.338,"z":-0.956},{"x":109.19601,"y":53.517998,"z":-7.2460003},{"x":31.98,"y":28.406,"z":19.326},{"x":-84.273994,"y":-16.376001,"z":51.858},{"x":-115.051994,"y":-3.2080002,"z":14.070001},{"l":"H","x":-18.426,"y":13.716001,"z":17.006},{"x":59.22,"y":37.264,"z":9.952001},{"l":"O","x":-99.78,"y":-50.052002,"z":-24.666002},{"l":"O","x":-25.512001,"y":-33.281998,"z":-38.72},{"l":"O","x":22.08,"y":29.476002,"z":-26.811998},{"l":"O","x":-92.08,"y":-69.404,"z":14.316},{"x":-88.61001,"y":-49.4,"z":-3.246},{"x":13.762001,"y":25.081999,"z":-4.454},{"x":-70.782,"y":-26.126001,"z":3.75},{"x":-29.484001,"y":14.0,"z":-23.994},{"x":-37.694,"y":-14.437999,"z":-29.506},{"l":"H","x":-103.7,"y":-83.898,"z":8.932},{"l":"N","x":-11.774,"y":17.23,"z":-0.8759999},{"x":-59.156,"y":16.960001,"z":-17.647999},{"x":-85.96,"y":-6.886,"z":22.816},{"l":"S","x":-66.38,"y":23.898,"z":17.618},{"l":"N","x":-63.18,"y":-11.977999,"z":-20.772},{"l":"H","x":-52.845997,"y":-33.494,"z":13.710001},{"l":"H","x":-70.414,"y":29.387997,"z":-31.578003},{"l":"H","x":-93.138,"y":-36.222,"z":53.544},{"l":"H","x":-95.102005,"y":-2.47,"z":64.688},{"l":"H","x":-63.384,"y":-17.2,"z":58.034},{"l":"H","x":-115.588,"y":5.1380005,"z":-6.062},{"l":"H","x":-125.116005,"y":10.374001,"z":27.836},{"l":"H","x":-125.17799,"y":-22.512,"z":14.205999},{"l":"H","x":-22.886,"y":25.046001,"z":-41.592003},{"l":"H","x":23.692,"y":43.415993,"z":32.788},{"l":"H","x":33.742,"y":9.392,"z":29.842},{"l":"H","x":74.024,"y":-2.606,"z":5.568},{"l":"H","x":49.914,"y":78.914,"z":12.550001},{"l":"H","x":118.50201,"y":11.865999,"z":-9.842},{"l":"H","x":94.43,"y":93.39,"z":-2.7519999},{"l":"H","x":128.714,"y":59.865997,"z":-13.978}],"b":[{"b":10,"e":14,"o":2},{"b":13,"e":14},{"b":14,"e":16},{"b":16,"e":24},{"b":16,"e":22},{"b":21,"e":24},{"b":18,"e":24},{"b":6,"e":22},{"b":7,"e":22},{"b":22,"e":23},{"b":21,"e":23},{"b":17,"e":21},{"b":17,"e":18},{"b":11,"e":18,"o":2},{"b":17,"e":20},{"b":15,"e":20},{"b":5,"e":15},{"b":12,"e":15,"o":2},{"b":5,"e":9},{"b":0,"e":9,"o":2},{"b":1,"e":9},{"b":0,"e":2},{"b":1,"e":3,"o":2},{"b":2,"e":4,"o":2},{"b":3,"e":4},{"b":13,"e":19},{"b":16,"e":25},{"b":21,"e":26},{"b":6,"e":27},{"b":6,"e":28},{"b":6,"e":29},{"b":7,"e":30},{"b":7,"e":31},{"b":7,"e":32},{"b":17,"e":33},{"b":8,"e":20},{"b":5,"e":34},{"b":5,"e":35},{"b":0,"e":36},{"b":1,"e":37},{"b":2,"e":38},{"b":3,"e":39},{"b":4,"e":40}]}}';
	$result = implode($result);
	$output = "{\"message\":\"$call - $query - $cmd\",\"values\":$values,\"content\":$result}";

}

ob_start();

 if ($myerror != "") {
   $output = $myerror;
 } else { 
   if ($imagedata != "") {
  	$output = $imagedata;
  	header('Content-Type: '.$contentType);
  	if ($filename != "") {
  	  header('Content-Description: File Transfer');
  		header("Content-Disposition: attachment; filename=\"$filename\"");
      header('Content-Transfer-Encoding: binary');
      header('Expires: 0');
      header('Cache-Control: must-revalidate');
      header('Pragma: public');
  	}
   } else {
  	header('Access-Control-Allow-Origin: *');
  	if ($isBinary) {
  		header('Content-Type: text/plain; charset=x-user-defined');
  	} else {
  		header('Content-Type: application/json');
  	}
   }
   if ($encoding == "base64") {
  	 $output = ";base64,".base64_encode($output);
   }
 } 
 header('Last-Modified: '.date('r'));
 header('Accept-Ranges: bytes');
 header('Content-Length: '.strlen($output));
 print($output);
ob_end_flush();
?>

