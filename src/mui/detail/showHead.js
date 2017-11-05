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
      backTo,
      hasEdit,
      tab,
    } = this.props;
    const record = data || {};
    const deleteLink = backTo ? `${linkToRecord(basePath, record.id)}/delete?backTo=${backTo}` : `${linkToRecord(basePath, record.id)}/delete`;
    const editLink = backTo ? `${linkToRecord(basePath, record.id)}?backTo=${backTo}` : `${linkToRecord(basePath, record.id)}`;

    const viewTitle =  width === 1
      ? <AppBarMobile
          title={backTitle}
          titleLink={backTo || basePath}
          leftMenu={[
            <MenuItem primaryText="Refresh" type="refresh" />,
            <MenuItem primaryText="Delete" containerElement={
              <Link to={deleteLink} />
            } />,
          <MenuItem primaryText="Edit" containerElement={
              <Link to={editLink} />
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
                  hasList,
                  hasDelete,
                  hasEdit,
                  resource,
              })}
        </div>

    );
  };
}

export default withWidth()(EditHead);
