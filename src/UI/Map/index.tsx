import React from 'react';
import { compose } from 'recompose';
import { Marker, Overlay, Polyline, Polygon, Circle, Rectangle, MapPopup, MapText, LatLng } from 'models';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import MarkerComponent from './Marker';
import OverlayComponent from './Overlay';
import PolylineComponent from './Polyline';
import CircleComponent from './Circle';
import PolygonComponent from './Polygon';
import MapPopupComponent from './MapPopup';
import MapTextComponent from './MapText'

import RectangleComponent from './Rectangle';
import S from './style';
import ControlsWrapper from './ControlsWrapper';

type MapType = 'terrain' | 'satellite' | 'roadmap' | 'hybrid' | null;

interface MapProps {
  aggregateMarkers?: boolean;
  zoom?: number;
  defaultOptions?: any;
  mapTypeId?: string;
  clickableIcons?: boolean;
  height?: number;

  center?: LatLng;
  markers?: Marker[];
  overlays?: Overlay[];
  polylines?: Polyline[];
  polygones?: Polygon[];
  circles?: Circle[];
  rectangles?: Rectangle[];
  mapPopups?: MapPopup[];
  mapTexts?: MapText[];

  controls?: {
    position: string;
    component: React.ReactNode;
  }[];
  addons?: React.ReactNode;
  afterMap?: React.ReactNode;

  onMapLoaded?: () => void;
  onClick?: (event: any) => void;
  onRightClick?: (event: any) => void;
  onZoomChanged?: (zoom: number) => void;
  onCenterChanged?: (position: LatLng) => void;
};

export class MapState {
  center: LatLng;
  zoom: number;
  loaded: boolean;
  mapType: MapType;

  getMap: () => any;
  onClick: (event: any) => void;
  onRightClick: (event: any) => void;

  setZoom: (zoom: number) => void;
  setCenter: (center: LatLng) => void;
  setOnClick: (onClick: (event: any) => void) => void;
  setOnRightClick: (onRightClick: (event: any) => void) => void;
  setMapType: (mapType: MapType) => void;
};

export const MapContext = React.createContext<MapState|null>(null);

class MapComponent extends React.PureComponent<MapProps, MapState> {
  static defaultProps = {
    aggregateMarkers: true,
    zoom: 13,
    center: { lat: 18.4800103, lng: -70.017052 }, // to be the exercise's center
    controls: [],
  };
  state = {
    center: this.props.center!,
    zoom: this.props.zoom!,
    loaded: false,
    mapType: this.props.mapTypeId as MapType || 'terrain',

    onClick: this.props.onClick ? this.props.onClick : () => {},
    onRightClick: this.props.onRightClick ? this.props.onRightClick : () => {},
    
    setOnClick: (onClick: (event: any) => void) => {
      this.setState({ onClick })
    },
    setZoom: (zoom: number) => {
      this.setState({ zoom })
    },
    setCenter: (center: LatLng) => {
      this.setState({ center })
    },
    setOnRightClick: (onRightClick: (event: any) => void) => {
      this.setState({ onRightClick });
    },
    setMapType: (mapType: MapType) => {
      this.setState({ mapType });
    },

    getMap: () => this.map,
  };

  map: GoogleMap | null;

  onCenterChanged = () => {
    if(!this.map) {
      return;
    }
    const obj = this.map.getCenter();
    const center = {
      lat: obj.lat(),
      lng: obj.lng()
    };

    this.setState({ center });
    this.props.onCenterChanged && this.props.onCenterChanged(center);
  }
  onZoomChanged = () => {
    if(!this.map) {
      return;
    }
    const zoom = this.map.getZoom();
    this.setState({ zoom });
    this.props.onZoomChanged && this.props.onZoomChanged(zoom);
  }

  onTilesLoaded = () => {
    const map = this.map;

    if (! this.state.loaded) {
      const getMap = () => {
        return map;
      }

      this.setState({ loaded: true, getMap });
      this.props.onMapLoaded && this.props.onMapLoaded();
    }
  }

  onMapTypeIdChanged = () => {
    const mapType = this.map!.getMapTypeId() as MapType;
    this.setState({ mapType });
  }
  
  componentDidUpdate = (prevProps: MapProps) => {
    if (this.props.zoom && this.props.zoom !== prevProps.zoom) {
      this.setState({ zoom: this.props.zoom });
    }
    if (this.props.center && this.props.center !== prevProps.center) {
      this.setState({ center: this.props.center });
    }
    if (this.props.mapTypeId && this.props.mapTypeId !== prevProps.mapTypeId) {
      this.setState({ mapType: this.props.mapTypeId as MapType });
    }
  }

  render = () => {
    const {
      markers,
      overlays,
      polylines,
      circles,
      rectangles,
      polygones,
      defaultOptions,
      mapTypeId,
      clickableIcons,
      mapPopups,
      mapTexts,
    } = this.props;

    console.log(markers);

    return (
      <MapContext.Provider value={this.state}>
        <GoogleMap
          ref={map => (this.map = map)}
          center={this.props.center}
          zoom={this.state.zoom}
          clickableIcons={clickableIcons}
          mapTypeId={mapTypeId}
          defaultOptions={{
            fullscreenControl: true,
            streetViewControl: false,
            controls: true,
            scaleControl: true,
            ...defaultOptions
          }}
          onMapTypeIdChanged={this.onMapTypeIdChanged}
          onZoomChanged={this.onZoomChanged}
          onTilesLoaded={this.onTilesLoaded}
          onCenterChanged={this.onCenterChanged}          
          onClick={this.state.onClick}
          onRightClick={this.state.onRightClick}
        >
          
          { this.props.aggregateMarkers ? (
            <>
                <MarkerClusterer
                  enableRetinaIcons
                  averageCenter
                  gridSize={35}
                  minimumClusterSize={3}
                  ignoreHidden={true}
                  maxZoom={19}>
                  {(markers || []).filter((marker) => marker.aggregated).map((marker, index) => (
                    <MarkerComponent {...marker} key={index} zoom={this.state.zoom!} />
                  ))}
                </MarkerClusterer>

              {(markers || []).filter((marker) => ! marker.aggregated).map((marker, index) => (
                  <MarkerComponent {...marker} key={index} zoom={this.state.zoom!} />
                ))
              }
            </>
          ) : (markers || []).map((marker, index) => (
            <MarkerComponent {...marker} key={index} zoom={this.state.zoom!} />
            )
          )}

          {overlays && overlays.map((overlay, index) => (
            <OverlayComponent {...overlay} key={index} />
          ))}

          {polylines && polylines.map((polyline, index) => (
            <PolylineComponent {...polyline} key={index} />
          ))}

          {circles && circles.map((circle, index) => (
            <CircleComponent {...circle} key={index} />
          ))}

          {rectangles && rectangles.map((rectangle, index) => (
            <RectangleComponent {...rectangle} key={index} />
          ))}

          {polygones && polygones.map((polygon, index) => (
            <PolygonComponent {...polygon} key={index} />
          ))}

          {mapPopups && mapPopups.map((mapPopup, index) => (
            <MapPopupComponent {...mapPopup} key={index} />
          ))}

          {mapTexts && mapTexts.map((mapText, index) => (
            <MapTextComponent {...mapText} key={index} />
          ))}

          { this.state.loaded && this.props.controls!.map((addon, index) => (
            <ControlsWrapper map={this.map} position={addon.position} key={index}>
              {addon.component}
            </ControlsWrapper>
          ))}
          { this.props.addons }
        </GoogleMap>

        { this.state.loaded && this.props.afterMap }
      </MapContext.Provider>
    );
  }
}

const WrappedMap = compose<MapProps, any>(
  withScriptjs,
  withGoogleMap
)(MapComponent);

export default (props: MapProps) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
  return (
    <WrappedMap
      containerElement={<S.Container height={props.height} />}
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
      mapElement={<S.Map height={props.height} />}
      loadingElement={<S.Map height={props.height} />}
      {...props}
    />
  );
}
