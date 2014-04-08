define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){
    var BlogPost = Backbone.Model.extend({
        //urlRoot: '/',
        defaults: {
            title: 'Blog Post: ', //+ $.datepicker.formatDate('mm/dd/yy', new Date()),
            user: 'Anonymous',
            date: '11/12/13', //$.datepicker.formatDate('mm/dd/yy', new Date()),
            body: 'Empty post.'
        }
    });
    return BlogPost;
});


