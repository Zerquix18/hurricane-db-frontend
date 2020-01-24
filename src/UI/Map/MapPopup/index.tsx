import React from 'react';
import { MapPopup as MapPopupModel } from '../../../models';
import { InfoWindow } from 'react-google-maps';

class MapPopup extends React.Component<MapPopupModel> {
  static defaultProps = {
    isVisible: true,
  };

  onClose = () => {
    this.props.onClose && this.props.onClose();
  }

  render = () => {
    const { lat, lng, content, isVisible } = this.props;

    if (! isVisible) {
      return '';
    }

    const position = { lat, lng };

    return (
      <InfoWindow position={position} onCloseClick={this.onClose}>
        <div>
          { content }
        </div>
      </InfoWindow>
    );
  }
}

export default MapPopup;
