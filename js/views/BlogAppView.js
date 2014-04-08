define([
    'jquery',
    'underscore',
    'backbone',
    'collections/BlogAppCollection',
    'text!templates/post.html'
], function($, _, Backbone, BlogAppCollection, Template){
    
    var BlogPostView = Backbone.View.extend({
        el: $('#posts'),
        initialize: function(){
            this.collection = new BlogAppCollection();
            this.collection.add({title: "Test Post"});
            var compiledTemplate = _.template(Template, { posts: this.collection.models });
            this.$el.html(compiledTemplate);

    }
        
    });
    return BlogPostView;
});







/*var html = '<header><h1>' + this.model.get('title') + '</h1>' +
         ' by <address><a href="#">' this.model.get('user') + '</a></address> posted on <time datetime="'+ this.model.get('date') + '</time></header><p>' + this.model.get('body') + '</p>';*/