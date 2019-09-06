import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#0D47A1', light: '#5472d3', dark: '#002171', contrastText: '#FFFFFF' },
  secondary: { main: '#FF6F00', light: '#FFA040', dark: '#C43E00', contrastText: '#000000' }
};
const themeName = 'Custom Theme';

export default createMuiTheme({ palette, themeName });