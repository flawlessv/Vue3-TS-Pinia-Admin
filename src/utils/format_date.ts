import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// 传入日期转为月日
export function formatUTC(
  utcString: string,
  format: string = "YYYY-MM-DD HH:mm:ss"
) {
  return dayjs.utc(utcString).utcOffset(8).format(format);
}
