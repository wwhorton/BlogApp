define([
    'underscore',
    'backbone',
    'models/BlogAppModel'
], function(_, Backbone, BlogAppModel){
    var BlogAppCollection = Backbone.Collection.extend({
        url: '/',
        model: BlogAppModel,
        initialize: function(){
            this.collection.on('reset', function(){
                alert("Collection reset.");
            });
            this.collection.on('change', function(){
                alert("Collection changed.");
            });
            this.collection.fetch();
        }
        
    });
    return BlogAppCollection;
});
    