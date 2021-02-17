// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("horn")) {
      this.actionProvider.horn();
    }
    if (lowerCaseMessage.includes("residentt")) {
      this.actionProvider.group();
    }
    if (lowerCaseMessage.includes("group member")) {
      this.actionProvider.members();
    }
  }
}

export default MessageParser;
