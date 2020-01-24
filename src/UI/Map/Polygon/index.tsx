import React from 'react';
import { Polygon as PolygonModel, LatLng } from 'models';
import { Polygon } from 'react-google-maps';

class PolygonComponent extends React.Component<PolygonModel> {

  static defaultProps = {
    opacity: 0.35,
    borderOpacity: 0.8,
    borderWeight: 2,
    elevation: 1,
    editable: false,
    draggable: false,
    isVisible: true,
  };

  ref: Polygon | null;

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

    // maybe prevent extra calls here
    const path = this.ref.getPath();
    const coordinates: LatLng[] = [];

    for (let i = 0; i < path.length; i++) { // path is not iterable
      coordinates.push({
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng(),
      });
    }

    this.props.onEdited(coordinates, this.props);
  }

  onDragEnd = () => {
    if (! this.ref) {
      return;
    }
    if (! this.props.onDragEnd) {
      return;
    }

    const path = this.ref.getPath();
    const coordinates: LatLng[] = [];

    for (let i = 0; i < path.length; i++) { // path is not iterable
      coordinates.push({
        lat: path.getAt(i).lat(),
        lng: path.getAt(i).lng(),
      });
    }

    this.props.onDragEnd(coordinates, this.props);
  }

  render = () => {
    const {
      color,
      borderColor,
      path,
      opacity,
      borderOpacity,
      borderWeight,
      elevation,
      draggable,
      editable,
      isVisible,
    } = this.props;

    const options = {
      strokeColor: borderColor,
      fillColor: color,
      strokeOpacity: borderOpacity,
      strokeWeight: borderWeight,
      fillOpacity: opacity,
      zIndex: elevation,
    };

    return (
      <Polygon
        ref={(ref) => this.ref = ref}
        path={path}
        options={options}
        visible={isVisible}
        editable={editable}
        draggable={draggable}
        onClick={this.onClick}
        onDragEnd={this.onDragEnd}
        onMouseUp={this.onEdit}
      />
    );
  }
}

export default PolygonComponent;
