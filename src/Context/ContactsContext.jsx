import { createContext, useState } from "react";
import { getContacts } from "../services/contactsService.js";

export const ContactsContext = createContext();

const ContactsContextProvider = ({ children }) => {
    const [contactsState, setContactsState] = useState(getContacts());

    // Función mágica para enviar mensajes
    const sendMessage = (contactId, text) => {
        const newMessage = {
            id: Date.now(), // ID único temporal
            text: text,
            send_by_me: true,
            created_at: new Date().toISOString(),
            is_read: false
        };

        setContactsState(prevContacts =>
            prevContacts.map(contact =>
                contact.id === Number(contactId)
                    ? { ...contact, messages: [...contact.messages, newMessage] }
                    : contact
            )
        );
    };

    return (
        <ContactsContext.Provider value={{ contacts: contactsState, sendMessage }}>
            {children}
        </ContactsContext.Provider>
    );
};

export default ContactsContextProvider;