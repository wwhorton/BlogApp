define([
    'jquery',
    'underscore',
    'backbone',
    'views/BlogAppView'
], function($, _, Backbone, BlogAppView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '/': 'showAll',
            '/new': 'newPost',
            '/edit': 'editPost',
            '/save': 'savePost',
            '/del': 'delPost',
            '/newUser': 'newUser',
            '/login': 'login',
            '*path': 'default'
        }
    });
    
    var initialize = function(){
        alert("Router initializing!");
        var blogAppView = new BlogAppView;
        blogAppView.initialize();
        
        var appRouter = new AppRouter;
        appRouter.on('showAll', function(){
            alert("This would show the whole collection.");
        });
        appRouter.on('newPost', function(){
            alert("This would show the new post dialogue.");
        });
        appRouter.on('editPost', function(){
            alert("This would allow editing of the user's post.");
        });
        appRouter.on('savePost', function(){
            alert("This would save the edited/new post.");
        });
        appRouter.on('del', function(){
            alert("This would delete the post.");
        });
        appRouter.on('newUser', function(){
            alert("This would create a new user.");
        });
        appRouter.on('login', function(){
            alert("This would log a user in.");
        });
        appRouter.on('default', function(){
            alert("This is a default action.");
        });
        Backbone.history.start({pushState:true});
    };
    return {
        initialize: initialize
    };
});
            
            
            
    