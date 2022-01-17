import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { useContacts } from "../contexts/ContactsProvider";
import { useConversations } from "../contexts/ConversationsProvider";
import AddContact from "./AddContact";
import AddConversations from "./AddConversations";
export default function Contacts() {
  const { contacts } = useContacts();
  const { conversations, selectedConversationIndex } = useConversations();
  const to_be_displayed = () => {
    if (contacts.length === 0) {
      return (
        <>
          <h1>No Contacts</h1>
          <AddContact />
        </>
      );
    }
    return (
      <>
        <div className="border-4 border-gray-300 max-h-80 overflow-auto rounded-lg">
          <ListGroup variant="flush">
            {conversations.map((x, index) => (
              
              <ListGroup.Item
                key={index}
                className="text-base lg:text-xl text-center list-group-item list-group-item-dark"
                action
                onClick={() => selectedConversationIndex(index)}
                active={x.selected}
              >
                {x.recipients.map((recipient) => recipient.name).join(", ")}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <AddConversations />
      </>
    );
  };

  return <div>{to_be_displayed()}</div>;
}
