class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  handleFamilyCourtList() {
    const message = this.createChatBotMessage(
      "Are any of these what you're looking for?",
      {
        widget: "FamilyCourtLinks",
      }
    );

    this.updateChatbotState(message);
  }  

  handleMagCourtList() {
    const message = this.createChatBotMessage(
      "Are any of these what you're looking for?",
      {
        widget: "MagCourtLinks",
      }
    );

    this.updateChatbotState(message);
  }

  handleNumbersList() {
    const greetingMessage = this.createChatBotMessage("Here's a List of Emergency Numbers");

    const emergency = this.createChatBotMessage("Emergency: 911"); 
    const police = this.createChatBotMessage("Police: 999");  
    const fire = this.createChatBotMessage("Fire: 990"); 
    const ambulance = this.createChatBotMessage("Ambulance: 811"); 
    const stoppers = this.createChatBotMessage("Crime Stoppers: 800-TIPS"); 
    const anticrime = this.createChatBotMessage("Anti-Crime Hotline: 555"); 
    const odpm = this.createChatBotMessage("ODPM: 800-ODPM"); 


    this.updateChatbotState(greetingMessage);  
    this.updateChatbotState(emergency);  
    this.updateChatbotState(police); 
    this.updateChatbotState(fire);
    this.updateChatbotState(ambulance);
    this.updateChatbotState(stoppers);
    this.updateChatbotState(anticrime);
    this.updateChatbotState(odpm);

    
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
  def_battery() {
    const greetingMessage = this.createChatBotMessage(
      "This is where the victim suffers harm; there need be no fear or anticipation of harm. "
    );
    this.updateChatbotState(greetingMessage);
  }  
  def_assault() {
    const greetingMessage = this.createChatBotMessage(
      "This can occur when a victim thinks that he or she is likely to suffer imminent harm."
    );
    this.updateChatbotState(greetingMessage);
  }  
  def_aggravated_burglary() {
    const greetingMessage = this.createChatBotMessage(
      "Where the defendant commits a burglary with a fireman or immitaion firearm."
    );
    this.updateChatbotState(greetingMessage);
  }  
  def_entry() {
    const greetingMessage = this.createChatBotMessage(
      "For the offence of burglary there must be entry to the property but this does not have to be substantial, effective or Indeed complete."
    );
    this.updateChatbotState(greetingMessage);
  }  
  def_negligence() {
    const greetingMessage = this.createChatBotMessage(
      "This is where the defendant has acted in a way that has fallen below the standard that is required. It mainly links to strict liablity offences but also has been found to be relevant to gross negligence manslaughter."
    );
    this.updateChatbotState(greetingMessage);
  }   
  crim_reg() {
    const greetingMessage = this.createChatBotMessage(
      " The Criminal Registry is located on the ground floors of the Supreme Courts, Port of Spain and San Fernando"
    );
    this.updateChatbotState(greetingMessage);
  }  
  what_is_bail() {
    const greetingMessage = this.createChatBotMessage(
      " Bail is essentially the release from custody of an accused on certain terms/conditions subject to the undertaking to subsequently surrender to custody or attend court to answer a criminal charge at the appointed date, time and place and any other conditions that the court may impose. The accused is usually released to a surety to secure his surrender to custody or in some instances he may be released on signing his own bond."
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
