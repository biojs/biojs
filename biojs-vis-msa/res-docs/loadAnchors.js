function convertToSlug(Text)
{
  return Text
    .toLowerCase()
    .replace(/[^\w ]+/g,'')
    .replace(/ +/g,'-')
    ;
}

function loadAnchors(jQuery){
  jQuery(document).ready(function() {
    // load anchors
    jQuery('h3').each(function(i, e) {

      var h3 = jQuery(e);
      var name = e.textContent.trim();
      name = convertToSlug(name);
      e.id = name;
      h3.append("<a name="+name+"> </a><a class='h-anchor' href='#" + name + "' target='_self'> #</a>");
    });
    jQuery('.trello-link').each(function(i, e) {
      var links = jQuery(e);
      e.target = "_blank";
    });
  });
}

if (typeof define === 'function' && define.amd) {
  require(["jquery"], function(jQuery){
    loadAnchors(jQuery);
  });
}else{
  loadAnchors(jQuery);
}
