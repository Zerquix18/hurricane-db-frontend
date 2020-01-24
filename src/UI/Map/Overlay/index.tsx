import React from 'react';
import { Overlay as OverlayModel } from '../../../models';
import { OverlayView} from 'react-google-maps';

declare var window: any;

class OverlayComponent extends React.PureComponent<OverlayModel> {
  static defaultProps = {
    angle: 0,
    elevation: 0,
    isVisible: true,
  };

  overlayRef = React.createRef<HTMLDivElement>();
  interval: number;

  componentDidMount = () => {
    this.interval = window.setInterval(() => {
      if (this.overlayRef.current) {
        const elevation = this.props.elevation! !== 0 ? this.props.elevation! * 1000 : 1000;
        this.overlayRef.current.parentElement!.style.zIndex = String(elevation);
        window.clearInterval(this.interval);
      }
    }, 3000);
  }

  componentDidUpdate = (prevProps: OverlayModel) => {
    if (prevProps.elevation !== this.props.elevation) {
      this.interval = window.setInterval(() => {
        if (this.overlayRef.current) {
          const elevation = this.props.elevation! !== 0 ? this.props.elevation! * 1000 : 1000;
          this.overlayRef.current.parentElement!.style.zIndex = String(elevation);
          window.clearInterval(this.interval);
        }
      }, 3000);
    }
  }

  render = () => {
    const { url, bounds, angle } = this.props;
    return (
     <OverlayView
      bounds={bounds}
      mapPaneName={OverlayView.MARKER_LAYER}
     >
       <div ref={this.overlayRef} style={{ width: '100%', height: '100%', backgroundColor: '#FFF' }}>
        <img width="100%" height="100%" src={url} alt="" style={{transform: `rotate(${angle!}deg)`}}/>
      </div>
      </OverlayView>
    );
  }
}

export default OverlayComponent;
