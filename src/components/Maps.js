import React from 'react';
import {Map, GoogleApiWrapper, Circle } from 'google-maps-react';
import {coords} from '../data/coords'

export class Maps extends React.Component {
  constructor(props) {
    super(props);

    // Use a greedy algorithm to reduce the number of circles according to the desired formula.
    const radius = 1;

    let leftoverCoords = coords.slice();
    var circles = [];
    while(leftoverCoords.length > 0) {
      let currentTarget = leftoverCoords[0];
      leftoverCoords = leftoverCoords.slice(1, leftoverCoords.length);
    
      let distances = leftoverCoords.map((x) => (
        Math.sqrt(
        Math.pow((currentTarget.lon - x.lon) * Math.cos(x.lat / 180 * Math.PI), 2) + 
        Math.pow(currentTarget.lat - x.lat, 2)
      )));

      let outside = [];
      distances.forEach((x, i) => {
        if(x >= radius) {
          outside.push(leftoverCoords[i])
        }
      });

      let ncases = leftoverCoords.length - outside.length + 1;
      leftoverCoords = outside;

      circles.push({lon: currentTarget.lon, lat: currentTarget.lat, n: ncases});
    }

    this.state = {circles: circles};
  }

  render() {
    let markers = this.state.circles.map( (x, i) => (
      <Circle 
        key={i} 
        radius={100000 * Math.sqrt(x.n)} 
        center={{lat: x.lat, lng: x.lon}}
        strokeColor="#2798d9"
        strokeWeight={1}
        fillColor="#2798d9"
         />
      ));

    const mapStyles= {
        width: "100%",
        height: "100%",
    };
    
    return (
      <Map
          google={this.props.google}
          zoom={2.4}
          style={mapStyles}
          initialCenter={{lat: 20,
                          lng: 10}}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
      >
        {markers}
      </Map>
    )
  }

  _mapLoaded(mapProps, map) {
    const mapStyle = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
    map.setOptions({
       styles: mapStyle
    })
  }
};

export default GoogleApiWrapper(
  (props) => ({
    apiKey: "AIzaSyDi6WVGVy-Gj5-w-eKrVWQfcjHyTTDgt1s"
  }
))(Maps);
