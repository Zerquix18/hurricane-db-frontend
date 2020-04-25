import React, { Fragment, useState } from 'react';
import { Modal, Button, Accordion, Icon } from 'semantic-ui-react';

import LowestPressure from './LowestPressure';

interface RankingItem {
  title: string;
  Component: React.ReactNode;
}

interface RankingModalProps {
  onClose: () => void;
}

const rankings: RankingItem[] = [
  {
    title: 'Top by lowest pressure',
    Component: <LowestPressure />,
  }
];

const RankingModal: React.FC<RankingModalProps> = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  // don't automatically render every component as that makes an HTTP call
  const [rendered, setRendered] = useState<number[]>([]);

  return (
    <Modal open closeIcon size="fullscreen" onClose={onClose}>
      <Modal.Header>
        Rankings
      </Modal.Header>
      <Modal.Content style={{ minHeight: '75vh' }}>
        <p> Select a ranking: </p>
        <Accordion>
          { rankings.map(({ title, Component }, index) => {
            const active = activeIndex === index;
            const onClick = () => {
              setActiveIndex(active ? -1 : index);
              if (! rendered.includes(index)) {
                const newRendered = [...rendered];
                newRendered.push(index);
                setRendered(newRendered);
              }
            };
            return (
              <Fragment key={index}>
                <Accordion.Title active={active} index={index} onClick={onClick}>
                  <Icon name='dropdown' />
                  { title }
                </Accordion.Title>
                <Accordion.Content active={active}>
                  { rendered.includes(index) && Component }
                </Accordion.Content>
              </Fragment>
            );
          })}
        </Accordion>
      </Modal.Content>
      <Modal.Actions>
        <Button color="blue" content="Close" onClick={onClose} />
      </Modal.Actions>
    </Modal>
  )
}

export default RankingModal;
