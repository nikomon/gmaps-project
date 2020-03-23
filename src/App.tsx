import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Input } from './Input';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import PeopleIcon from '@material-ui/icons/PeopleOutline';
import PinIcon from '@material-ui/icons/RoomOutlined'
import { VerticalLinearStepper } from './Stepper';
import { MapContainer } from './GoogleMaps';
import GoogleMapReact from 'google-map-react';

require('dotenv').config()

export const AnyReactComponent: React.FC<{text: string, lat: number, lng: number}> = ({ text, lat, lng }) => <div>{text}</div>;


export const App = () => {
const useStyles = makeStyles({
  root: {
    padding: '12px',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
    width: '100%',
    bottom: 0,
    position: 'absolute'
  },
});
const [value, setValue] = useState(0);
const classes = useStyles();
return (
<div style={{ display: 'flex'}}>

{
 value === 0 ?
  <VerticalLinearStepper/> :
  <MapContainer/>
}
<BottomNavigation
  value={value}
  onChange={(_, newValue) => {
    setValue(newValue);
  }}
  showLabels
  className={classes.root}
>
  <BottomNavigationAction label="Kartoitus" icon={<PeopleIcon />} />
  <BottomNavigationAction label="Kartta" icon={<PinIcon />} />
</BottomNavigation>
</div>
)};
