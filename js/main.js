require.config({
    paths: {
        jquery: 'http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min',
        underscore: 'libs/underscore-min',
        backbone: 'libs/backbone-min'
    }

});

require(['app'], function(App){
    App.initialize();
});
    