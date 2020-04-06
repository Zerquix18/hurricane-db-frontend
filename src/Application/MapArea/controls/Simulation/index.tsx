import React, { useState, useEffect, useRef } from 'react';
import { Message, Divider, Grid, Icon, Button, Header } from 'semantic-ui-react';
import { Hurricane } from 'models';
import format from 'date-fns/format';
import { useMap } from 'hooks';
import { calculateHurricanePosition } from 'utils';

interface SimulationProps {
  hurricanes: Hurricane[];
}

const buttonStyle = {
  padding: '.58928571em 0.3em .58928571em 1.125em',
};

const Simulation: React.FC<SimulationProps> = ({ hurricanes }) => {
  const defaultDate = new Date(hurricanes[0].positions![0].moment);

  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(1);
  const map = useMap();

  const pausedRef = useRef(isPaused);
  pausedRef.current = isPaused;
  const currentDateRef = useRef(currentDate);
  currentDateRef.current = currentDate;
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const play = () => {
    setIsPaused(false);
  };
  
  const pause = () => {
    setIsPaused(true);
  };

  const stop = () => {
    setIsPaused(true);
    updateHurricanes(defaultDate);
    setCurrentDate(defaultDate);
    setSpeed(1);
  };

  const speedUp = () => {
    setSpeed(speed + .2);
  };

  const slowDown = () => {
    setSpeed(speed - .2);
  };

  const updateHurricanes = (untilDate: Date) => {
    hurricanes.forEach(hurricane => {
      if (! hurricane.positions) {
        return;
      }
      const markerId = `hurricane-${hurricane.id}`;
      const position = calculateHurricanePosition(hurricane.positions, untilDate);
      const { lat, lng } = position;
      const markers = [...map.markers].map(marker => {
        if (marker.id !== markerId) {
          return marker;
        };
        return { ...marker, lat, lng };
      });
      map.setMarkers(markers);
    });
  };

  const increaseTime = () => {
    if (pausedRef.current) {
      return;
    }

    const untilDate = new Date(currentDateRef.current.getTime() + (speedRef.current * 3600000));
    updateHurricanes(untilDate);
    setCurrentDate(untilDate);
  };

  useEffect(() => {
    const id = setInterval(() => {
      increaseTime();
    }, 1000);

    return () => {
      clearInterval(id);
    }
  }, []);

  return (
    <Message size="tiny" style={{ marginBottom: 10 }}>
      <Message.Content>

        <Header as="h5" style={{ textAlign: 'center' }}>
          { format(currentDate, 'MMMM d, yyyy, HH:kk') } ({ speed.toFixed(1) }x)
        </Header>

        <Divider />

        <Grid>
          <Grid.Column computer={4}>
            <Button size="tiny" basic compact style={buttonStyle} onClick={slowDown}>
              <Icon name="fast backward" title="Slow down" size="small" />
            </Button>
          </Grid.Column>

          <Grid.Column computer={4} style={{ textAlign: 'center' }}>
            { isPaused ? (
                <Button size="tiny" basic compact style={buttonStyle} onClick={play}>
                  <Icon name="play" size="small" title="Play / Resume" color="blue" />
                </Button>
            ) : (
              <Button size="tiny" basic compact style={buttonStyle} onClick={pause}>
                <Icon name="pause" size="small" title="Pause" color="blue" />
              </Button>
            )}
          </Grid.Column>

          <Grid.Column computer={4}>
            <Button size="tiny" basic compact style={buttonStyle} onClick={stop}>
              <Icon name="stop" color="red" size="small" />
            </Button>
          </Grid.Column>
          
          <Grid.Column computer={4}>
            <Button size="tiny" basic compact style={buttonStyle} onClick={speedUp}>
              <Icon name="fast forward" title="Speed up" size="small" />
            </Button>
          </Grid.Column>

        </Grid>
        
        <br />
      </Message.Content>

    </Message>
  );
};

export default Simulation;
