//Taken from
//http://www.west-wind.com/weblog/posts/2008/Sep/12/jQuery-CSS-Property-Monitoring-Plugin-updated
$.fn.watch = function(props, func, interval, id) {
    /// <summary>
    /// Allows you to monitor changes in a specific
    /// CSS property of an element by polling the value.
    /// when the value changes a function is called.
    /// The function called is called in the context
    /// of the selected element (ie. this)
    /// </summary>    
    /// <param name="prop" type="String">CSS Property to watch. If not specified (null) code is called on interval</param>    
    /// <param name="func" type="Function">
    /// Function called when the value has changed.
    /// </param>    
    /// <param name="func" type="Function">
    /// optional id that identifies this watch instance. Use if
    /// if you have multiple properties you're watching.
    /// </param>
    /// <param name="id" type="String">A unique ID that identifies this watch instance on this element</param>  
    /// <returns type="jQuery" /> 
    if (!interval)
        interval = 200;
    if (!id)
        id = "_watcher";

    return this.each(function() {
        var _t = this;
        var el = $(this);
        var fnc = function() { __watcher.call(_t, id) };
        var itId = null;

        if (typeof (this.onpropertychange) == "object")
            el.bind("propertychange." + id, fnc);
        else if ($.browser.mozilla)
            el.bind("DOMAttrModified." + id, fnc);
        else
            itId = setInterval(fnc, interval);

        var data = { id: itId,
            props: props.split(","),
            func: func,
            vals: []
        };
        $.each(data.props, function(i) { data.vals[i] = el.css(data.props[i]); });
        el.data(id, data);
    });

    function __watcher(id) {
        var el = $(this);
        var w = el.data(id);

        var changed = false;
        var i = 0;
        for (i; i < w.props.length; i++) {
            var newVal = el.css(w.props[i]);
            if (w.vals[i] != newVal) {
                w.vals[i] = newVal;
                changed = true;
                break;
            }
        }
        if (changed && w.func) {
            var _t = this;
            w.func.call(_t, w, i)
        }
    }
}
$.fn.unwatch = function(id) {
    this.each(function() {
        var w = $(this).data(id);
        var el = $(this);
        el.removeData();

        if (typeof (this.onpropertychange) == "object")
            el.unbind("propertychange." + id, fnc);
        else if ($.browser.mozilla)
            el.unbind("DOMAttrModified." + id, fnc);
        else
            clearInterval(w.id);
    });
    return this;
}