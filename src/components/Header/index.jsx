import logo from "../../images/logo-covid19.png";
import "./styles.css";

Header.propTypes = {};

function Header(props) {
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  return (
    <div className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      {/* <button className="btn__Login" onClick={handleClickOpen}>
        Đăng nhập
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}
    </div>
    // Form đăng nhập
  );
}

export default Header;
