export function formatAMPM(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes}${ampm}`;
}

export function commaStringToArray(value) {
  return value.split(",").map(item => item.trim());
}

export function getFormattedDate(date) {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return `${month}/${day}/${year}`;
}

export const formatTimeStr = time => {
  const hour = parseInt(time, 10);
  let min = time - hour;
  if (hour === 23 && min > 0.5) {
    return "Midnight";
  }
  if (min !== 0 || min !== 0.5) {
    min = (Math.round(min * 2) / 2).toFixed(1);
  }
  const timeStr =
    hour >= 12
      ? `${hour - 12 || 12}${min === 0.5 ? ":30" : ""}pm`
      : `${hour || 12}${min === 0.5 ? ":30" : ""}am`;

  return timeStr;
};
