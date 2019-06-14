// NOTE:
var mymap = L.map('mapid').setView([35.084877299999995,
          -106.6468263], 11.4);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoiY2FtcGJlbGxyIiwiYSI6ImNqdmlwNXYyejA4Y2c0OG9qYnAyanlxdncifQ.t6djm2dI83fR6xpD4G1lhQ'
}).addTo(mymap);
  // iconUrl: 'https://gkv.com/wp-content/uploads/leaflet-maps-marker-icons/map_marker-orange-small.png',

//
// var dialog = L.control.dialog({
//   size: [300, 300],
//   anchor: [250, 250]
// })
//   .setContent("<p>Hello! Welcome to your nice new dialog box!</p>")
//   .addTo(mymap);
// dialog.open();
// NOTE: adding custom icon markers here
var orangeIcon = L.icon({
    iconUrl: 'icons/bus.png',
    shadowUrl: '',

    iconSize:     [20, 20],  // size of the icon
    iconAnchor:   [12, 12],  // where the icon is anchored on the map
    popupAnchor:  [0, -28],
});
var upArrow = L.icon({
    iconUrl: 'icons/arrow_up.png',
    shadowUrl: '',

    iconSize:     [20, 20],  // size of the icon
    iconAnchor:   [12, 30],  // where the icon is anchored on the map
    popupAnchor:  [0, -28],
});
var redIcon = L.icon({
  iconUrl: 'icons/map_marker-red1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var blueIcon = L.icon({
  iconUrl: 'icons/map_marker-blue1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var purpleIcon = L.icon({
  iconUrl: 'icons/map_marker-purple1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var lightBlueIcon = L.icon({
  iconUrl: 'icons/map_marker-lightblue1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var greenIcon = L.icon({
  iconUrl: 'icons/map_marker-green1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var yellowIcon = L.icon({
  iconUrl: 'icons/map_marker-yellow1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var pinkIcon = L.icon({
  iconUrl: 'icons/map_marker-pink1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var greyIcon = L.icon({
  iconUrl: 'icons/map_marker-grey1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});
var blackIcon = L.icon({
  iconUrl: 'icons/map_marker-black1.png',
  shadowUrl: '',

  iconSize:     [28, 34],  // size of the icon
  iconAnchor:   [12, 30],  // where the icon is anchored on the map
  popupAnchor:  [0, -28]
});


// NOTE: button variables
var button9 = document.getElementById('button9');
var checkBox66 = document.querySelector("input[name=CheckBox66]");
 var checkBox11 = document.querySelector('input[name=checkBox11]');
 var checkBox8 = document.querySelector('input[name=checkBox8]');
 var checkBox1 = document.querySelector('input[name=checkBox1]');
 var checkBox31 = document.querySelector('input[name=checkBox31]');
var route66CheckBox = document.getElementById('route66CheckBox');
var route11CheckBox = document.getElementById('route11CheckBox');
var route8CheckBox = document.getElementById('route8CheckBox');
var route1CheckBox = document.getElementById('route1CheckBox');
var route31CheckBox = document.getElementById('route31CheckBox');

// NOTE: all the busses global arrays
var route66Busses = [];
var route11Busses = [];
var route8Busses = [];
var route1Busses = [];
var route31Busses = [];

// NOTE: all the arrow marker global arrays
var route66Arrows = [];
var route11Arrows = [];
var route8Arrows = [];
var route1Arrows = [];
var route31Arrows = [];

// NOTE: all the polyline global arrays
var route66Line = [];
var route11Line = [];
var route8Line = [];
var route1Line = [];
var route31Line = [];


// NOTE: bus object creator
function bus(id, lat, long, stop) {
  this.routeID = id;
  this.latitude = lat;
  this.longitude = long;
  this.nextStop = stop;
}



// NOTE: start of route 66 markers and tracking
bus66Angle = [];
function addRoute66(){
  fetch('http://data.cabq.gov/transit/realtime/route/route66.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for(i=0;i<data.vehicles.length;i++){
     route66Busses[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {
        icon: orangeIcon
        });
    route66Arrows[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {
       icon: upArrow
       });
    route66Arrows[i].setRotationAngle(data.vehicles[i].heading);
}

});
}


var nextStopHours = [];
var nextStopMinutes = [];
function route66(){
  fetch('http://data.cabq.gov/transit/realtime/route/route66.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {

      // var now = new Date();
      // var hour = now.getHours();
      // var minutes = now.getMinutes();
      // var milliseconds = now.getMilliseconds();
      // var time = Number(hour+':'+minutes+':'+milliseconds);
      // var nextStopHour = Number(data.vehicles[0].next_stop_sched_time[0][0]+data.vehicles[0].next_stop_sched_time[0][1]);
      // var newHour = nextStopHour-hour;
       for(i=0;i<data.vehicles.length;i++){
      // bus66Angle[i] = data.vehicles[i].heading;
      //
      // nextStopMinutes[i] = Number(data.vehicles[i].next_stop_sched_time[0][3]+data.vehicles[i].next_stop_sched_time[0][4]);
      // nextStopHour[i] = Number(data.vehicles[i].next_stop_sched_time[0][0]+data.vehicles[i].next_stop_sched_time[0][2]);
      route66Arrows[i].setRotationAngle(data.vehicles[i].heading);

      route66Arrows[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);



      route66Busses[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);
      route66Busses[i].bindPopup('<p><b>Bus: </b> #'+data.vehicles[i].vehicle_id+'. <br><b>Next stop: </b>'+data.vehicles[i].next_stop_name[0]);
      // '<br><b>Time Until Next Stop:</b> '+(nextStopHour-hour)+' Hours and '+(nextStopMinutes[i]-minutes)+' Minutes</p>'

    }
});
}
// NOTE: start of route11 markers and tracking

function addRoute11(){
  fetch('http://data.cabq.gov/transit/realtime/route/route11.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for(i=0;i<data.vehicles.length;i++){
     route11Busses[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {icon: orangeIcon});
     route11Arrows[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {
        icon: upArrow
        });

    }
});
}
// NOTE: start of route11 latitude and longitude fetching

function route11(){
  fetch('http://data.cabq.gov/transit/realtime/route/route11.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      for(i=0;i<data.vehicles.length;i++){

        route11Arrows[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);

      route11Arrows[i].setRotationAngle(data.vehicles[i].heading);

       route11Busses[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);
       route11Busses[i].bindPopup('<b>Bus:</b> #'+data.vehicles[i].vehicle_id+'.<br> <b>Next stop: </b>'+data.vehicles[i].next_stop_name[0]);
      }

});
}
// NOTE: start of route 8 markers and tracking

function addRoute8(){
  fetch('http://data.cabq.gov/transit/realtime/route/route8.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for(i=0;i<data.vehicles.length;i++){
     route8Busses[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {icon: orangeIcon});

     route8Arrows[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {icon: upArrow});
    }
});
}
// NOTE: start of route11 latitude and longitude fetching
function route8(){
  fetch('http://data.cabq.gov/transit/realtime/route/route8.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      for(i=0;i<data.vehicles.length;i++){
        route8Arrows[i].setRotationAngle(data.vehicles[i].heading);

      route8Arrows[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);

       route8Busses[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);
       route8Busses[i].bindPopup('<b>Bus:</b> #'+data.vehicles[i].vehicle_id+'.<br> <b>Next Stop: </b>'+data.vehicles[i].next_stop_name[0]);

    }
});
}
// NOTE: start of route 8 markers and tracking
function addRoute1(){
  fetch('http://data.cabq.gov/transit/realtime/route/route1.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for(i=0;i<data.vehicles.length;i++){
     route1Busses[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {icon: orangeIcon});
     route1Busses[i].bindPopup('<b>Bus:</b> #'+data.vehicles[i].vehicle_id+'.<br> <b>Next Stop: </b>'+data.vehicles[i].next_stop_name[0]);
     route1Arrows[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {
        icon: upArrow
        });
    }
});
}
// NOTE: start of route11 latitude and longitude fetching
function route1(){
  fetch('http://data.cabq.gov/transit/realtime/route/route1.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    function setLatLng(){
      for(i=0;i<data.vehicles.length;i++){

        route1Arrows[i].setRotationAngle(data.vehicles[i].heading);

        route1Arrows[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);


       route1Busses[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);
      }
    }
    setLatLng();
});
}

function addRoute31(){
  fetch('http://data.cabq.gov/transit/realtime/route/route31.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    for(i=0;i<data.vehicles.length;i++){
     route31Busses[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {icon: greenIcon});

      route31Arrows[i] = L.marker([data.vehicles[i].latitude, data.vehicles[i].longitude], {icon: upArrow});


    }
});
}
// NOTE: start of route latitude and longitude fetching
function route31(){
  fetch('http://data.cabq.gov/transit/realtime/route/route31.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
      for(i=0;i<data.vehicles.length;i++){

       route31Arrows[i].setRotationAngle(data.vehicles[i].heading);

       route31Arrows[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);

       route31Busses[i].setLatLng([data.vehicles[i].latitude, data.vehicles[i].longitude]);
       route31Busses[i].bindPopup('<b>Bus:</b> #'+data.vehicles[i].vehicle_id+'.<br> <b>Next stop: </b>'+data.vehicles[i].next_stop_name[0]);

      }

});
}

// NOTE: polyline routing for 66



function drawRoute66(){
  fetch('http://abqridetracker.com/data/map.geojson')
  .then(response => response.json())
  .then(function (shapes){
    // route1.length = Math.min(route1.length, 249);
    //
      // route66Line.length = Math.min(route66Busses.length, 346);
      var route66Cords = [];
      var route66marker = [];
    var cords = shapes.features[104].geometry.coordinates;
      for(i=0;i<cords.length;i++){
       route66marker[i] = L.marker([cords[i][1],cords[i][0]]);
       route66Cords.push(route66marker[i].getLatLng());
       route66Line[i] = L.polyline(route66Cords,{color: 'orange', smoothFactor: 1, opacity: 0.2});
       // route66Line.length = route66Line[i].length;
       // route66marker.length = Math.min(route66marker, route66marker[i])
       // route66Cords.length = Math.min(route66Cords, route66Cords[i])

      }
  });
}

function drawRoute11(){
  fetch('http://abqridetracker.com/data/map.geojson')
  .then(response => response.json())
  .then(function (shapes){
    // route1.length = Math.min(route1.length, 249);
    // console.log(shapes.features[0].geometry.coordinates[1]);
    var cords1 = shapes.features[7].geometry.coordinates;
    var route11Cords = [];
    var route11Marker = [];
      for(i=0;i<cords1.length;i++){
       route11Marker[i] = L.marker([cords1[i][1],cords1[i][0]]);
       route11Cords.push(route11Marker[i].getLatLng());
       route11Line[i] = L.polyline(route11Cords,{color: 'red', smoothFactor: 1, opacity: 0.2});
      }
  });
}


function drawRoute8(){
  fetch('http://abqridetracker.com/data/map.geojson')
  .then(response => response.json())
  .then(function (shapes){
    var cords = shapes.features[118].geometry.coordinates;
    var route8Cords = [];
    var route8Marker = [];
      for(i=0;i<cords.length;i++){
       route8Marker[i] = L.marker([cords[i][1],cords[i][0]]);
       route8Cords.push(route8Marker[i].getLatLng());
       route8Line[i] = L.polyline(route8Cords,{color: 'blue', smoothFactor: 1, opacity: 0.2});
      }
  });
}

function drawRoute1(){
  fetch('http://abqridetracker.com/data/map.geojson')
  .then(response => response.json())
  .then(function (shapes){
    var cords = shapes.features[0].geometry.coordinates;
    var route1Cords = [];
    var route1Marker = [];
      for(i=0;i<cords.length;i++){
      route1Marker[i]  = L.marker([cords[i][1],cords[i][0]]);
       route1Cords.push(route1Marker[i].getLatLng());
       route1Line[i] = L.polyline(route1Cords,{color: 'purple', smoothFactor: 0.5, opacity: 0.2});
      }
  });
}

function drawRoute31(){
  fetch('abqridetracker.com/data/map.geojson')
  .then(response => response.json())
  .then(function (shapes){
    // route1.length = Math.min(route1.length, 249);
    // console.log(shapes.features[0].geometry.coordinates[1]);
    var route31Cords = [];
    var route31Marker = [];
    var cords = shapes.features[72].geometry.coordinates;
      for(i=0;i<cords.length;i++){
       route31Marker[i] = L.marker([cords[i][1],cords[i][0]]);
       route31Cords.push(route31Marker[i].getLatLng());
       route31Line[i] = L.polyline(route31Cords,{color: 'green', smoothFactor: 1, opacity: 0.2});
      }
  });
}

addRoute66();
drawRoute66();
addRoute11();
drawRoute11();
addRoute8();
drawRoute8();
addRoute1();
drawRoute1();
addRoute31();
drawRoute31();

checkBox66.addEventListener('change', function(){
  if(this.checked){


    for(i=0;i<route66Busses.length;i++){
         mymap.addLayer(route66Busses[i]);
       }

        for(i=0; i<route66Line.length;i++){
          mymap.addLayer(route66Line[i]);
        }
        for(i=0; i<route66Arrows.length;i++){
          mymap.addLayer(route66Arrows[i]);
        }
        window.setInterval(function(){
          route66();
        }, 1000);
  }else{
    for(i=0;i<route66Busses.length;i++){
         mymap.removeLayer(route66Busses[i]);
       }

        for(i=0; i<route66Line.length;i++){
          mymap.removeLayer(route66Line[i]);
        }
        for(i=0; i<route66Arrows.length;i++){
          mymap.removeLayer(route66Arrows[i]);
        }
      }
});
checkBox11.addEventListener('change', function(){
  if(this.checked){
    for(i=0;i<route11Busses.length;i++){
     mymap.addLayer(route11Busses[i]);
   }
    window.setInterval(function(){
      route11();
    }, 1000);
    for(i=0; i<route11Line.length;i++){
      mymap.addLayer(route11Line[i]);
    }
    for(i=0; i<route11Arrows.length;i++){
      mymap.addLayer(route11Arrows[i]);
    }
  }else{
    for(i=0;i<route11Busses.length;i++){
      mymap.removeLayer(route11Busses[i]);
    }
    for(i=0; i<route11Line.length;i++){
    mymap.removeLayer(route11Line[i]);
    }
    for(i=0; i<route11Arrows.length;i++){
    mymap.removeLayer(route11Arrows[i]);
    }
  }
});
checkBox8.addEventListener('change', function(){
  if(this.checked){
    for(i=0;i<route8Busses.length;i++){
     mymap.addLayer(route8Busses[i]);
   }
    window.setInterval(function(){
      route8();
    }, 1000);
    for(i=0; i<route8Line.length;i++){
      mymap.addLayer(route8Line[i]);
    }
    for(i=0; i<route8Arrows.length;i++){
      mymap.addLayer(route8Arrows[i]);
    }
  }else {
    for(i=0;i<route8Busses.length;i++){
      mymap.removeLayer(route8Busses[i]);
    }
    for(i=0; i<route8Line.length;i++){
    mymap.removeLayer(route8Line[i]);
    }
    for(i=0; i<route8Arrows.length;i++){
    mymap.removeLayer(route8Arrows[i]);
    }
  }
});
checkBox1.addEventListener('change', function(){
  if(this.checked){
    for(i=0;i<route1Busses.length;i++){
     mymap.addLayer(route1Busses[i]);
   }
    window.setInterval(function(){
      route1();
    }, 1000);
    for(i=0; i<route1Line.length;i++){
      mymap.addLayer(route1Line[i]);
    }
    for(i=0; i<route1Arrows.length;i++){
      mymap.addLayer(route1Arrows[i]);
  }

  }else{
    if(mymap.hasLayer(route1Line[0])){
      for(i=0;i<route1Busses.length;i++){
        mymap.removeLayer(route1Busses[i]);
      }
      for(i=0; i<route1Line.length;i++){
      mymap.removeLayer(route1Line[i]);
      }
      for(i=0; i<route1Arrows.length;i++){
        mymap.removeLayer(route1Arrows[i]);
      }
  }
}
});
checkBox31.addEventListener('change', function(){
  if(this.checked){
    for(i=0;i<route31Busses.length;i++){
     mymap.addLayer(route31Busses[i]);
   }
    window.setInterval(function(){
      route31();
    }, 1000);
    for(i=0; i<route31Line.length;i++){
      mymap.addLayer(route31Line[i]);
    }
    for(i=0; i<route31Arrows.length;i++){
    mymap.addLayer(route31Arrows[i]);
    }
  }else{
    for(i=0;i<route31Busses.length;i++){
      mymap.removeLayer(route31Busses[i]);
    }
    for(i=0; i<route31Line.length;i++){
    mymap.removeLayer(route31Line[i]);
    }
    for(i=0; i<route31Arrows.length;i++){
    mymap.removeLayer(route31Arrows[i]);
    }
  }
});
route31CheckBox.addEventListener('click', function(){
  if(mymap.hasLayer(route31Line[0])){
    for(i=0;i<route31Busses.length;i++){
      mymap.removeLayer(route31Busses[i]);
    }
    for(i=0; i<route31Line.length;i++){
    mymap.removeLayer(route31Line[i]);
    }
    for(i=0; i<route31Arrows.length;i++){
    mymap.removeLayer(route31Arrows[i]);
    }
  }else{
    for(i=0;i<route31Busses.length;i++){
     mymap.addLayer(route31Busses[i]);
   }
    window.setInterval(function(){
      route31();
    }, 1000);
    for(i=0; i<route31Line.length;i++){
      mymap.addLayer(route31Line[i]);
    }
    for(i=0; i<route31Arrows.length;i++){
    mymap.addLayer(route31Arrows[i]);
    }
  }
});
button9.addEventListener('click', function(){
  location.reload();
});
