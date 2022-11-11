export type ScheduleDataType = {
  selectedDate?: Date;
  schedule: {
    id: number;
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
export function TimeInsertT(date: string) {
  let newDate =
    date[0] +
    date[1] +
    date[2] +
    date[3] +
    '-' +
    date[5] +
    date[6] +
    '-' +
    date[8] +
    date[9] +
    'T' +
    date[11] +
    date[12] +
    ':' +
    date[14] +
    date[15] +
    '';

  return newDate;
}
