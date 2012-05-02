<?php

/* SPLIT PROXY FROM URL TO QUERY. QUERY: ALL INSIDE THE 'url' PARAMETER */
        $url = ($_POST['url']) ? $_POST['url'] : $_GET['url'];

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
		$data = ($_POST['url']) ? $_POST : $_GET;
		unset($data['url']);

		$query = '';
		reset($data);
		while ($element = current($data)) {
		   $query .= key($data).'='.$element.'&';
		   next($data);
		}

		$query = substr($query,0,strlen($query)-1);

		if ($_POST['url']) {
			 curl_setopt ($session, CURLOPT_POST, true);
			 curl_setopt ($session, CURLOPT_POSTFIELDS, $query);
		} else {
			$url .= ( strpos($url, '?') ) ? '&'.$query : '?'.$query ;
		}




/* Encoding charachters that are probelmatic for CURL */
	$url = str_replace('<','%3C',$url); 
	$url = str_replace('>','%3E',$url); 
	$url = str_replace('"','%22',$url); 
	$url = str_replace(' ','%20',$url); 


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
	$headers = ($_POST['headers']) ? $_POST['headers'] : $_GET['headers'];
	$mimeType =($_POST['mimeType']) ? $_POST['mimeType'] : $_GET['mimeType'];
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
	// The web service returns XML. Set the Content-Type appropriately
	header("Content-Type: ".$mimeType);
		
	curl_close($ch);

        echo $response;
?>
