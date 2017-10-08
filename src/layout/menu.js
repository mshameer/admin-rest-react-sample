import React from 'react';
import { MenuItemLink } from 'admin-on-rest';
import Divider from 'material-ui/Divider';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';

export default ({ resources, onMenuTap, logout }) => (
    <div>
    <List>
          <ListItem primaryText="Sent mail"  to="/districts" onClick={onMenuTap} leftIcon={<ContentSend />} />
          <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
          <ListItem
             primaryText="Inbox"
             leftIcon={<ContentInbox />}
             initiallyOpen={true}
             primaryTogglesNestedList={true}
             nestedItems={[
               <ListItem
                 key={1}
                 primaryText="Starred"
                 leftIcon={<ActionGrade />}
               />,
               <ListItem
                 key={2}
                 primaryText="Sent Mail"
                 leftIcon={<ContentSend />}
                 disabled={true}
                 nestedItems={[
                   <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                 ]}
               />,
               <ListItem
                 key={3}
                 primaryText="Inbox"
                 leftIcon={<ContentInbox />}
                 nestedItems={[
                   <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
                 ]}
               />,
             ]}
           />
    </List>
        <MenuItemLink to="/districts" primaryText="District" onClick={onMenuTap} />
        <MenuItemLink to="/comments" primaryText="Comments" onClick={onMenuTap} />
        <MenuItemLink to="/custom-route" primaryText="Miscellaneous" onClick={onMenuTap} />
    </div>
);
