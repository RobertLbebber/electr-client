import axios from "axios";
import { getUserData } from "app/main/apps/contacts/store/actions/user.actions";
import { Catalog } from "electr-common";
const Chat = Catalog.Categories.Chat;
const Contact = Catalog.Categories.Contact;

export const GET_CONTACTS = "[CONTACTS APP] GET CONTACTS";
export const SET_SEARCH_TEXT = "[CONTACTS APP] SET SEARCH TEXT";
export const TOGGLE_IN_SELECTED_CONTACTS =
  "[CONTACTS APP] TOGGLE IN SELECTED CONTACTS";
export const SELECT_ALL_CONTACTS = "[CONTACTS APP] SELECT ALL CONTACTS";
export const DESELECT_ALL_CONTACTS = "[CONTACTS APP] DESELECT ALL CONTACTS";
export const OPEN_NEW_CONTACT_DIALOG = "[CONTACTS APP] OPEN NEW CONTACT DIALOG";
export const CLOSE_NEW_CONTACT_DIALOG =
  "[CONTACTS APP] CLOSE NEW CONTACT DIALOG";
export const OPEN_EDIT_CONTACT_DIALOG =
  "[CONTACTS APP] OPEN EDIT CONTACT DIALOG";
export const CLOSE_EDIT_CONTACT_DIALOG =
  "[CONTACTS APP] CLOSE EDIT CONTACT DIALOG";
export const ADD_CONTACT = "[CONTACTS APP] ADD CONTACT";
export const UPDATE_CONTACT = "[CONTACTS APP] UPDATE CONTACT";
export const REMOVE_CONTACT = "[CONTACTS APP] REMOVE CONTACT";
export const REMOVE_CONTACTS = "[CONTACTS APP] REMOVE CONTACTS";
export const TOGGLE_STARRED_CONTACT = "[CONTACTS APP] TOGGLE STARRED CONTACT";
export const TOGGLE_STARRED_CONTACTS = "[CONTACTS APP] TOGGLE STARRED CONTACTS";
export const SET_CONTACTS_STARRED = "[CONTACTS APP] SET CONTACTS STARRED ";

export function getContacts(routeParams) {
  const request = axios.get(Chat.GET_CONTACTS, {
    params: routeParams,
  });

  return (dispatch) =>
    request.then((response) =>
      dispatch({
        type: GET_CONTACTS,
        payload: response.data,
        routeParams,
      })
    );
}

export function setSearchText(event) {
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value,
  };
}

export function toggleInSelectedContacts(contactId) {
  return {
    type: TOGGLE_IN_SELECTED_CONTACTS,
    contactId,
  };
}

export function selectAllContacts() {
  return {
    type: SELECT_ALL_CONTACTS,
  };
}

export function deSelectAllContacts() {
  return {
    type: DESELECT_ALL_CONTACTS,
  };
}

export function openNewContactDialog() {
  return {
    type: OPEN_NEW_CONTACT_DIALOG,
  };
}

export function closeNewContactDialog() {
  return {
    type: CLOSE_NEW_CONTACT_DIALOG,
  };
}

export function openEditContactDialog(data) {
  return {
    type: OPEN_EDIT_CONTACT_DIALOG,
    data,
  };
}

export function closeEditContactDialog() {
  return {
    type: CLOSE_EDIT_CONTACT_DIALOG,
  };
}

export function addContact(newContact) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_ADD_CONTACT, {
      newContact,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: ADD_CONTACT,
        }),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function updateContact(contact) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_UPDATE_CONTACT, {
      contact,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: UPDATE_CONTACT,
        }),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function removeContact(contactId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_REMOVE_CONTACT, {
      contactId,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: REMOVE_CONTACT,
        }),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function removeContacts(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_REMOVE_CONTACTS, {
      contactIds,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: REMOVE_CONTACTS,
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS,
        }),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function toggleStarredContact(contactId) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_TOGGLE_STARRED_CONTACT, {
      contactId,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_CONTACT,
        }),
        dispatch(getUserData()),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function toggleStarredContacts(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_TOGGLE_STARRED_CONTACTS, {
      contactIds,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: TOGGLE_STARRED_CONTACTS,
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS,
        }),
        dispatch(getUserData()),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function setContactsStarred(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_SET_CONTACTS_STARRED, {
      contactIds,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: SET_CONTACTS_STARRED,
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS,
        }),
        dispatch(getUserData()),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}

export function setContactsUnstarred(contactIds) {
  return (dispatch, getState) => {
    const { routeParams } = getState().contactsApp.contacts;

    const request = axios.post(Contact.POST_SET_CONTACTS_UNSTARRED, {
      contactIds,
    });

    return request.then((response) =>
      Promise.all([
        dispatch({
          type: SET_CONTACTS_STARRED,
        }),
        dispatch({
          type: DESELECT_ALL_CONTACTS,
        }),
        dispatch(getUserData()),
      ]).then(() => dispatch(getContacts(routeParams)))
    );
  };
}
