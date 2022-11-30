// type for create todo modal
export interface Today {
  title: string;
  category: string;
}

export interface Routine extends Today {
  day: Array<string>;
}

export interface CreateTodo {
  routine: Routine;
  today: Today;
}

export type LocalToday = {
  id: number;
  category: string;
  title: string;
};

export type Week = {
  id: string;
  day: string;
  isClicked: boolean;
  color: string;
};

export type RoutineData = {
  todoId?: number;
  category: string;
  content: string;
  isCompleted?: boolean;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
};

export type RoutineFilterBar = {
  handleCategory: (clicked: string) => void;
  clicked?: string;
};

export type LocalRoutine = {
  id: number;
  isCompleted: boolean;
};
