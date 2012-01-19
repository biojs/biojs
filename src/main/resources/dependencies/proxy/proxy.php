<?php

/* SPLIT PROXY FROM URL TO QUERY. QUERY: ALL INSIDE THE 'S' PARAMETER */
        //$url = str_replace(" ", "%20", $_GET['url']);
        $url = ($_POST['url']) ? $_POST['url'] : $_GET['url'];
		$headers = ($_POST['headers']) ? $_POST['headers'] : $_GET['headers'];
		$mimeType =($_POST['mimeType']) ? $_POST['mimeType'] : $_GET['mimeType'];

/* SET INTERNAL PROXY */
        $ebiDomainFlag = strpos($_SERVER['SERVER_NAME'], "ebi.ac.uk");
        
        if ( $ebiDomainFlag ) {
        	$proxy = "http://wwwcache.ebi.ac.uk:3128/";
        } else {
        	$proxy = "";
        }
		
        //$proxy = "http://wwwcache.ebi.ac.uk:3128/";
        //$proxy = "http://wwwcache.sanger.ac.uk:3128/";

		$ch = curl_init();
		
// SET DATA 
		$data = ($_POST['url']) ? $_POST : $_GET;
		unset($data['url']);

		$query = '';
		while ($element = current($data)) {
		   $query .= key($data).'='.$element.'&';
		   next($data);
		}

		if ($_POST['url']) {
			 curl_setopt ($session, CURLOPT_POST, true);
			 curl_setopt ($session, CURLOPT_POSTFIELDS, $query);
		} else {
			$url .= ( strpos($url, '?') ) ? '&'.$query : '?'.$query ;
		}


/* CURL CONFIGURARTION */
        
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 50);
        curl_setopt($ch, CURLOPT_TIMEOUT, 50);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);
		
        if(strlen($proxy) != 0){
            curl_setopt($ch, CURLOPT_PROXY, "$proxy");
        }
        /* Don't return HTTP headers. Do return the contents of the call */     
        curl_setopt($ch, CURLOPT_HEADER, 0);
		$response = curl_exec($ch);
		
/* DISPLAY DATA FROM THE ORIGINAL QUERY */

		if ($mimeType == "")
		{
			if ( strpos($_SERVER['SERVER_NAME'], "xml") ) {
				$mimeType = "application/xml";
			} else if ( strpos($_SERVER['SERVER_NAME'], "json") ) {
				$mimeType = "application/json";
			} else {
				$mimeType = "text/plain";
			}
			
		} 
		
		// The web service returns XML. Set the Content-Type appropriately
		header("Content-Type: ".$mimeType);

        echo $response;
		
		curl_close($ch);
?>