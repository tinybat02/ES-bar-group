import { Frame } from './../types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export const processData = (series: Frame[]) => {
  const result: Array<{ [key: string]: any }> = series[0].fields[1].values.buffer.map(time_num => ({
    timestamp: dayjs(time_num)
      .tz('Europe/Berlin')
      .format('HH:mm'),
  }));

  const store_list: string[] = [];
  series.map(store => {
    const store_name = store.name || 'dummy';
    store_list.push(store_name);
    store.fields[0].values.buffer.map((value, idx) => {
      //loop
      result[idx][store_name] = value;
    });
  });

  return { data: result, keys: store_list };
};
