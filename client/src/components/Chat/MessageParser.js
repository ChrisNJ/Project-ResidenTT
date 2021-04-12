// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase(); 

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowerCaseMessage.includes("Family Court")) {
      this.actionProvider.handleFamilyCourtList();
    } 

    if (lowerCaseMessage.includes("Magistrate's Court")) {
      this.actionProvider.handleMagCourtList();
    }

    if (lowerCaseMessage.includes("horn")) {
      this.actionProvider.horn();
    }
    if (lowerCaseMessage.includes("residentt")) {
      this.actionProvider.group();
    }
    if (lowerCaseMessage.includes("group member")) {
      this.actionProvider.members();
    } 
    if (lowerCaseMessage.includes("criminal registry located") || (lowerCaseMessage.includes("crime registry location"))) {
      this.actionProvider.crim_reg();
    } 
    if (lowerCaseMessage.includes("What bail")) {
      this.actionProvider.what_is_bail();
    }
  }
}
  
export default MessageParser;
