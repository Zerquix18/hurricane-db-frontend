import React, { useState } from 'react';
import { LatLng, BoundingBox, Rectangle } from 'models';
import { Modal, Button } from 'semantic-ui-react';
import { Map } from 'UI';
import DrawingManager from 'react-google-maps/lib/components/drawing/DrawingManager';
import { useMap } from 'hooks';

declare var window: any;

interface ZonePickerProps {
  defaultCenter: LatLng;
  defaultZoom?: number;

  selectedZone: BoundingBox | null;
  onSelect: (selectedZone: BoundingBox | null) => void;
}

const ZonePicker: React.FC<ZonePickerProps> = ({ defaultCenter, defaultZoom, selectedZone, onSelect }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const map = useMap();

  const toggleModal = () => {
    setModalOpen(state => ! state);
  };

  const onClear = () => {
    onSelect(null);
  };
  const onSave = () => {
    toggleModal();
  };

  const onRectangleComplete = (e: any) => {
    const originalBounds = e.getBounds();
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

    onSelect(bounds);
    e.setMap(null); // ;) - prevent Google from adding the rectangle, as we'll add it ourselves now.
  };

  const addons = (
    <>
      { map.loaded && (
        <DrawingManager
          drawingMode={selectedZone ? null : 'rectangle'}
          options={{
            drawingControl: false,
            drawingControlOptions: {
              position: window.google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [
                window.google.maps.drawing.OverlayType.CIRCLE,
                window.google.maps.drawing.OverlayType.POLYGON,
                window.google.maps.drawing.OverlayType.POLYLINE,
                window.google.maps.drawing.OverlayType.RECTANGLE,
              ],
            },
            rectangleOptions: {
              fillColor: '#FF0000',
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillOpacity: 0.35,
              zIndex: 1,
              clickable: false,
              editable: false,
            },
          }}
          onRectangleComplete={onRectangleComplete}
        />
      )}
    </>
  );

  const rectangles: Rectangle[] = [];

  if (selectedZone) {
    const color = '#FF0000';
    const opacity = 0.35;
    const borderColor = '#FF0000';
    const borderOpacity = 0.8;
    const borderWeight = 2;
    const editable = true;

    const onEdited = (bounds: BoundingBox) => {
      onSelect(bounds);
    };

    const rectangle = {
      id: '',
      bounds: selectedZone,
      color,
      opacity,
      borderColor,
      borderOpacity,
      borderWeight,
      editable,
      onEdited,
    };
    rectangles.push(rectangle);
  }

  return (
    <>
      <Button color="blue" content={selectedZone ? 'Change Zone' : 'Select Zone'} onClick={toggleModal} />
      <Modal open={modalOpen} onClose={toggleModal}>
        <Modal.Header>Select Zone</Modal.Header>
        <Modal.Content>
          <Map
            markers={[]}
            overlays={[]}
            polylines={[]}
            rectangles={rectangles}
            height={400}
            center={defaultCenter}
            zoom={defaultZoom}
            addons={addons}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" content="Clear" onClick={onClear} />
          <Button color="blue" content="Save" onClick={onSave} />
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default ZonePicker;
