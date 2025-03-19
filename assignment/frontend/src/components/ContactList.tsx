// components/ContactList.tsx
import React, { useEffect, useState } from "react";

interface ContactListProps {
  onSelectUser: (userId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState<{ id: string; username: string }[]>(
    []
  );

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  return (
    <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Contacts</h2>
      <ul className="space-y-2">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className="p-2 bg-white rounded-md shadow cursor-pointer hover:bg-blue-100 transition"
            onClick={() => onSelectUser(contact.id)}
          >
            {contact.username}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ContactList;
