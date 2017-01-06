// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
       
            $.ajax({
                url: "http://azurerestservice20170105011812.azurewebsites.net/api/ToDoItem"
            }).then(function (data) {

                $.each(data, function (index, item) {
                    $("#ToDoItems").append("<input type='checkbox' id='chk" + item.id + "'/>" + item.Text + "<br/>");

                    if (item.Complete === 1) {
                        $('#chk' + item.id).attr('checked', true);

                    }
                });

            });
        
    }

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    }

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    }
} )();