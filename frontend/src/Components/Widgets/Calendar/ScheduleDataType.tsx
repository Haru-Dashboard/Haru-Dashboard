import React from 'react';
export type ScheduleDataType = {
  selectedDate?: Date;
  schedule: {
    id: number;
    color: number;
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
  }[];
};
export function DateBetween(date1: Date, date2: Date, date3: Date) {
  let answer = false;
  if (
    date1.getFullYear() < date2.getFullYear() ||
    (date1.getFullYear() == date2.getFullYear() &&
      (date1.getMonth() < date2.getMonth() ||
        (date1.getMonth() == date2.getMonth() &&
          date1.getDate() <= date2.getDate())) &&
      date3.getFullYear() > date2.getFullYear()) ||
    (date3.getFullYear() == date2.getFullYear() &&
      (date3.getMonth() > date2.getMonth() ||
        (date3.getMonth() == date2.getMonth() &&
          date3.getDate() >= date2.getDate())))
  ) {
    answer = true;
  }
  return answer;
}
