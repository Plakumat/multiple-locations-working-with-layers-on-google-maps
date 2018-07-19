            var map;
            var service;            

            //handle search results
            function handleSearchResults(results, status){
                console.log(results);

                for(var i = 0; i < results.length; i++){
                    var marker = new google.maps.Marker({
                        position: results[i].geometry.location,
                        map: map,
                        icon: 'shell.png'
                        /*icon: 'bp.png'*/
                        /*icon: results[i].icon*/
                    });                   

                }
            }    
            
            function performSearch(){
                var request = {
                    bounds: map.getBounds(),
                    name: "Shell"
                }

                service.nearbySearch(request, handleSearchResults);
            }

            //initialize function of main
            function initialise(location){
                console.log(location);
                
                var currentLocation = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);

                var mapOptions = {
                    center: currentLocation,
                    zoom: 11,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                }

                map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
                
                //create a marker for current position
                var marker = new google.maps.Marker({
                    position: currentLocation,
                    map: map,
                    icon: 'hand.png'
                });
            
                service = new google.maps.places.PlacesService(map);

                google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
                
                //refresh map button for looking all markers around more
                $('#refresh-map').click(performSearch);
                
                //draw circle around current position marker
                var strokeAndFillOptions = {
                    strokeColor: "#0000FF",
                    strokeOpacity: 0.8,
                    strokeWeight: 1.5,
                    fillColor: "#0000FF",
                    fillOpacity: 0.35,
                    map: map,
                    center: currentLocation,
                    radius: 2000
                };

                var strFillOpt = new google.maps.Circle(strokeAndFillOptions);

                //show traffic status with TrafficLayer()
                var trafficStatus = new google.maps.TrafficLayer();
                $('#show-traffic-status').click(function(){
                    if(trafficStatus.getMap()){
                        trafficStatus.setMap(null);
                    }else{
                        trafficStatus.setMap(map);
                    }
                });

                //show cycling roads on map with BicyclingLayer()
                var bicyclingStatus = new google.maps.BicyclingLayer();

                $('#bicycling-status').click(function(){
                    if(bicyclingStatus.getMap()){
                        bicyclingStatus.setMap(null);
                    }else{
                        bicyclingStatus.setMap(map);
                    }
                });
            }
            
            //after document ready work with geolocation and initialise function
            $(document).ready(function(){
                navigator.geolocation.getCurrentPosition(initialise);
            });
