import React from "react"; 
import  {createChatBotMessage}  from "react-chatbot-kit";

import LearningOptions from "./LearningOptions"; 
import LinkList from "./LinkList";

const config = { 
  botName: "ResidenTT BOT",
  initialMessages: [
    createChatBotMessage("Hi, I'm here to help. What do you need to know?", {
      widget: "learningOptions",
    }),
  ], 
  widgets: [
    {
      widgetName: "learningOptions",
     widgetFunc: (props) => <LearningOptions {...props} />,
    }, 
    {
      widgetName: "FamilyCourtLinks",
      widgetFunc: (props) => <LinkList {...props} />, 
      props: {
        options: [
          {
            text: "Magisterial Applications",
            url:
            "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/magisterial-applications",
            id: 1,
          },
          {
            text: "Child Maintenance",
            url:
              "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/child-maintenance",
            id: 2,
          },
          {
            text: "Cohabitational Relationships",
            url: "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/co-habitational-relationships",
            id: 3,
          }, 
          {
            text: "Beyond Control",
            url:
            "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/beyond-control",
            id: 4,
          },
          {
            text: "Protection Orders",
            url:
              "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/protection-orders",
            id: 5,
          },
          {
            text: "Variation of Orders",
            url: "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/variation-of-orders",
            id: 6,
          }, 
          {
            text: "Attachment of Earnings",
            url:
            "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/attachment-of-earnings",
            id: 7,
          },
          {
            text: "Other Questions",
            url:
              "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/other-questions",
            id: 8,
          },
          {
            text: "Court Pay",
            url: "https://www.ttlawcourts.org/index.php/public-guidance/faqs/family-court/courtpay",
            id: 7,
          },
        ],
      },  
      
    }, 
    {
      widgetName: "MagCourtLinks",
      widgetFunc: (props) => <LinkList {...props} />, 
      props: {
        options: [
          {
            text: "Criminal Registry",
            url:
            "https://www.ttlawcourts.org/index.php/public-guidance/faqs/magistrates-court/criminal-registry",
            id: 1,
          },
          {
            text: "Bail",
            url:
              "https://www.ttlawcourts.org/index.php/public-guidance/faqs/magistrates-court/bail",
            id: 2,
          },
          {
            text: "Liquor Licences",
            url: "https://www.ttlawcourts.org/index.php/public-guidance/faqs/magistrates-court/liquor-licences",
            id: 3,
          }, 
          {
            text: "Magistrates' Court Extract",
            url:
            "https://www.ttlawcourts.org/index.php/public-guidance/faqs/magistrates-court/magistrates-court-extract",
            id: 4,
          },
          {
            text: "Drug Treatment Court",
            url:
              "https://www.ttlawcourts.org/images/Judiciary%20FAQ%20Brochure.pdf",
            id: 5,
          },
        ],
      },  
      
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
}

export default config