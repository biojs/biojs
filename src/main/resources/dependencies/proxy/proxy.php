<?php

/* SPLIT PROXY FROM URL TO QUERY. QUERY: ALL INSIDE THE 'S' PARAMETER */
        $url = str_replace(" ", "%20", $_GET['url']);

/* SET INTERNAL PROXY */
        $proxy = "";
        //$proxy = "http://wwwcache.ebi.ac.uk:3128/";
        //$proxy = "http://wwwcache.sanger.ac.uk:3128/";


/* CURL CONFIGURARTION */
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 50);
        curl_setopt($ch, CURLOPT_TIMEOUT, 50);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        if(strlen($proxy) != 0){
                //curl_setopt($ch, CURLOPT_HTTPPROXYTUNNEL, 1); 
                curl_setopt($ch, CURLOPT_PROXY, "$proxy");
        }
        /* Don't return HTTP headers. Do return the contents of the call */     
        curl_setopt($ch, CURLOPT_HEADER, 0);


/* DISPLAY DATA FROM THE ORIGINAL QUERY */
		  	$xmlFlag = strpos($url, "stylesheet");
       	$data = curl_exec($ch); 
        	curl_close($ch);
			if($xmlFlag){
	            header("Content-Type: text/xml");
	      }else{
	            header("Content-Type: text/json");
	      }
        echo $data;
?>