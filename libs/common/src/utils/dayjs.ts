import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const dayjsTz = (date? : Date) => date ? dayjs(date).tz(TIME_ZONE_TH): dayjs().tz(TIME_ZONE_TH);
export const TH_DATE = 'DD/MM/YYYY';
export const TH_DATE_TIME = 'DD/MM/YYYY HH:mm:ss';
const TIME_ZONE_TH = 'Asia/Bangkok';
dayjs().tz(TIME_ZONE_TH).toDate();