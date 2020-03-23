import React, { useState, useEffect } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import * as firebase from 'firebase';
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
firebase.initializeApp(firebaseConfig);

export const MapContainer: React.FC = () => {
  const [postalCodes, setPostalCodes] = useState<string[]>([]);
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
  //   firebase.firestore().collection("users").doc().set({
  //     age: 1,
  //     symptomps: false,
  //     postalcode: '00560'
  // })
  // .then(function() {
  //     console.log("Document successfully written!");
  // })
  // .catch(function(error: string) {
  //     console.error("Error writing document: ", error);
  // });
    firebase.firestore().collection('users').where("symptomps", "==", false)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
            const { postalcode } = doc.data();
            setPostalCodes((postalCodes) => [...postalCodes, postalcode])
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }, [])
  useEffect(() => {
    if(postalCodes.length > 0 && maps) {
      postalCodes.forEach(code => {
        let marker = new maps.Marker({
          position: { lat: 63.750, lng: 26.0 },
          map,
          title: 'Hello World!'
        });
      })
    }
  }, [postalCodes]);
  
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
  <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAuc82WLUAkTjsCJTGchRWTv1O8FUyvjS8' }}
            defaultCenter={{ lat: 63.750, lng: 26.0 }}
            defaultZoom={5}
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          >
            {/* {
            postalCodes
            .filter((item, pos) => postalCodes.indexOf(item) == pos)
            .map(code => (
              <div style={{
                
                  backgroundImage: 'radial-gradient(circle, red, red 66%, transparent 33%)',
                  height: '2vh',
                  width: '2vh'
                
              }}>
              <AnyReactComponent
              lat={63.750}
              lng={26.0}
              text="My Marker"/>
              </div>
            ))
        } */}
              
      
                  
                  
          
  </GoogleMapReact>
  </div>
      );
    }
 
      // <Map onReady={autoCenterMap} google={google} zoom={5} initialCenter={{ lat: 63.750, lng: 26.0 }} styles={styles}>
          
        //   { 
        //     postalCodes.forEach(code => {
        //       return (
        //       <Marker 
        //           onClick={() => onMarkerClick(code)}
        //           name={'Current location'}  
        //           />
        //           );
        //     })
        //   }
          
        //   <InfoWindow onClose={() => {}}>
        //       <div>
        //         <h1></h1>
        //       </div>
        //   </InfoWindow>
        // </Map>
        // );
// const LoadingContainer = () => (
//     <div>Fancy loading container!</div>
// )
// export default GoogleApiWrapper({
//   apiKey: ('AIzaSyAuc82WLUAkTjsCJTGchRWTv1O8FUyvjS8'),
//   LoadingContainer: LoadingContainer,
// })(MapContainer)

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