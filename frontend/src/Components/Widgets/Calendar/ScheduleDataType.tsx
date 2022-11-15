import Swal from 'sweetalert2';

export type ScheduleDataType = {
  schedule: {
    id: number;
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
  }[];
};
export function isDateBetweenTwoDates(
  dateBefore: Date,
  dateNext: Date,
  checkDate: Date,
): boolean {
  let answer = false;
  if (
    (dateBefore.getFullYear() < checkDate.getFullYear() ||
      (dateBefore.getFullYear() == checkDate.getFullYear() &&
        (dateBefore.getMonth() < checkDate.getMonth() ||
          (dateBefore.getMonth() == checkDate.getMonth() &&
            dateBefore.getDate() <= checkDate.getDate())))) &&
    (dateNext.getFullYear() > checkDate.getFullYear() ||
      (dateNext.getFullYear() == checkDate.getFullYear() &&
        (dateNext.getMonth() > checkDate.getMonth() ||
          (dateNext.getMonth() == checkDate.getMonth() &&
            dateNext.getDate() >= checkDate.getDate()))))
  ) {
    answer = true;
  }
  return answer;
}
export function timeStringConverToBootstrapTime(oldDate: string): string {
  const newDate = new Date(+oldDate + 3240).toISOString().replace(/\..*/, '');
  return newDate;
}
export function timeDateConverToBootstrapTime(oldDate: Date): string {
  const newDate = new Date(oldDate).toISOString().replace(/\..*/, '');
  return newDate;
}
export function datetimeTimeSettingTo0(date: Date): Date {
  const newDate = new Intl.DateTimeFormat(getCountry()).format(date);
  return new Date(newDate);
}

export function getCountry(): string {
  return 'kr';
}
export function connectionfailed(): void {
  Swal.fire({
    icon: 'error',
    title: 'Do you have an internet connection?',
    text: 'If so, there is a problem with the server.',
  });
}
