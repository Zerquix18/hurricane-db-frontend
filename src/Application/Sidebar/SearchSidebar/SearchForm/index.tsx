import React, { useState } from 'react';
import { Form, Grid, Divider, Button } from 'semantic-ui-react';
import { useSettings } from 'hooks';
import { ZonePicker } from 'UI';
import { SearchParams, AppModeSearch } from 'models';
import { useHistory, useLocation } from 'react-router';

interface SearchModeProps {
  searchMode: AppModeSearch;
}

const SearchForm: React.FC<SearchModeProps> = ({ searchMode }) => {
  const history = useHistory();
  const settings = useSettings();
  const location = useLocation();
  const defaultParams = new URLSearchParams(location.search.substr(1));

  const [name, setName] = useState(defaultParams.get('name') || '');
  const [season, setSeason] = useState(defaultParams.get('season') || '');
  const [affecting, setAffecting] = useState(defaultParams.get('affected_area') || '');
  const [minSpeed, setMinSpeed] = useState(defaultParams.get('min_speed') || '');
  const [maxSpeed, setMaxSpeed] = useState(defaultParams.get('max_speed') || '');
  const [minPressure, setMinPressure] = useState(defaultParams.get('min_pressure') || '');
  const [maxPressure, setMaxPressure] = useState(defaultParams.get('max_pressure') || '');
  const [minDeaths, setMinDeaths] = useState(defaultParams.get('min_deaths') || '');
  const [maxDeaths, setMaxDeaths] = useState(defaultParams.get('max_deaths') || '');
  const [minDamage, setMinDamage] = useState(defaultParams.get('min_damage') || '');
  const [maxDamage, setMaxDamage] = useState(defaultParams.get('max_damage') || '');
  const [minACE, setMinACE] = useState(defaultParams.get('min_ace') || '');
  const [maxACE, setMaxACE] = useState(defaultParams.get('max_ace') || '');
  const [minDistanceTraveled, setMinDistanceTraveled] = useState(defaultParams.get('min_distance_traveled') || '');
  const [maxDistanceTraveled, setMaxDistanceTraveled] = useState(defaultParams.get('max_distance_traveled') || '');
  const [minFormationMonth, setMinFormationMonth] = useState(defaultParams.get('min_formation_month') || '');
  const [maxFormationMonth, setMaxFormationMonth] = useState(defaultParams.get('max_formation_month') || '');
  const [swLat, setSwLat] = useState<number|null>(
    defaultParams.get('sw_lat') ? parseFloat(defaultParams.get('sw_lat')!) : null
  );
  const [swLng, setSwLng] = useState<number|null>(
    defaultParams.get('sw_lng') ? parseFloat(defaultParams.get('sw_lng')!) : null
  );
  const [neLat, setNeLat] = useState<number|null>(
    defaultParams.get('ne_lat') ? parseFloat(defaultParams.get('ne_lat')!) : null
  );
  const [neLng, setNeLng] = useState<number|null>(
    defaultParams.get('ne_lng') ? parseFloat(defaultParams.get('ne_lng')!) : null
  );
  const [sortBy, setSortBy] = useState(defaultParams.get('sort_by') || 'formed');

  const boundingBox = swLat && swLng && neLat && neLng ? {
    sw: { lat: swLat, lng: swLng },
    ne: { lat: neLat, lng: neLng },
  } : null;

  const searchParams: SearchParams = {
    name: name || undefined,
    season: season || undefined,
    affected_area: affecting || undefined,
    min_speed: minSpeed || undefined,
    max_speed: maxSpeed || undefined,
    min_pressure: minPressure || undefined,
    max_pressure: maxPressure || undefined,
    min_deaths: minDeaths || undefined,
    max_deaths: maxDeaths || undefined,
    min_damage: minDamage || undefined,
    max_damage: maxDamage || undefined,
    min_ace: minACE || undefined,
    max_ace: maxACE || undefined,
    min_distance_traveled: minDistanceTraveled || undefined,
    max_distance_traveled: maxDistanceTraveled || undefined,
    min_formation_month: minFormationMonth || undefined,
    max_formation_month: maxFormationMonth || undefined,
    sw_lat: swLat ? String(swLat) : undefined,
    sw_lng: swLng ? String(swLng) : undefined,
    ne_lat: neLat ? String(neLat) : undefined,
    ne_lng: neLng ? String(neLng) : undefined,
  };

  const onSubmit = () => {
    searchParams.sort_by = sortBy;
    const params = new URLSearchParams();
    Object.entries(searchParams)
          .filter(([, value]) => value !== undefined)
          .forEach(([key, value]) => {
            params.append(key, value);
          });
    history.push(`/search?${params.toString()}`);
  };
  
  const canSubmit = ! Object.values(searchParams).every(value => value === undefined);

  return (
    <Form>
      <br />
      <Form.Field>
        <Form.Input
          label="Name"
          value={name}
          placeholder="e.g Maria"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      <Form.Field>
        <Form.Input
          label="Season"
          value={season}
          placeholder="e.g 2017"
          pattern="^[0-9]{4}$"
          onChange={(e) => {
            setSeason(e.target.value);
          }}
        />
      </Form.Field>
        <Form.Input
          label="Affected Country"
          value={affecting}
          placeholder="e.g United States"
          onChange={(e) => {
            setAffecting(e.target.value);
          }}
        />
      </Form.Field>
      <Form.Field>
        <ZonePicker
          defaultCenter={{ lat: 21.902656006558043, lng: -72.88469006709305 }}
          defaultZoom={5}
          selectedZone={boundingBox}
          onSelect={(box) => {
            if (! box) {
              setSwLat(null);
              setSwLng(null);
              setNeLat(null);
              setNeLng(null);
            } else {
              setSwLat(box.sw.lat);
              setSwLng(box.sw.lng);
              setNeLat(box.ne.lat);
              setNeLng(box.ne.lng);
            }
          }}
        />
      </Form.Field>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label={`Min Speed (${settings.units.speed})`}
            value={minSpeed}
            onChange={(e) => {
              setMinSpeed(e.target.value);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label={`Max Speed (${settings.units.speed})`}
            value={maxSpeed}
            onChange={(e) => {
              setMaxSpeed(e.target.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label={`Min Pressure (${settings.units.pressure})`}
            value={minPressure}
            onChange={(e) => {
              setMinPressure(e.target.value);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label={`Max Pressure (${settings.units.pressure})`}
            value={maxPressure}
            onChange={(e) => {
              setMaxPressure(e.target.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label="Min Deaths"
            value={minDeaths}
            onChange={(e) => {
              setMinDeaths(e.target.value);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label="Max Deaths"
            value={maxDeaths}
            onChange={(e) => {
              setMaxDeaths(e.target.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label="Min Economical Damage"
            value={minDamage}
            onChange={(e) => {
              setMinDamage(e.target.value);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label="Max Economical Damage"
            value={maxDamage}
            onChange={(e) => {
              setMaxDamage(e.target.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label="Min ACE"
            value={minACE}
            onChange={(e) => {
              setMinACE(e.target.value);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label="Max ACE"
            value={maxACE}
            onChange={(e) => {
              setMaxACE(e.target.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Input
            label={`Min Distance Traveled (${settings.units.distance})`}
            value={minDistanceTraveled}
            onChange={(e) => {
              setMinDistanceTraveled(e.target.value);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Input
            type="number"
            label={`Max Distance Traveled (${settings.units.distance})`}
            value={maxDistanceTraveled}
            onChange={(e) => {
              setMaxDistanceTraveled(e.target.value);
            }}
          />
        </Grid.Column>
      </Grid>
      <Grid>
        <Grid.Column computer={8}>
          <Form.Select
            style={{ paddingRight: 5 }}
            options={options}
            label="Min Formation Month"
            value={minFormationMonth}
            onChange={(_, data) => {
              setMinFormationMonth(data.value as string);
            }}
          />
        </Grid.Column>
        <Grid.Column computer={8}>
          <Form.Select
            style={{ paddingRight: 5 }}
            options={options}
            label="Max Formation Month"
            value={maxFormationMonth}
            onChange={(_, data) => {
              setMaxFormationMonth(data.value as string);
            }}
          />
        </Grid.Column>
      </Grid>
      <Divider />
      <Form.Select
        label="Sort By"
        options={sortOptions}
        value={sortBy}
        onChange={(_, data) => {
          const value = data.value as string;
          setSortBy(value);
        }}
      />
      <Divider />
      <div style={{ textAlign: 'center'} }>
        <Button
          color="blue"
          content="Search"
          onClick={onSubmit}
          loading={searchMode.loading}
          disabled={! canSubmit || searchMode.loading}
        />
      </div>
    </Form>
  );
};

const options = [
  { text: 'None', value: '' },
  { text: 'January', value: 1, },
  { text: 'February', value: 2, },
  { text: 'March', value: 3, },
  { text: 'April', value: 4, },
  { text: 'May', value: 5, },
  { text: 'June', value: 6, },
  { text: 'July', value: 7, },
  { text: 'August', value: 8, },
  { text: 'September', value: 9, },
  { text: 'October', value: 10, },
  { text: 'November', value: 11, },
  { text: 'December', value: 12, },
];

const sortOptions = [
  { text: 'Formation Date', value: 'formed' },
  { text: 'Dissipation Date', value: 'dissipated' },
  { text: 'Pressure', value: 'lowest_pressure' },
  { text: 'Wind Speed', value: 'highest_windspeed' },
  { text: 'Accumulated Cyclone Energy', value: 'ace' },
  { text: 'Distance Traveled', value: 'distance_traveled' },
  { text: 'Fatalities', value: 'max_range_fatalities' },
  { text: 'Damage', value: 'max_range_damage' },
];

export default SearchForm;
