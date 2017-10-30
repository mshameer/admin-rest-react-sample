import React, { Component } from 'react';
import { CardTitle, CardActions } from 'material-ui/Card';
import withWidth from 'material-ui/utils/withWidth';
import { ListButton } from 'admin-on-rest/lib/mui/button';
import AppBarMobile from '../layout/appBarMobile';

const styles = {
    actions: { zIndex: 2, display: 'inline-block', float: 'right' },
};

class DeleteHead extends Component {

  render() {
    const {
      title,
      basePath,
      width,
      backTitle,
    } = this.props;

    return (
        <div>
          {
            width === 1
              ? <AppBarMobile title={backTitle} titleLink={basePath} />
              :  (<div>
                    <CardActions style={styles.actions}>
                      <ListButton basePath={basePath} />
                    </CardActions>
                    <CardTitle title={title} className="title" />;
                  </div>)
            }
        </div>

    );
  };
}

export default withWidth()(DeleteHead);
