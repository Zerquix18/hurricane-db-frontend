import React from 'react';
import { Polyline as PolylineModel, LatLng } from '../../../models';
import { Polyline } from 'react-google-maps';
import set from 'lodash/set';

declare var window: any;

class PolylineComponent extends React.Component<PolylineModel> {
  static defaultProps = {
    color: '#03b6fc',
    thickness: 3,
    opacity: 1,
    elevation: 1,
    draggable: false,
    editable: false,
    isVisible: true,
  };

  ref: Polyline | null;

  onMouseUp = (event: any) => {
    if (event.vertex === undefined && event.edge === undefined) {
      return;
    }
    if (! this.ref || ! this.props.onEdited) {
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

    this.props.onEdited(coordinates, this.props);
  }

  updateLinesZIndex = () => {
    if (this.props.path.length <= 1) {
      return;
    }
    // lines are in another pane
    // THIS IS AN EXTREME HACK - TO DO - FIND A BETTER WAY!
    window.setTimeout(() => {
    // @ts-ignore
      set(document.querySelector('canvas'), 'parentElement.parentElement.parentElement.parentElement.style.zIndex', "300000");
    }, 500);
  }

  render = () => {
    const {
      path,
      color,
      thickness,
      opacity,
      draggable,
      editable,
      onClick,
      elevation
    } = this.props;

    const actualElevation = elevation && elevation !== 0 ? elevation * 1000 : 20000;

    const options = {
      strokeColor: color,
      strokeOpacity: opacity,
      strokeWeight: thickness,
      zIndex: actualElevation
    };

    return (
      <Polyline
        ref={(ref) => this.ref = ref}
        path={path}
        options={options}
        editable={editable}
        draggable={draggable}
        onClick={onClick}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

export default PolylineComponent;
