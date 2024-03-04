import { createContext, Dispatch, SetStateAction } from "react";
import { Item } from "./App";

type RecordEditContextType = {
  editingItem: Item | null;
  setEditingItem: Dispatch<SetStateAction<Item | null>>;
};

export const RecordEditContext = createContext<RecordEditContextType>({
  editingItem: null,
  setEditingItem: () => {},
});
