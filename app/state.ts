import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid';
import type { ContactType, ContactTypeNoID, RandomUser } from './types';
import { myGroups } from './constants';
import { showDialog } from './root';

// Hardcoded users for login
const users = [
  { user: 'roei', password: '123', role: 'admin' },
  { user: 'user', password: '123', role: 'user' },
] satisfies Array<{ user: string, password: string, role: 'admin' | 'user' }>

// Fetch dummy contacts from randomuser.me API
async function dummyDataApi() {
  const res = await (await fetch('https://randomuser.me/api/?results=5')).json() as RandomUser
  const contacts = Array<ContactType>()

  for (let user of res.results) {
    contacts.push({
      name: [user.name.first, user.name.last].join(' '),
      phone: user.cell,
      id: uuidv4(),
      group: myGroups[Math.floor(Math.random() * 3)],
      email: user.email,
      img: user.picture.medium
    })
  }

  return contacts
}

// Zustand store interface definition
interface StateInfo {
  username: string
  loggedIn: boolean
  login: (username: string, password: string) => void

  contacts: Array<ContactType>
  addContact: (user: ContactTypeNoID) => unknown
  removeContact: (id: string) => unknown
  editContact: (id: string, contact: ContactTypeNoID) => unknown
  setContacts: (list: Array<ContactType>) => any

  role: 'admin' | 'user'

  setGroups: (arr: string[]) => void
  groups: string[]
  deleteGroup: (name: string) => void
  addGroup: (name: string) => void

  addToFavorites: (id: string) => void
  removeFromFavorites: (id: string) => void
}

// Store implementation
const theStore: StateCreator<StateInfo> = (set, _get) => {
  return {

    // Toggle favorite on contact
    addToFavorites: (id) =>
      set(state => ({
        contacts: state.contacts.map(x => x.id == id ? { ...x, isFavorite: !x.isFavorite } : x)
      })),

    // Remove from favorites explicitly
    removeFromFavorites: (id) =>
      set(state => ({
        contacts: state.contacts.map(x => x.id == id ? { ...x, isFavorite: false } : x)
      })),

    // Add new group (admin only)
    addGroup: (name) => set(state => {
      if (state.role != 'admin') return ({})
      return ({ groups: Array.from(new Set([...state.groups, name])) })
    }),

    // Delete group and remove it from contacts (admin only)
    deleteGroup: (groupName) => set(state => {
      if (state.role != 'admin') return ({})
      const ind = state.groups.findIndex(x => x == groupName)
      if (ind == -1) return ({})
      const updatedContacts = state.contacts.filter(x => x.group != groupName)
      return {
        groups: state.groups.toSpliced(ind, 1),
        contacts: updatedContacts
      }
    }),

    // Replace group list
    setGroups: (arr) => set(() => ({ groups: [...arr] })),

    // Default groups from constants
    groups: [...myGroups],

    // Default role
    role: 'user',

    // Auth state
    loggedIn: false,
    username: '',

    // Login logic
    login: (username: string, password: string) => set(() => {
      const user = users.find(
        x => x.user.toLocaleLowerCase() == username.toLocaleLowerCase() && x.password == password
      )
      if (!user) throw new Error('bad username or password')
      return {
        role: user.role,
        username: user.user,
        loggedIn: true
      }
    }),

    // Replace contact list
    setContacts: (list) => set(() => ({ contacts: list })),

    contacts: [],

    // Add new contact (admin only)
    addContact: (theContact: ContactTypeNoID) => set(state => {
      if (state.role != 'admin') return ({})

      theContact.phone = theContact.phone.trim()

      // Prevent duplicates
      if (state.contacts.find(x => x.phone == theContact.phone)) {
        showDialog(`already have contact with phone ${theContact.phone}`)
        return ({})
      }

      const c = { ...theContact, id: uuidv4() }
      c.group = c.group || 'No Group'
      return { contacts: [...state.contacts, c] }
    }),

    // Edit contact by ID (admin only)
    editContact: (id, contact) => set(state => {
      if (state.role != 'admin') return ({})
      const index = state.contacts.findIndex(x => x.id == id)
      if (index == -1) return ({})

      const copy = [...state.contacts]
      copy[index] = { ...contact, id }
      return ({ contacts: copy })
    }),

    // Remove contact by ID (admin only)
    removeContact: (id: string) => set(state => {
      if (state.role != 'admin') return ({})
      const index = state.contacts.findIndex(x => x.id == id)
      if (index == -1) return ({})
      return ({ contacts: state.contacts.toSpliced(index, 1) })
    }),
  }
}

// Create Zustand store (no persist used here)
export const useGlobalStore = create(theStore)

// Fetch initial dummy contacts at startup
dummyDataApi().then(c => useGlobalStore.getState().setContacts(c))

// Reset contacts and groups to initial dummy state (admin only)
export function resetContacts() {
  if (useGlobalStore.getState().role != 'admin') return
  dummyDataApi().then(c => useGlobalStore.getState().setContacts(c))
  useGlobalStore.getState().setGroups([...myGroups])
}
