// type for create todo modal
export interface today {
  title: string;
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
  title: string;
};

export type week = {
  id: string;
  day: string;
  isClicked: boolean;
  color: string;
};

export type routineData = {
  category: string;
  content: string;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
};
