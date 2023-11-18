import { Component } from 'react';
import { nanoid } from 'nanoid';
import toast, { Toaster } from 'react-hot-toast';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

import { GlobalStyle } from './GlobalStyle';
import { Layout, PageTitle, Title } from './App.styled';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  updateFilter = value => {
    this.setState({ filter: value });
  };

  addContact = contact => {
    const formattedName = contact.name.toLowerCase();
    const isExist = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === formattedName
    );

    if (isExist) {
      toast.error(`${contact.name} is already in contacts.`);
      return isExist;
    }

    const newContact = { ...contact, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
    toast.success('Contact successfully added');
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    toast.success('Contact successfully deleted');
  };

  filterContacts = () => {
    const { filter, contacts } = this.state;
    const formattedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(formattedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.filterContacts();

    const results = filteredContacts.length;
    let filterInfo = '';
    if (!results && !filter) filterInfo = <p>Your contact list is empty</p>;
    if (!results && filter) filterInfo = <p>Not Finded</p>;

    return (
      <Layout>
        <GlobalStyle />
        <Toaster toastOptions={{ duration: 1500 }} />

        <PageTitle>Phonebook</PageTitle>
        <ContactForm onAdd={this.addContact} />

        <Title>Contacts</Title>
        <Filter
          filter={filter}
          filterInfo={filterInfo}
          onUpdate={this.updateFilter}
        />
        <ContactList
          contacts={filteredContacts}
          onDelete={this.deleteContact}
        />
      </Layout>
    );
  }
}
