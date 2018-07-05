import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
};

function Nav(props) {
  // const { classes } = props;
  return (
    <div>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="title" color="inherit" >
                Stacks Explorer
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
      </Grid>
    </div>
  );
}

Nav.propTypes = {
  // classes: PropTypes.object.isRequired,
};

export default Nav;
