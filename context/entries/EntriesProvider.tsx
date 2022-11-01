import { FC, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

import { EntriesContext, entriesReducer } from "./";
import { Entry } from "../../interfaces/entry";

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description:
        "Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas consequuntur atque, corrupti blanditiis, dolor laborum molestias nobis cum sunt magni aliquid maiores quis laboriosam, quasi porro! Fuga sapiente deleniti dolor?",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas consequuntur atque, corrupti blanditiis, dolor laborum molestias nobis cum sunt magni aliquid maiores quis laboriosam, quasi porro! Fuga sapiente deleniti dolor?",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuidv4(),
      description:
        "En progreso: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas consequuntur atque, corrupti blanditiis, dolor laborum molestias nobis cum sunt magni aliquid maiores quis laboriosam, quasi porro! Fuga sapiente deleniti dolor?",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuidv4(),
      description:
        "Terminada: Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas consequuntur atque, corrupti blanditiis, dolor laborum molestias nobis cum sunt magni aliquid maiores quis laboriosam, quasi porro! Fuga sapiente deleniti dolor?",
      status: "finished",
      createdAt: Date.now() - 10000,
    },
  ],
};

interface Props {
  children?: React.ReactNode | undefined;
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createdAt: Date.now(),
      status: "pending",
    };

    dispatch({ type: "[Entry] - AddEntry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] - UpdatedEntry", payload: entry });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        //Methods
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
