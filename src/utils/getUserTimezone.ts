const timezone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];
const getUserTimezone = () => timezone;

export default getUserTimezone;
