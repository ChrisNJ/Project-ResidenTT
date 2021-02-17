class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  horn() {
    const greetingMessage = this.createChatBotMessage("That's Rough Buddy.");
    this.updateChatbotState(greetingMessage);
  }
  group() {
    const greetingMessage = this.createChatBotMessage(
      "ResidenTT is a Crime Predication Application that uses a clustering algorith to predict when a where a crime may occur in the near or late future."
    );
    this.updateChatbotState(greetingMessage);
  }
  members() {
    const greetingMessage = this.createChatBotMessage(
      "The Group consists of Dexter Singh, Christopher Joseph and Keronn Gill"
    );
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    // NOTE: This function is set in the constructor, and is passed in      // from the top level Chatbot component. The setState function here     // actually manipulates the top level state of the Chatbot, so it's     // important that we make sure that we preserve the previous state.

    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
