// type for create todo modal
export interface today {
  content: string;
  category: string;
}

export interface routine extends today {
  day: Array<string>;
}

export interface createTodo {
  routine: routine;
  today: today;
}

export type localToday = {
  id: number;
  category: string;
  content: string;
};
