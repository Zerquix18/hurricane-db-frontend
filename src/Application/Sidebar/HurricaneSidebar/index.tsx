import React from 'react';
import { AppModeHurricane } from 'models';
import { Loader, Dimmer, Message, Header, Image, Segment, Divider, Popup, Icon } from 'semantic-ui-react';
import { translateBasin, formatNumber } from 'utils';
import format from 'date-fns/format';
import { HurricaneCharts } from 'UI';

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

      { hurricane.description && (
        <Segment compact>
          { hurricane.description.substring(0, 280) }
          { hurricane.description.length > 280 && (
            <Popup
              on="click"
              position="left center"
              trigger={<strong><span style={{ color: 'lightblue' }}>... See more</span></strong>}
            >
              { hurricane.description }
              { hurricane.description_source && (
                <div style={{ textAlign: 'right' }}>
                  <a href={hurricane.description_source} target="_blank" rel="noopener noreferrer">
                    Source&nbsp;
                    <Icon name="external alternate" size="small" />
                  </a>
                </div>
              )}
            </Popup>
          )}
        </Segment>
      )}

      <p>
        <strong>Basin:</strong> { translateBasin(hurricane.basin) }
      </p>
      <p>
        <strong>Season: </strong> { hurricane.season }
      </p>
      <p>
        <strong>Formed: </strong> { format(new Date(hurricane.formed), 'MMMM L, yyyy') }
      </p>
      <p>
        <strong>Dissipated: </strong> { format(new Date(hurricane.dissipated), 'MMMM L, yyyy') }
      </p>
      { hurricane.min_range_fatalities && hurricane.max_range_fatalities && (
        <p>
          <strong>Fatalities: </strong>
          { hurricane.min_range_fatalities === hurricane.max_range_fatalities ?
            formatNumber(hurricane.min_range_fatalities)
          :
            `${formatNumber(hurricane.min_range_fatalities)} - ${formatNumber(hurricane.max_range_fatalities)}`
          }
        </p>
      )}

      { hurricane.min_range_damage && hurricane.max_range_damage && (
        <p>
          <strong>Damage: </strong>
          { hurricane.min_range_damage === hurricane.max_range_damage ?
            `${formatNumber(hurricane.min_range_damage)} USD (${hurricane.season})`
          :
            `${formatNumber(hurricane.min_range_damage)} - ${formatNumber(hurricane.max_range_damage)} USD (${hurricane.season})`
          }
        </p>
      )}

      <Divider />

      <HurricaneCharts hurricane={hurricane} />
    </div>
  )
}

export default HurricaneSidebar;
