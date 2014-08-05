// this displays the source code from the snippet
// due to browser restriction we have to download the file again as 'text' object

jQuery(document).ready(function() {

  // load the text to a 
  jQuery('.row script').each(function(i, e) {

    var row = jQuery(e).parent();
    var codePos =row.find(".source-code").first();
    codePos.append(jQuery('<pre class="hljs-js"><code></code></pre>'));
    var url = e.src;

    var codePosDOM = codePos[0];

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4 && xhr.status === 200){
        var data = xhr.responseText;
        var codePosInner = jQuery(codePosDOM);
        var codeBox =codePosInner.find("pre code").first();
        codeBox.text(jQuery.trim(data));
        hljs.highlightBlock(codeBox[0]);
      }
    };
    xhr.send();


  });

});
