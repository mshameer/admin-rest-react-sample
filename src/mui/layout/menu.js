import React from 'react';
import { translate } from 'admin-on-rest';
import List from 'material-ui/List';
import Business from 'material-ui/svg-icons/communication/business';
import DeviceHub from 'material-ui/svg-icons/hardware/device-hub';
import Layers from 'material-ui/svg-icons/maps/layers';
import Nature from 'material-ui/svg-icons/image/nature';
import Snooze from 'material-ui/svg-icons/av/snooze';
import People from 'material-ui/svg-icons/social/people';
import Weekend from 'material-ui/svg-icons/content/weekend';
import Actors from 'material-ui/svg-icons/av/recent-actors';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Update from 'material-ui/svg-icons/action/update';
import Place from 'material-ui/svg-icons/maps/place';
import Carousel from 'material-ui/svg-icons/action/view-carousel';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import { getCurrentUser, WithPermission, STATE_LEVEL_PERMISSION, ZONE_LEVEL_PERMISSION, PERMISSION_NOT_EQUAL_TO, PERMISSION_EQUAL_TO } from '../../utils/permissions';

import MenuItem from './menuItem';

const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
      color: white,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    heading: {
      display: 'flex',
      paddingTop: 5,
      paddingLeft: 5,
    },
    headingBg: {
      padding: '15px 0 20px 12px',
      backgroundImage:  'url(' + require('./material_bg.png') + ')',
      height: 111
    },
    headText: {
      display: 'block',
      paddingTop: 5,
      paddingLeft: 7,
      fontSize: 14,
      color: '#FFF',
    }
  };
const { displayName = '', role } = getCurrentUser() || {};

const Menu = ({ resources, onMenuTap, logout, translate }) => (
  <div>
    <div style={styles.headingBg}>
      <div style={styles.heading}>
        <Avatar  size={25} >{ displayName.charAt(0).toUpperCase()}</Avatar>
        <span style={styles.headText}>{displayName}</span>
      </div>
    </div>
    <List>
      <MenuItem primaryText={translate('menu.home')} to="/campaigns-home" onClick={onMenuTap} leftIcon={<Dashboard />} />
      <WithPermission type={PERMISSION_NOT_EQUAL_TO} role="state" >
        <MenuItem primaryText={translate('resources.campaigns')}  to="/campaigns-details" onClick={onMenuTap} leftIcon={<Weekend />} />
      </WithPermission>
      <WithPermission type={PERMISSION_EQUAL_TO} role="state">
        <MenuItem
           primaryText={translate('resources.campaigns')}
           leftIcon={<Weekend />}
           primaryTogglesNestedList={true}
           nestedItems={[
              <MenuItem  key={9} primaryText={translate('resources.guests')}  to="/guests" onClick={onMenuTap} leftIcon={<Actors />} />,
              <MenuItem  key={10} primaryText={translate('resources.teams')}  to="/teams" onClick={onMenuTap} leftIcon={<Carousel />} />,
              <MenuItem  key={11} primaryText={translate('resources.schedules')}  to="/schedule" onClick={onMenuTap} leftIcon={<Update />} />,
              <MenuItem  key={12} primaryText={translate('menu.new_campaign')}  to="/campaigns" onClick={onMenuTap} leftIcon={<Weekend />} />
              ]}
            />
      </WithPermission>
      <MenuItem primaryText={translate('resources.members')}  to="/users" onClick={onMenuTap} leftIcon={<People />} />
      <MenuItem primaryText={translate('resources.places')}  to="/places" onClick={onMenuTap} leftIcon={<Place />} />
      <WithPermission type={STATE_LEVEL_PERMISSION} role={role}>
        <MenuItem
           primaryText={translate('resources.organization')}
           leftIcon={<DeviceHub />}
           primaryTogglesNestedList={true}
           nestedItems={[
             <MenuItem
               key={1}
               primaryText={translate('resources.categories')}
               to="/categories"
               onClick={onMenuTap}
               leftIcon={<Layers />}
             />,
             <MenuItem
               key={2}
               primaryText={translate('resources.districts')}
               to="/districts"
               onClick={onMenuTap}
               leftIcon={<Business />}
             />,
             <MenuItem
               key={3}
               primaryText={translate('resources.zones')}
               to="/zones"
               onClick={onMenuTap}
               leftIcon={<Snooze />}
             />,
             <MenuItem
               key={4}
               primaryText={translate('resources.units')}
               to="/units"
               onClick={onMenuTap}
               leftIcon={<Nature />}
             />,
           ]}
         />
      </WithPermission>
      {logout}
    </List>
  </div>
);

export default translate(Menu);
