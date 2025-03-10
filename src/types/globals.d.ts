declare global {
  interface Task {
    id: string,
    description: string,
    isDone: boolean,
    createdAt: string,
    onToggle?: () => void,
    onRemove?: () => void,
  }
}

export {};