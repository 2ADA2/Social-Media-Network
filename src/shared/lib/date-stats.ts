const DAY = 24 * 60 * 60 * 1000;
const PERIOD_DAYS = 30;

export interface MonthStats {
  current: number;
  previous: number;
  percents: number;
}

export const countByMonth = (
  dates: string[],
  now: Date = new Date(),
): MonthStats => {
  const nowTime = now.getTime();
  const currentStart = nowTime - PERIOD_DAYS * DAY;
  const previousStart = nowTime - 2 * PERIOD_DAYS * DAY;

  let current = 0;
  let previous = 0;

  for (const dateStr of dates) {
    const time = new Date(dateStr).getTime();

    if (time >= currentStart && time <= nowTime) {
      current++;
    } else if (time >= previousStart && time < currentStart) {
      previous++;
    }
  }

  let percents;

  if (previous === 0) {
    percents = current > 0 ? 100 : 0;
  } else {
    percents = ((current - previous) / previous) * 100;
  }

  percents = Math.round(percents);

  return {
    current,
    previous,
    percents,
  };
};
