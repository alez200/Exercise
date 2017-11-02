
/**
 * Define namespace
 *
 */
var Lastminute = Lastminute || {};


/**
 * Define application core
 *
 */
Lastminute.core = function () {

    var core = this;

    this.boot = function () {

        core.initParking();

    };

    // This function initialilize and render the widget in a Wep app page.
    // The widget is a jquery plugin and use mustache.js to render the layout.
    // To properly initialize the widget you need to pass the following parameters:
    // - Airport identification (airportId)
    // - Server-side service Uri (parkingService)
    // - Html template path (parkingTemplate)
    // - Callback function to communicates user's selection (callbackFunction)

    this.initParking = function(){

        $('.parking').ParkingWidget({

            airportId        : 1,
            parkingService   :'asset/service/model.json',
            parkingTemplate  :'asset/template/parking.html',
            callbackFunction : core.cartUpdate,

        });

    };


    //This callback function permits the widget communicates with Web app
    this.cartUpdate = function(params){

        var msg ='';

        var slotSelected = params.slotId;

        if (slotSelected == 0){

            msg = ''

        } else {

            msg = 'Prenotazione parcheggio: '+ params.slotName +' '+params.slotPrice ;

        }

        var cartMsg =  $('.cart__msg');

        cartMsg.html(msg);

    };

};

/**
 * class instance acquisition
 *
 */
Lastminute.core.getInstance = function () {

    if (!window.lastminute) {

        window.lastminute = {};

    }

    if (!window.lastminute.core) {

        window.lastminute.core = new Lastminute.core();

    }

    return window.lastminute.core;

};

document.addEventListener("DOMContentLoaded", function(event) {

    // istanzio l'applicazione
    var core = Lastminute.core.getInstance();

    // init Web app Core application
    core.boot();

});