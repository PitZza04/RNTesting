import {logger} from '#/logger';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTOMATE_STORAGE = 'AUTOMATE_STORAGE';
export async function write(value: {}) {
  await AsyncStorage.setItem(AUTOMATE_STORAGE, JSON.stringify(value));
}

export async function read() {
  const rawData = await AsyncStorage.getItem(AUTOMATE_STORAGE);
  const objData = rawData ? JSON.parse(rawData) : undefined;
  return objData
}

export async function clear() {
  try {
    await AsyncStorage.removeItem(AUTOMATE_STORAGE);
  } catch (error: any) {
    logger.error(`persisted store: failed to clear`, {
      message: error.toString(),
    });
  }
}
