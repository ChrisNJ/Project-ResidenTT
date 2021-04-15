import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Chatbot from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/HelpOutlineOutlined";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: "54%",
    right: "-5%",
    /* bring your own prefixes */
    transform: "translate(-50%, -50%)",
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={MessageParser}
      />
    </div>
  );

  return (
    <div>
      <Fab
        color="primary"
        aria-label="help"
        data-toggle="tooltip"
        data-placement="left"
        title="Chatbot"
        onClick={handleOpen}
        style={style}
      >
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
