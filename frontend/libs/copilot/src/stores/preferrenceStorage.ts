import { StateStorage } from "zustand/middleware"
//import { get, set, del } from 'idb-keyval' // can use anything: IndexedDB, Ionic Storage, etc.
import { Platform } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO this is a demo using indexdb but need to refactor to look at
// expo async storage for web and secure storage for app.
// Custom storage object
const PreferrenceStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // return (await get(name)) || null;

    if (Platform.OS === 'web') {
      try {
        if (typeof localStorage !== 'undefined') {
          return localStorage.getItem(name);
        }
      } catch (error) {
        console.error('Local storage is unavailable:', error);
      }
    } else {
      return await AsyncStorage.getItem(name).then(value => {
        return value;
      });
    }

    return null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (value === null) {
          localStorage.removeItem(name);
        } else {
          localStorage.setItem(name, value as string);
        }
      } catch (error) {
        console.error('Local storage is unavailable:', error);
      }
    } else {
      if (value == null) {
        await AsyncStorage.removeItem(name);
      } else {
        await AsyncStorage.setItem(name, value);
      }
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        localStorage.removeItem(name);
      } catch (error) {
        console.error('Local storage is unavailable:', error);
      }
    } else {
        await AsyncStorage.removeItem(name);
    }
  },
}

export default PreferrenceStorage;


