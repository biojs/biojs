 <?php 
	$url = $_GET["url"];
    
    $pathway = file_get_contents($url);
    $pathway = str_replace(array("\n", "\r", "\t"), '', $pathway);
    $pathway = trim(str_replace('"', "'", $pathway));

    $simpleXml = simplexml_load_string($pathway);
    $json = json_encode($simpleXml);

    print($json);
?>