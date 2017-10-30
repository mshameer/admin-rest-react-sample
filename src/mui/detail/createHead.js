import React, { Component } from 'react';
import { CardTitle } from 'material-ui/Card';
import withWidth from 'material-ui/utils/withWidth';
import AppBarMobile from '../layout/appBarMobile';

class CreateHead extends Component {

  render() {
    const {
      title,
      actions,
      resource,
      basePath,
      hasList,
      width,
      backTitle,
      tab,
    } = this.props;

    const viewTitle =  width === 1
      ? <AppBarMobile title={backTitle} titleLink={basePath} tab={tab} />
      : <CardTitle title={title} className="title" />;

    return (
        <div>
            {viewTitle}
            {actions &&  width !== 1 &&
              React.cloneElement(actions, {
                  basePath,
                  resource,
                  hasList,
            })}
        </div>

    );
  };
}

export default withWidth()(CreateHead);
