import type { ApexOptions } from "apexcharts";

const monthsLabels: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', '05': 'May', '06': 'Jun',
  '07': 'Jul', '08': 'Aug', '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
};

const getMonthName = (dateStr?: string): string => {
  if (!dateStr) {
    return '';
  }
  const monthNum = dateStr.split('.')[1];
  return monthsLabels[monthNum] || '';
};

export const buildOptions = (
  categories: string[],
  theme: 'light' | 'dark',
): ApexOptions => {

  const firstMonth = getMonthName(categories[0]);
  const lastMonth = getMonthName(categories.at(-1));

  return {
    chart: {
      toolbar: { show: false },
      background: 'transparent',
    },
    colors: ["var(--chart-primary)"],
    plotOptions: {
      bar: {
        columnWidth: '80%',
        borderRadius: 4,
      },
    },
    stroke: {
      curve: 'straight',
      width: 3,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      borderColor: 'var(--chart-primary)',
      padding: {
        right: 30,
      },
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--color-muted)',
        },
        formatter: function (value) {
          if (!value) {
            return '';
          }

          return String(value).substring(0, 2); // Displays only the day (e.g., '01')
        },
      },
    },
    yaxis: {
      tickAmount: 5,
      min: 0,
      max: (maxValue) => {
        return Math.max(10, maxValue * 1.5);
      },
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
        },
        style: {
          colors: 'var(--color-muted)',
        },
      },
    },
    dataLabels: { enabled: false },
    theme: { mode: theme },
    annotations: {
      xaxis: [
        {
          x: categories[0],
          borderColor: 'transparent',
          label: {
            text: firstMonth,
            position: 'bottom',
            orientation: 'horizontal',
            offsetY: 26,
            offsetX: -30,
            borderWidth:0,
            style: { color: 'var(--color-muted)', fontSize: '12px', fontWeight: 'bold', background:"none" },
          },
        },
        {
          x: categories.at(-1),
          borderColor: 'transparent',
          label: {
            text: lastMonth,
            position: 'bottom',
            orientation: 'horizontal',
            offsetY: 26,
            offsetX: 30,
            borderWidth:0,
            style: { color: 'var(--color-muted)', fontSize: '12px', fontWeight: 'bold', background:"none" },
          },
        },
      ],
    },
  };
};
