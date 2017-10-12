import React from 'react';
import List from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentSend from 'material-ui/svg-icons/content/send';

import MenuItem from './menuItem';

export default ({ resources, onMenuTap, logout }) => (
    <List>
          <MenuItem primaryText="Users"  to="/users" onClick={onMenuTap} leftIcon={<ContentSend />} />
          <MenuItem
             primaryText="Organization"
             leftIcon={<ContentInbox style={{ width:20, height: 20}} />}
             initiallyOpen={true}
             primaryTogglesNestedList={true}
             innerDivStyle={{ padding: '16px 36px 16px 40px'}}
             nestedItems={[
               <MenuItem
                 key={1}
                 primaryText="Categories"
                 leftIcon={<ActionGrade />}
               />,
               <MenuItem
                 key={2}
                 primaryText="District"
                 leftIcon={<ActionGrade />}
               />,
               <MenuItem
                 key={3}
                 primaryText="Zone"
                 leftIcon={<ContentSend />}
                 disabled={true}
               />,
               <MenuItem
                 key={4}
                 primaryText="Unit"
                 leftIcon={<ContentInbox />}
               />,
             ]}
           />
    </List>

);
