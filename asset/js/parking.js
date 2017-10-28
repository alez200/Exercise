/**
 *
 * Parking widget
 *
 */

(function($) {

    $.fn.ParkingWidget = function(params) {

        //default params
        var defaults = {
            airportId        : null,
            parkingService   : null,
            parkingTemplate  : null,
            callbackFunction : null,
            containerWidget  : this,
        };

        //extend default params with wepapp params
        var parkingParams = $.extend(defaults, params);

        //Check if there are all the necessary params
        var ready = controllParams();

        if (ready) {
            //init widget
            init(parkingParams);

        }

        function controllParams (){

            var check = true;
            var msgErr = 'ERROR:\n';

            //controll airport id
            if (!parkingParams.airportId){

                msgErr = msgErr+'The airport id is missing \n';
                check = false;

            }

            //controll if there is parkingService url
            if (!parkingParams.parkingService){

                msgErr = msgErr+'The url service is missing \n';
                check = false;

            }

            //controll if there is widget template
            if (!parkingParams.parkingTemplate){

                msgErr = msgErr+'The widget template is missing \n';
                check = false;

            }

            //controll if there is parkingService url
            if (!parkingParams.callbackFunction){

                msgErr = msgErr+'The callbackFunction is missing \n';
                check = false;

            }

            if (!check){

                console.error(msgErr);

            }

            return check;

        };

        function init(){

            //set params for parkingService call
            var serviceParams = {

                airportId: parkingParams.airportId,

            };

            //call parkingService
            $.ajax({

                url: parkingParams.parkingService,
                data: serviceParams,
                async: true,
                cache: false,
                type: "POST",
                dataType: "json",

                error: function (xhr) {

                    var jsonResponse = JSON.parse(xhr.responseText);
                    console.error('ERRORE: '+jsonResponse);
                    console.log(xhr);

                },

                success: function (json) {

                    var objParking = null;

                    try {
                        objParking = JSON.parse(json);
                    } catch (e) {
                        objParking = json;
                    }

                    // render widget
                    render(objParking);

                }

            });

        };

        function render(objParking){

            //set data for template render
            var data = {};

            data['parking']=createSlot(objParking);
            data['features']=createFeatures(objParking.vendor.features);
            data['dictionary']=objParking.dictionary;
            data['vendor']=objParking.vendor;

            var view = data;

            $(".parking").load( parkingParams.parkingTemplate+" #parkingtpl",function(){
                var template = document.getElementById('parkingtpl').innerHTML;;
                var output = Mustache.render(template, view);
                $(".parking").html(output);

                //when template is loaded i can call function to manipolate widget
                toggler();
                selectParking();
            });

        };

        function createSlot(objParking){

            var parking = {};
            var slots = [];
            parking.slots = slots;

            $.each(objParking.parkings, function(i){

                var indoor = this.indoor==true ? objParking.dictionary.outdoorSpace : objParking.dictionary.indoorSpace;
                var assurance = this.assurance==true ? objParking.dictionary.insuranceIncluded : objParking.dictionary.insuranceExcluded;

                var slot ={
                    "id":this.id,
                    "name":objParking.vendor.name+' '+i,
                    "indoor":indoor,
                    "price" : this.price,
                    "assurance":assurance
                };

                parking.slots.push(slot);

            });

            return parking;

        };

        function createFeatures(objFeatures){

            var featuresList = {};
            var feature = [];
            featuresList.feature = feature;

            $.each(objFeatures, function(i){

                var item ={
                    "desc":this
                };

                featuresList.feature.push(item);

            });

            return featuresList;

        };

        //function to toggle some area
        function toggler(){

            $(parkingParams.containerWidget).on('click','.j__opener a', function(e){
                e.preventDefault();

                var opener = $(this);
                var target = opener.data('target');

                $('.'+target).toggleClass('j__hidden');
                opener.toggleClass('j__shower');
            });

        };

        //function to select parking slot
        function selectParking(){

            var form = $('.parking__slots');

            //set default params for callback function, use those params when no slots are selected
            var callbackParams = {

                airportId: parkingParams.airportId,
                slotId   : 0,
                slotPrice    : 0,
                slotName : null,

            };

            if (form.length > 0){

                var parkingslots = form.find('input[type=checkbox]');

                $(parkingslots).each( function(i){

                    $(this).on('click',function(e){

                        var slot =  $(this);
                        var slotId = slot.val();
                        var slotPrice = slot.data('price');
                        var slotName = slot.data('name');

                        if (slot.prop('checked') == true) {

                            $(parkingslots).prop('checked',false);
                            slot.prop('checked',true);

                            // set callback params
                            callbackParams.slotName = slotName;
                            callbackParams.slotId = slotId;
                            callbackParams.slotPrice = slotPrice;

                        } else {

                            // reset callback params
                            callbackParams.nameSlot = null;
                            callbackParams.slotId = 0;
                            callbackParams.slotPrice = 0;

                        };

                        // exec callback function
                        parkingParams.callbackFunction(callbackParams);

                    });

                });

            }

        };

    };

})(jQuery);
