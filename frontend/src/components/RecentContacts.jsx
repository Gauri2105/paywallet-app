import { useEffect, useState } from "react";
import api from "../api/axios";

const RecentContacts = () => {
  const [contacts, setContacts] =
    useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response =
        await api.get("/users/recent");

      setContacts(response.data.contacts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold mb-4">
        Recent Contacts
      </h2>

      {contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        contacts.map((contact) => (
          <div
            key={contact._id}
            className="flex items-center gap-3 py-3 border-b"
          >
            <img
              src={
                contact.profileImage ||
                "https://i.pravatar.cc/100"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold">
                {contact.name}
              </p>

              <p className="text-sm text-gray-500">
                {contact.email}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RecentContacts;