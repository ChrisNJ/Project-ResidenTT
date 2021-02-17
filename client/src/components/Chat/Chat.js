import React, { Component } from "react";

import Chatbot from "react-chatbot-kit";

import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import ReactDOM from "react-dom";

const style = {
  margin: 0,
  top: "auto",
  right: 20,
  bottom: 20,
  left: "auto",
  position: "fixed",
};

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.toggleDiv = this.toggleDiv.bind(this);
  }

  toggleDiv = () => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    return (
      <div>
        <div>
          {this.state.show && (
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
            />
          )}
        </div>
        <Fab
          color="primary"
          aria-label="add"
          onClick={this.toggleDiv}
          style={style}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}
export default ChatComponent;
