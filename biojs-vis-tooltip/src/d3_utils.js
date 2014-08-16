require('d3');

d3.selection.prototype.move_to_front = function () {
    return this.each(function () {
        this.parentNode.appendChild(this);
    });
};


d3.selection.prototype.selectAncestor = function (type) {

    type = type.toLowerCase();

    var selfNode = this.node();
    if (selfNode.parentNode === null) {
        console.log("No more parents");
        return undefined
    }

    var tagName = selfNode.parentNode.tagName;

    if ((tagName !== undefined) && (tagName.toLowerCase() === type)) {
        return d3.select(selfNode.parentNode);
    } else {
        return d3.select(selfNode.parentNode).selectAncestor(type);
    }
};

// inspired on http://james.padolsey.com/javascript/monitoring-dom-properties/
d3.selection.prototype.watch = function (id, fn) {
    return this.each(function () {
        var self = d3.select(this);
        var oldVal = self.style(id);
        self.watch_timer = setInterval(function () {
            if (self.style(id) !== oldVal) {
                fn.call(self, oldVal, self.style(id));
                oldVal = self.style(id);
            }
        }, 1000);
    });
    return;
};

module.exports = d3;
