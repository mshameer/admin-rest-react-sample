import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan700, grey900 } from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
    accent1Color: cyan700,
  },
  appBar: {
    height: 57,
    color: cyan700
  },
  drawer: {
    width: 270,
    color: grey900,
  },
  raisedButton: {
    primaryColor: cyan700,
  },
  sideBar: {
    backgroundColor: '#FFF',
  },
  tabs:{
    backgroundColor: cyan700,
  },
  home: {
    dashColor: cyan700,
  }
});


export default themeDefault;
