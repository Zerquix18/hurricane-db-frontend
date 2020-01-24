import React from 'react';
import { Circle as CircleModel } from 'models';
import { Circle } from 'react-google-maps';

class CircleComponent extends React.Component<CircleModel> {
  static defaultProps = {
    opacity: 0.35,
    borderColor: '#000000',
    borderOpacity: 0.8,
    borderWeight: 2,
    elevation: 1,
    editable: false,
    draggable: false,
    isVisible: true,
  };

  ref: Circle | null;

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

    const radius = this.ref.getRadius();
    this.props.onEdited(radius, this.props);
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
        radius,
        lat,
        lng,
        color,
        opacity,
        borderColor,
        borderOpacity,
        borderWeight,
        elevation,
        editable,
        draggable,
        isVisible,
    } = this.props;

    const position = { lat, lng };
    const options = {
      strokeColor: borderColor,
      fillColor: color,
      strokeOpacity: borderOpacity,
      strokeWeight: borderWeight,
      fillOpacity: opacity,
      zIndex: elevation,
    };

    return (
      <Circle
        ref={(ref) => this.ref = ref}
        center={position}
        radius={radius}
        options={options}
        editable={editable}
        draggable={draggable}
        visible={isVisible}
        onClick={this.onClick}
        onDragEnd={this.onDragEnd}
        onRadiusChanged={this.onEdit}
      />
    );
  }
}

export default CircleComponent;
