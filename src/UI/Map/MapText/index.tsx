import React, { useContext } from 'react';
import { MapText as MapTextModel } from '../../../models';
import { MapContext, MapState } from '../../../providers';
import { Marker } from 'react-google-maps';

declare var window: any;

// at least my hacks are clever

interface MapTextProps extends MapTextModel {
  mapContext: MapState;
}

class MapText extends React.Component<MapTextProps> {

  static defaultProps = {
    color: '#000000',
    borderColor: '#fffffff',
    borderSize: 2,
    size: 16,
    elevation: 1,
    isVisible: true,
    draggable: true,
  };

  onClick = (e: any) => {
    if (this.props.onClick) {
      this.props.onClick(e, this.props);
    }
  }

  onDragEnd = (e: any) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    if (this.props.onDragEnd) {
      this.props.onDragEnd({ lat, lng }, this.props);
    }
  }

  render = () => {
    const { loaded, zoom } = this.props.mapContext;

    if (! loaded) {
      return '';
    }
    const { text, color, lat, lng, size, draggable, isVisible } = this.props;

    const icon = {
      url: "https://i.imgur.com/Zv6rt2V.png",
      scaledSize: new window.google.maps.Size(25, 25), // ;)
      anchor: { x: 10, y: 10 },
    };

    const position = { lat, lng };
    // I don't know how this formular works buddy. It just works.
    const actualSize = Math.round(((zoom * size!) / 17) * .7);

    const visible = isVisible && zoom >= 13;

    const label = {
      text,
      color,
      fontSize: `${actualSize}px`,
    }
    
    return (
      <Marker
        position={position}
        icon={icon}
        label={label}
        visible={visible}
        draggable={draggable}
        onClick={this.onClick}
        onDragEnd={this.onDragEnd}
      />
    );
  }
}

export default (props: any) => {
  const mapContext = useContext(MapContext);
  return <MapText {...props} mapContext={mapContext} />;
};
