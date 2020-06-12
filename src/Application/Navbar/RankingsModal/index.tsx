import React, { Fragment, useState } from 'react';
import { Modal, Button, Accordion, Icon } from 'semantic-ui-react';

import LowestPressure from './LowestPressure';
import HighestWindSpeed from './HighestWindSpeed';
import Fatalities from './Fatalities';
import Damage from './Damage';
import Month from './Month';
import Seasons from './Seasons';
import FastestMovement from './FastestMovement';
import LargestPath from './LargestPath';
import FormationByCategory from './FormationByCategory';

interface RankingItem {
  title: string;
  Component: React.ReactNode;
}

interface RankingModalProps {
  onClose: () => void;
}

const RankingModal: React.FC<RankingModalProps> = ({ onClose }) => {
  const [activeIndex, setActiveIndex] = useState(-1);
  // don't automatically render every component as that makes an HTTP call
  const [rendered, setRendered] = useState<number[]>([]);

  const rankings: RankingItem[] = [
    {
      title: 'Top by lowest pressure',
      Component: <LowestPressure onClose={onClose} />,
    },
    {
      title: 'Top by highest wind speed',
      Component: <HighestWindSpeed onClose={onClose} />,
    },
    {
      title: 'Top by fatalities',
      Component: <Fatalities onClose={onClose} />,
    },
    {
      title: 'Top by economical damage',
      Component: <Damage onClose={onClose} />,
    },
    {
      title: 'Top by month',
      Component: <Month onClose={onClose} />,
    },
    {
      title: 'Top by season total',
      Component: <Seasons onClose={onClose} />,
    },
    {
      title: 'Fastest movement by land',
      Component: <FastestMovement onClose={onClose} />
    },
    {
      title: 'Longest distance traveled',
      Component: <LargestPath onClose={onClose} />
    },
    {
      title: 'Earliest formation by category',
      Component: <FormationByCategory type="earliest" onClose={onClose} />
    },
    {
      title: 'Latest formation by category',
      Component: <FormationByCategory type="latest" onClose={onClose} />
    }
  ];

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
