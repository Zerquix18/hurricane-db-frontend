import React from 'react';
import { createPortal } from 'react-dom';

declare var window: any;

// the hackiest of the hacks!

interface Props {
    // more can be added here based on:
    // https://developers.google.com/maps/documentation/javascript/controls#ControlPositioning
    position: string,
    children: React.ReactNode,
    map: any;
}

export default class MapControl extends React.Component<Props> {
  wrapperDiv = document.createElement('div');
  index: number;

  getPosition = () => {
      return window.google.maps.ControlPosition[this.props.position];
  }

  componentDidMount() {
    const actualMapRef = this.props.map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
    if (actualMapRef.controls === true) {
        actualMapRef.controls = [];
    }
    if (! actualMapRef.controls[this.getPosition()]) {
        actualMapRef.controls[this.getPosition()] = [];
    }
    this.wrapperDiv = document.createElement('div')
    this.index = actualMapRef.controls[this.getPosition()].length;
    actualMapRef.controls[this.getPosition()].push(this.wrapperDiv);
  }
  componentWillUnmount() {
    if (this.index && this.props.map && this.props.map.controls &&
      this.props.map.controls[this.getPosition()]) {
      this.props.map.controls[this.getPosition()].removeAt(this.index)
    }
  }
  render() {
    return createPortal(this.props.children, this.wrapperDiv)
  }
}
