import React from 'react';
import { Modal, Button, Segment, Header, Form } from 'semantic-ui-react';
import { useSettings } from 'hooks';
import { SpeedUnit, DistanceUnit, PressureUnit } from 'models';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const settings = useSettings();

  const speedUnitOptions = [
    { key: 'kt', value: 'kt', text: 'kt' },
    { key: 'kmh', value: 'kmh', text: 'kmh' },
    { key: 'mph', value: 'mph', text: 'mph' },
  ];

  const pressureUnitOptions = [
    { key: 'mb', value: 'mb', text: 'mb' },
    { key: 'kpa', value: 'kpa', text: 'kpa' },
    { key: 'atm', value: 'atm', text: 'atm' },
  ];

  const distanceUnitOptions = [
    { key: 'km', value: 'km', text: 'km' },
    { key: 'mi', value: 'mi', text: 'mi' },
    { key: 'm', value: 'm', text: 'm' },
  ];
  

  return (
    <Modal size="small" onClose={onClose} open closeIcon>
      <Modal.Header>Settings</Modal.Header>
      <Modal.Content>
        <Segment>
          <Header as="h4">Units</Header>
          <Form>
            <Form.Field>
              <Form.Select
                label="Speed"
                value={settings.units.speed}
                options={speedUnitOptions}
                onChange={(e, data) => {
                  const speed = data.value as SpeedUnit;
                  settings.setUnit({ speed });
                  void e;
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                label="Pressure"
                value={settings.units.pressure}
                options={pressureUnitOptions}
                onChange={(e, data) => {
                  const pressure = data.value as PressureUnit;
                  settings.setUnit({ pressure });
                  void e;
                }}
              />
            </Form.Field>
            <Form.Field>
              <Form.Select
                label="Distance"
                value={settings.units.distance}
                options={distanceUnitOptions}
                onChange={(e, data) => {
                  const distance = data.value as DistanceUnit;
                  settings.setUnit({ distance });
                  void e;
                }}
              />
            </Form.Field>
          </Form>
        </Segment>
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" content="Close" onClick={onClose} />
      </Modal.Actions>     
    </Modal>
  );
}

export default SettingsModal;
