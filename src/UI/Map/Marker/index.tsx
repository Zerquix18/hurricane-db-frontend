import React, { useContext } from 'react';
import { Marker as MarkerModel, LatLng } from '../../../models';
import { Marker, InfoWindow } from 'react-google-maps';
import { MapContext } from '../../../providers';

declare var window: any;

export class MarkerState {
  infoWindowOpen: boolean;
  toggleInfoWindow: () => void;
  positions: LatLng[];
  canUndo: boolean;
  imgScale: number | null;
}

interface MarkerProps extends MarkerModel {
  zoom: number,
  map: any,
}

export const MarkerContext = React.createContext<MarkerState|null>(null);

class MarkerComponent extends React.PureComponent<MarkerProps, MarkerState> {
  
  static defaultProps = {
    elevation: 1,
    angle: 0,
    draggable: false,
    isVisible: true,
    restrictZoom: true,
    scale: 1,
  };

  state = {
    infoWindowOpen: false,
    toggleInfoWindow: () => {
      this.setState({ infoWindowOpen: ! this.state.infoWindowOpen })
    },
    positions: [],
    canUndo: false,
    imgScale: null
  }

  componentDidMount = () => {
    const img = new Image();
    img.onload = () => {
      const scale = img.width / img.height;
      this.setState({ imgScale: scale});
    };
    
    img.src = this.props.url;

    this.rotate();
  }

  componentDidUpdate = () => {
    this.rotate();
  }

  rotate = () => {
    const { angle, url, id } = this.props;
    if (angle === 0) {
      return;
    }


    const marker = document.querySelector<HTMLElement>(`[src="${url}#marker=${id}"]`)

    if (marker) {
      // marker sometimes hasn't loaded on the map
      marker.style.transform = `rotate(${angle}deg)`
      marker.parentElement!.style.overflow = 'visible';
    }
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props);
    }
    if (this.props.defaultDescription) {
      this.setState({ infoWindowOpen: true });
      this.props.onDescriptionOpen && this.props.onDescriptionOpen(this.props);
    }
  }

  onDrag = (e: any) => {
    if (! this.props.onDrag) {
      return;
    }
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    this.props.onDrag({ lat, lng });
  }

  onDragEnd = (event: any) => {
    const currentLat = this.props.lat;
    const currentLng = this.props.lng;

    if (this.props.onDragEnd) {
      this.props.onDragEnd(this.props, event);
    }

    if (this.props.canUndoDrag) {
      const positions: LatLng[] = [...this.state.positions];
      positions.push({
        lat: currentLat,
        lng: currentLng,
      });
      this.setState({ positions, canUndo: true });

      window.setTimeout(() => {
        this.setState({ canUndo: false });
      }, 5000);

    }
  }

  undo = () => {
    const positions: LatLng[] = [...this.state.positions];
    const position = positions.pop();
  
    if (position && this.props.onUndoDrag) {
       this.props.onUndoDrag(this.props, position);
    }

    this.setState({ positions });
  }

  render = () => {
    const {
      id,
      lat,
      lng,
      url,
      elevation,
      label,
      defaultDescription,
      description,
      map,
      draggable,
      zoom,
      isVisible,
      forceShowDescription,
      scale,
    } = this.props;

    if (! map.loaded) {
      return '';
    }

    const position = { lat, lng };
    const size = Math.round(((zoom * 25) / 17) * 1.1); // i created this formula

    const icon = {
      url: `${url}#marker=${id}`,
      scaledSize: new window.google.maps.Size(size * (this.state.imgScale || 1) * scale!, size * scale!),
    };

    const undoIcon = {
      url: 'http://www.iconarchive.com/download/i90012/icons8/windows-8/Arrows-Undo.ico',
      scaledSize: new window.google.maps.Size(15, 15),
      anchor: { x: 0, y: -5 }
    }

    const visible = isVisible;

    const showInfoWindow = this.state.infoWindowOpen || forceShowDescription;

    return (
      <MarkerContext.Provider value={this.state}>
        <Marker
          position={position}
          icon={icon}
          zIndex={elevation! * 1000 + 1}
          label={label}
          visible={visible}
          onClick={this.onClick}
          draggable={draggable}
          onDrag={this.onDrag}
          onDragEnd={this.onDragEnd}
        >
          { defaultDescription && ! description && showInfoWindow && (
            <InfoWindow onCloseClick={() => {
              this.setState({ infoWindowOpen: false });
              this.props.onDescriptionClosed && this.props.onDescriptionClosed(this.props);
            }}>
              <div>
                {defaultDescription}
              </div>
            </InfoWindow>
          )}
          { description && (
            <InfoWindow>
              <div>
                {description}
              </div>
            </InfoWindow>
          )}
        </Marker>
        { this.state.canUndo && (
          <Marker
            position={position}
            icon={undoIcon}
            zIndex={elevation! * 1000 + 2}
            visible={visible}
            onClick={this.undo}
          />
        )}
      </MarkerContext.Provider>
    )
  }
}

//export default MarkerComponent;
export default (props: any) => {
  const map = useContext(MapContext);
  return <MarkerComponent {...props} map={map} />;
};
