import React, { useState, useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { initializeApp, firestore } from 'firebase';
import GoogleMapReact from 'google-map-react';
import { AnyReactComponent } from './App';
// ...
 
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MSG_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
initializeApp(firebaseConfig);
interface coords {
    id: string;
    lat: number;
    lng: number;
    age: number;
    symptomps: boolean;
}
export const MapContainer: React.FC = () => {
  const [postalCodes, setPostalCodes] = useState<coords[]>([]);
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const handleApiLoaded = (map: any, maps: any) => {
    setMap(map);
    setMaps(maps);
    map.data.setStyle({
      fillColor: 'white',
      strokeColor: '#448CCB',
      fillOpacity: 1
    });
    map.data.loadGeoJson('https://raw.githubusercontent.com/nikomon/gmaps-project/master/coords.json');
  }
  useEffect(() => {
    firestore().collection('users').where("symptomps", "==", false)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // console.log(doc.id, " => ", doc.data());
            const { lat, lng, age, symptomps } = doc.data();
            setPostalCodes((coordsList) => [...coordsList, { age, symptomps, lat, lng, id: doc.id }])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }, [])
  useEffect(() => {
    if(postalCodes.length > 0 && map && maps) {
      postalCodes.forEach(({ lat, lng, age, symptomps }) => {
        var infowindow = new google.maps.InfoWindow({
            content: `
            <p>Age: ${age}</p>
            <p>Symptomps: ${symptomps}</p>
            `
          });
        let marker = new maps.Marker({
          position: { lat, lng },
          map,
          title: 'Hello World!'
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
          });
      })
    }
  }, [postalCodes]);
  
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
  <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY ? process.env.REACT_APP_GOOGLE_API_KEY : '' }}
            defaultCenter={{ lat: 63.750, lng: 26.0 }}
            defaultZoom={5}
            options={{
                scrollwheel: false,
                maxZoom: 5,
                minZoom: 5,
                zoomControl: false,
                fullscreenControl: false,
                draggable: false,
            }}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
              
      
                  
                  
          
  </GoogleMapReact>
  </div>
      );
    }

const styles: google.maps.MapTypeStyle[] = [
  {
      "featureType": "administrative",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative.country",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#e3e3e3"
          }
      ]
  },
  {
      "featureType": "landscape.natural",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "color": "#cccccc"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.station.airport",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.station.airport",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "color": "#FFFFFF"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  }
];