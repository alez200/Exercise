Parking Widget

For make the widget i didn't use any Dev environment.
I didn't use any css pre-processor.
I used jQuery and Mustache.js like template engine.

I haven't minify any file because this is like devel environmet.

To embed the widget into the Web app, you must create a empty div in the html body.
The div class can be called as you wish.

Into page header you need call widget'stylesheets (parking.css) and the javascript code (parking.js), and you must import jQuery and Mustache.js libraries.

In the Web app code javascript (script.js) the widget is inizialized.

initParking() is the function that initialize and render the widget in a Wep app page.
The widget is a jQuery plugin and use Mustache.js to render the layout.
To properly initialize the widget you need to pass the following parameters:

- Airport identification (airportId)
- Server-side service Uri (parkingService)
- Html template path (parkingTemplate)
- Callback function to communicates user's selection (callbackFunction).

Below is a quick example how to initalize the widget:

    $('.parking').ParkingWidget({

        airportId        : 1,
        parkingService   :'asset/service/model.json',
        parkingTemplate  :'asset/template/parking.html',
        callbackFunction : core.cartUpdate,

    });

When user select a slot parking the widget comunicates at the webapp the following information:

- Airport identification  (airportId)
- Parking slot identification (slotId)
- Parking slot price (slotPrice)
- Parking slot name (slotName)

If user deselect slot parking the widget comunicates same information but with default value:

- airportId: parkingParams.airportId,
- slotId   : 0,
- slotPrice    : 0,
- slotName : null,



To ensure that another developer or me can modify the widget code without breaking the features, must use a version control system such as Git or Svn.
I wrote maintenable, readable and well formed code, the classes that widget use in js have a prefix js__ , so who will refactor the html knows that those class are used in js functionality .
I did not use test tools because I do not know them well, but to ensure that the code is robust it is necessary to use them strictly.

The widget is device agnostic, isn't necessary differentiate between desktop and mobile devices. It's responsive.