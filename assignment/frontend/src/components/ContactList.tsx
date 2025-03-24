import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Contact {
  _id: string;
  username: string;
}

interface ContactListProps {
  onSelectUser: (userId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectUser }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth(); // Get token from AuthContext

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/users/contacts", // Use environment variable
          {
            headers: { Authorization: `Bearer ${token}` }, // Pass token
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setContacts(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("Error fetching contacts:", error);
        } else {
          setError("An unknown error occurred.");
          console.error("An unknown error occurred:", error);
        }
      }
    };

    fetchContacts();
  }, [token]);

  return (
    <aside className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Contacts</h2>

      {error ? (
        <p className="text-red-500">Failed to load contacts: {error}</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found.</p>
      ) : (
        <ul className="space-y-2">
          {contacts.map((contact) => (
            <li
              key={contact._id}
              className="p-2 bg-white rounded-md shadow cursor-pointer hover:bg-blue-100 transition"
              onClick={() => onSelectUser(contact._id)}
            >
              {contact.username}
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default ContactList;
