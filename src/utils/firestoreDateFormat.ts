import type { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export const dateFormat = (timestamp: FirebaseFirestoreTypes.Timestamp) => {
  if (!timestamp) {
    return;
  }

  const date = new Date(timestamp.toDate());

  const day = date.toLocaleDateString("pt-BR");
  const hour = date.toLocaleDateString("pt-BR");

  return `${day} às ${hour}`;
};
