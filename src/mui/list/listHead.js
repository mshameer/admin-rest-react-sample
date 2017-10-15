import React, { Component } from 'react';
import { CardTitle } from 'material-ui/Card';
import withWidth from 'material-ui/utils/withWidth';
import autoprefixer from 'material-ui/utils/autoprefixer';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AppBarMobile from './AppBarMobile';

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

class ListHead extends Component {

  render() {
    const {
      title,
      actions,
      resource,
      filters,
      filterValues,
      basePath,
      hasCreate,
      displayedFilters,
      showFilter,
      theme,
      refresh,
      hideFilter,
      setFilters,
      width,
    } = this.props;

    const muiTheme = getMuiTheme(theme);
    const prefix = autoprefixer(muiTheme);
    const viewTitle =  width === 1
      ? <AppBarMobile title={title} />
      : <CardTitle title={title} className="title" />;

    return (
      <div>
        <div style={prefix(styles.header)}>
            {viewTitle}
            {actions &&
                React.cloneElement(actions, {
                    resource,
                    filters,
                    filterValues,
                    basePath,
                    hasCreate,
                    displayedFilters,
                    showFilter,
                    theme,
                    refresh,
                })}
        </div>
        {filters && width !== 1 &&
          React.cloneElement(filters, {
              resource,
              hideFilter,
              filterValues,
              displayedFilters,
              setFilters,
              context:'form'
          })}
      </div>
    );
  };
}

export default withWidth()(ListHead);
