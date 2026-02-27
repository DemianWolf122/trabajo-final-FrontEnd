import { createContext, useState } from "react";
// Le agregamos el .js al final para que Vite no llore
import { getContacts } from "../services/contactsService.js";

export const ContactsContext = createContext(
    {
        contacts: [],
        favorite_name: ''
    }
)

const ContactsContextProvider = ({ children }) => {
    const contacts = getContacts()
    const [contactsState, setContactsState] = useState(contacts)

    const provider_values = {
        contacts: contactsState,
        favorite_name: 'pepe'
    }

    return (
        <ContactsContext.Provider value={provider_values}>
            {children}
        </ContactsContext.Provider>
    )
}

export default ContactsContextProvider