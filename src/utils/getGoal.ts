import {
  addDays,
  addMonths,
  addYears,
  differenceInMilliseconds,
  differenceInYears,
} from 'date-fns';

export const getGoal = (date: Date) => {
  const timeDiff = differenceInMilliseconds(new Date(), date);
  let goalType: GoalType;

  if (timeDiff < 86400000) {
    goalType = GoalType.Day;
  } else if (timeDiff < 604800000) {
    goalType = GoalType.Week;
  } else if (timeDiff < 2592000000) {
    goalType = GoalType.Month;
  } else if (timeDiff < 15552000000) {
    goalType = GoalType.HalfYear;
  } else {
    goalType = GoalType.Year;
  }

  let goalAt = new Date(date);

  switch (goalType) {
    case GoalType.Day:
      goalAt = addDays(goalAt, 1);
      break;
    case GoalType.Week:
      goalAt = addDays(goalAt, 7);
      break;
    case GoalType.Month:
      goalAt = addMonths(goalAt, 1);
      break;
    case GoalType.HalfYear:
      goalAt = addMonths(goalAt, 6);
      break;
    case GoalType.Year:
      goalAt = addYears(goalAt, differenceInYears(new Date(), date) + 1);
      break;
  }

  return { goalAt, goalType };
};

export enum GoalType {
  Day = 'day',
  Week = 'week',
  Month = 'month',
  HalfYear = 'half-year',
  Year = 'year',
}
