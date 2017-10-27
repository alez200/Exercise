
/**
 * Definisco il namespace
 *
 */
var Lastminute = Lastminute || {};


/**
 * Definizione core logic applicazione
 *
 */
Lastminute.core = function () {

    /**
     * Variabili locali
     *
     */
    var core = this;

    this.boot = function () {

        core.initParking();

    };

    this.initParking = function(){

        var params ={

            airportId: 1,
            parkingService  :'http://localhost/exercise/asset/service/model.json',
            appFunction     : core.cartUpdate,
            containerWidget :'.parking',

        };

        core.parkingWidget(params);

    };

    this.cartUpdate = function(){

        //alert('rispondo')

    };

    this.parkingWidget = function(params){

        console.log($('body'));

        var parkingParams = params;

        //controll if there is the airport id
        if (!parkingParams.airportId){

            console.error('ERROR: the airport id is missing');
            return false;

        }

        //controll if there is parkingService url
        if (!parkingParams.containerWidget){

            console.error('ERROR: the container widget is missing');
            return false;

        }

        //controll if there is parkingService url
        if (!parkingParams.parkingService){

            console.error('ERROR: the url service is missing');
            return false;

        }

        var serviceParams = {

            airportId: parkingParams.airportId,

        };

        var container = $(parkingParams.containerWidget);

        //call parkingService
        $.ajax({

            url: parkingParams.parkingService,
            data: serviceParams,
            async: true,
            cache: false,
            method: "POST",
            dataType: "json",

            success: function (json) {

                var objForm = jQuery.parseJSON(json);
                console.log(objForm);

            }

        });

        console.log(params);
        params.appFunction();

    };


};

/**
 * Acquisizione istanza classe
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

    // istanzio l'applicazione
    var core = Lastminute.core.getInstance();

    // inizializzo l'applicazione
    core.boot();

});