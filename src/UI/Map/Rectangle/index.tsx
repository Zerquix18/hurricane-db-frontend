import React from 'react';
import { Rectangle as RectangleModel } from 'models';
import { Rectangle } from 'react-google-maps';

declare var window: any;

class RectangleComponent extends React.Component<RectangleModel> {
  
  static defaultProps = {
    borderColor: '#000000',
    opacity: 0.35,
    borderOpacity: 0.8,
    borderWeight: 2,
    elevation: 1,
    draggable: false,
    editable: false,
    isVisible: true,
  };

  ref: Rectangle | null;

  onClick = (e: any) => {
    this.props.onClick && this.props.onClick(e, this.props);
  }

  onEdit = () => {
    if (! this.ref) {
      return;
    }
    if (! this.props.onEdited) {
      return;
    }

    const originalBounds = this.ref.getBounds();
    const originalNE = originalBounds.getNorthEast();
    const originalSW = originalBounds.getSouthWest();

    const bounds = {
      ne: {
        lat: originalNE.lat(),
        lng: originalNE.lng(),
      },
      sw: {
        lat: originalSW.lat(),
        lng: originalSW.lng(),
      }
    };

    this.props.onEdited(bounds, this.props);
  }

  onDragEnd = (e: any) => {
    if (! this.props.onDragEnd) {
      return;
    }

    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    const position = { lat, lng };
    this.props.onDragEnd(position, this.props);
  }

  render = () => {
    const {
      bounds,
      color,
      borderColor,
      opacity,
      borderOpacity,
      borderWeight,
      elevation,
      draggable,
      editable,
      isVisible,
    } = this.props;

    // for whatever reason
    const sw = new window.google.maps.LatLng(bounds.sw.lat, bounds.sw.lng);
    const ne = new window.google.maps.LatLng(bounds.ne.lat, bounds.ne.lng);
    const actualBounds = new window.google.maps.LatLngBounds(sw, ne);

    const options = {
      strokeColor: borderColor,
      fillColor: color,
      strokeOpacity: borderOpacity,
      strokeWeight: borderWeight,
      fillOpacity: opacity,
      zIndex: elevation,
    };

    return (
      <Rectangle
        ref={(ref) => this.ref = ref}
        bounds={actualBounds}
        options={options}
        visible={isVisible}
        draggable={draggable}
        editable={editable}
        onClick={this.onClick}
        onDragEnd={this.onDragEnd}
        onBoundsChanged={this.onEdit}
      />
    )
  }
}

export default RectangleComponent;
