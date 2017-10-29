import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';

const tertiaryStyle = { float: 'right', opacity: 0.541176 };

class SimpleList extends Component {
    getText = (label, element, record, key) => {
      const textElements = [];
      const basePath = this.props.basePath;

      if (label) {
        textElements.push(label);
      }
      if(element) {
        textElements.push(React.cloneElement(element, { record, basePath, key}));
      }
      return textElements;
    }

    render() {
      const {
        children,
        ids,
        data,
        basePath,
        primaryText,
        secondaryText,
        secondaryStyle,
        secondaryPlusText,
        secondaryTextLines,
        tertiaryText,
        leftAvatar,
        leftIcon,
        rightAvatar,
        rightIcon,
        backTo,
      } = this.props;

      return (
        <List>
            {ids.map((id, index) => {
              const listChildren = {}
              React.Children.map(children, (child) =>{
                listChildren[child.props.type] = child;
              })
              return([
                <ListItem
                    key={id}
                    primaryText={
                        <div>
                            { this.getText(primaryText, listChildren.primary,  data[id], `${id}-pr`) }
                            { listChildren.tertiary && (
                                <span style={tertiaryStyle}>
                                  { this.getText(tertiaryText, listChildren.tertiary,  data[id], `${id}-tr`) }
                                </span>
                            )}
                        </div>
                    }
                    secondaryText={
                      <div style={secondaryStyle}>
                        { this.getText(secondaryText, listChildren.secondary,  data[id], `${id}-sec`) }
                        { listChildren.secondaryPlus && <span> | </span> }
                        { this.getText(secondaryPlusText, listChildren.secondaryPlus,  data[id], `${id}-pl`) }
                      </div>
                    }
                    secondaryTextLines={secondaryTextLines}
                    leftAvatar={leftAvatar && leftAvatar(data[id], id)}
                    leftIcon={leftIcon && leftIcon(data[id], id)}
                    rightAvatar={rightAvatar && rightAvatar(data[id], id)}
                    rightIcon={rightIcon && rightIcon(data[id], id)}
                    containerElement={<Link to={`${basePath}/${id}?backTo=${backTo}`} />}
                />,
              ids.length - 1 > index && <Divider inset={true} key={`${id}-devider`} />]
            )})}
        </List>
      )
    }
}

SimpleList.propTypes = {
    ids: PropTypes.array,
    data: PropTypes.object,
    basePath: PropTypes.string,
    primaryText: PropTypes.string,
    secondaryText: PropTypes.string,
    secondaryTextLines: PropTypes.number,
    secondaryStyle: PropTypes.object,
    tertiaryText: PropTypes.string,
    leftAvatar: PropTypes.func,
    leftIcon: PropTypes.func,
    rightAvatar: PropTypes.func,
    rightIcon: PropTypes.func,
};

export default SimpleList;
