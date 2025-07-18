import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEYS = {
  SELECTED_EXAMS: "selectedExams",
  FIRST_LAUNCH: "firstLaunch",
} as const;

export const saveSelectedExams = async (examIds: string[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEYS.SELECTED_EXAMS,
      JSON.stringify(examIds)
    );
  } catch (error) {
    console.error("Error saving selected exams:", error);
  }
};

export const getSelectedExams = async (): Promise<string[]> => {
  try {
    const savedExams = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_EXAMS);
    if (savedExams) {
      return JSON.parse(savedExams);
    }
    // İlk açılışta TYT varsayılan olarak seçili
    return ["tyt"];
  } catch (error) {
    console.error("Error loading selected exams:", error);
    return ["tyt"];
  }
};

export const isFirstLaunch = async (): Promise<boolean> => {
  try {
    const firstLaunch = await AsyncStorage.getItem(STORAGE_KEYS.FIRST_LAUNCH);
    return firstLaunch === null;
  } catch (error) {
    console.error("Error checking first launch:", error);
    return true;
  }
};

export const setFirstLaunchCompleted = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.FIRST_LAUNCH, "false");
  } catch (error) {
    console.error("Error setting first launch completed:", error);
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing all data:", error);
  }
};
