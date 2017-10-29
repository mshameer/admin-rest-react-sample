import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan700, grey900, limeA200} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    accent1Color: limeA200,
  },
  appBar: {
    height: 57,
    color: cyan700
  },
  drawer: {
    width: 270,
    color: grey900
  },
  raisedButton: {
    primaryColor: cyan700,
  },
  sideBar: {
    backgroundColor: '#FFF',
  }
});


export default themeDefault;
