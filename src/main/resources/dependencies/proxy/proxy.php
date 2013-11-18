<?php

/* DOMAINS ALLOWED IN THE PROXY */
        $allowedDomains = array(
                'http://www.ebi.ac.uk',
                'http://wwwdev.ebi.ac.uk',
                'http://das.proteinatlas.org',
                'http://www.ensembl.org',
		        'http://www-test.ebi.ac.uk',
                'http://rest.kegg.jp/'
        );
        
/* GET THE URL TO PROXY */
	$url = $_GET['url'];	


/* CHECK URL IS ALLOWED */	
	$allowUrl = "FALSE";
	foreach ($allowedDomains as $domain) {
		$pos = strpos($url, $domain);
		if($pos === 0){
			$allowUrl = "TRUE";
		}
	}

if($allowUrl == "TRUE"){
    
/* SET INTERNAL PROXY */
    $ebiDomainFlag = strpos($_SERVER['SERVER_NAME'], "ebi.ac.uk");
	$sangerDomainFlag = strpos($_SERVER['SERVER_NAME'], "sanger.ac.uk");
        
    if ( $ebiDomainFlag ) {
        $proxy = "http://wwwcache.ebi.ac.uk:3128/";
    } elseif ( $sangerDomainFlag ) {
        $proxy = "http://wwwcache.sanger.ac.uk:3128/";
    } else {
		$proxy = "";
	}
	$ch = curl_init();
		
/* SET DATA */ 
	$data = $_GET;
	unset($data['url']);

	$query = '';
	reset($data);
	while ($element = current($data)) {
		$query .= key($data).'='.$element.'&';
		next($data);
	}

	$query = substr($query,0,strlen($query)-1);
	$url .= ( strpos($url, '?') ) ? '&'.$query : '?'.$query ;



/* Encoding charachters that are probelmatic for CURL */
	$url = str_replace('<','%3C',$url); 
	$url = str_replace('>','%3E',$url); 
	$url = str_replace('"','%22',$url); 
	$url = str_replace(' ','%20',$url); 

	if(substr($url, -1) == "&"){
		$url = substr($url,0,-1);
	}



/* CURL CONFIGURARTION */
        
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 50);
	curl_setopt($ch, CURLOPT_TIMEOUT, 50);
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_VERBOSE, 0);
		
	if(strlen($proxy) != 0){
		curl_setopt($ch, CURLOPT_PROXY, "$proxy");
	}
    /* Don't return HTTP headers. Do return the contents of the call */     
	curl_setopt($ch, CURLOPT_HEADER, 0);
	$response = curl_exec($ch);
		
/* DISPLAY DATA FROM THE ORIGINAL QUERY */
	$mimeType = "";
	if ($mimeType == "")
	{
		if ( strpos($_SERVER['HTTP_ACCEPT'], "xml") ) {
			$mimeType = "application/xml";
		} else if ( strpos($_SERVER['HTTP_ACCEPT'], "json") ) {
			$mimeType = "application/json";
		} else {
			$mimeType = "text/plain";
		}
	} 
	header("Content-Type: ".$mimeType);
	curl_close($ch);
    echo $response;
    
} else {
    echo "The URL defined in the proxy is not allowed. Please check the URL or change the proxy configuration.";
}
?>
	
