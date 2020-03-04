import React from 'react';
import { AppModeHurricane } from 'models';
import { Loader, Dimmer, Message, Header, Image, Segment } from 'semantic-ui-react';

interface HurricaneSidebarProps {
  hurricaneMode: AppModeHurricane;
}

const HurricaneSidebar: React.FC<HurricaneSidebarProps> = ({ hurricaneMode }) => {
  if (hurricaneMode.loading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  }

  if (hurricaneMode.error || ! hurricaneMode.hurricane) {
    return (
      <Message color="red">
        <Message.Header>Something went wrong.</Message.Header>
        <Message.Content>{ hurricaneMode.error }</Message.Content>
      </Message>
    );
  }

  const { hurricane } = hurricaneMode;

  console.log(hurricane);

  // todo! change name
  // ive become a lazyass and now i just use inline styles
  return (
    <div>
      <div>
        <Header as="h3" style={{ textAlign: 'center'}}>Hurricane { hurricane.name }</Header>
        { hurricane.image_url && (
          <Image
            src={hurricane.image_url}
            width={150}
            height="auto"
            alt={`Picture of Hurricane ${hurricane.name}`}
            style={{ margin: '0 auto', cursor: 'pointer' }}
            onClick={() => {
              window.open(hurricane.image_url!);
            }}
          />
        )}
      </div>
      <Segment compact>
        { hurricane.description ? hurricane.description.substring(0, 140) : '' }...
      </Segment>
    </div>
  )
}

export default HurricaneSidebar;
