import React from 'react';
export type ScheduleDataType = {
  selectedDate?: Date;
  schedule: {
    color: number;
    title: string;
    content: string;
    startDate: string;
    endDate: string;
  }[];
};
