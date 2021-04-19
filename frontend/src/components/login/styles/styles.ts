import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', 
    padding: '3rem',
    color: '#7289da',
    backgroundColor: '#36393f',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  smileIconContainer: {
    height: '200px',
    width: '100',
    backgroundColor: '#7289da',
    color: 'white',
  },
  smileIcon: {
    fontSize: '100px',
  },
  input: {
    color: 'ivory',
  },
  container: {
    boxShadow:
      'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px',
  },
}));
