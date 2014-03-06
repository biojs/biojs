<%@page session="false"
    import="java.net.*,java.io.*"
%><%
try {
	
	String reqUrl = request.getParameter("query");
	
	URL url = new URL(reqUrl);
	HttpURLConnection con = (HttpURLConnection)url.openConnection();
    con.setDoOutput(true);
    con.setRequestMethod("GET");
    int clength = request.getContentLength();
    if(clength > 0) {
        con.setDoInput(true);
        byte[] idata = new byte[clength];
        request.getInputStream().read(idata, 0, clength);
        con.getOutputStream().write(idata, 0, clength);
    }
    
   response.setContentType("application/x-download");
   
   InputStream inStream = con.getInputStream();
   byte[] data = new byte[1000];
   
   
   int nBytes = inStream.read(data);
   
   ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
   while(nBytes>0){
	   outputStream.write(data, 0, nBytes);
	   nBytes = inStream.read(data);
   }
   
   out.println(";base64,");
   out.println(new sun.misc.BASE64Encoder().encode(outputStream.toByteArray()));	   		
   
} catch(Exception e) {
    e.printStackTrace();
    response.setStatus(500);
}
%>