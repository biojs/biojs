var HpaSummaryFeature = (
    {
        start:function(input){
            this.input = input;
        },

        test: function(){
            //jQuery("#"+this.input.target).html("This is Hello World by JQuery");
            alert(this.input.target);
        }
    });

module.exports = HpaSummaryFeature;