import React, { Component } from 'react';
import { CardTitle } from 'material-ui/Card';
import withWidth from 'material-ui/utils/withWidth';
import linkToRecord from 'admin-on-rest/lib/util/linkToRecord';
import AppBarMobile from '../layout/appBarMobile';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

class EditHead extends Component {

  render() {
    const {
      title,
      actions,
      resource,
      basePath,
      hasList,
      width,
      backTitle,
      data,
      hasDelete,
      hasShow,
      backTo,
      tab,
    } = this.props;
    const record = data || {};
    const deleteLink = backTo ? `${linkToRecord(basePath, record.id)}/delete?backTo=${backTo}` : `${linkToRecord(basePath, record.id)}/delete`;

    const viewTitle =  width === 1
      ? <AppBarMobile
          title={backTitle}
          titleLink={backTo || basePath}
          leftMenu={[
            <MenuItem primaryText="Refresh" type="refresh" />,
            <MenuItem primaryText="Delete" containerElement={
              <Link to={deleteLink} />
            } />
          ]}
          tab={tab}
        />
      : <CardTitle title={title} className="title" />;

    return (
        <div>
            {viewTitle}
            {actions && width !== 1 &&
              React.cloneElement(actions, {
                  basePath,
                  data,
                  hasDelete,
                  hasShow,
                  hasList,
                  resource,
              })}
        </div>

    );
  };
}

export default withWidth()(EditHead);
