export const timeFromNow = date => {
  let durationsInSeconds = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  let ms = Math.floor((new Date() - new Date(date)) / 1000);
  let types = ['year', 'month', 'day', 'hour', 'minute', 'second'];

  for (let idx = 0; idx < types.length; idx++) {
    let num = Math.floor(ms / durationsInSeconds[types[idx]]);
    if (num >= 1) {
      let type = types[idx];
      if (num > 1) type += 's';
      return `${num} ${type} ago`;
    }
  }
};

// add ... to strings that are too long
export const shortenString = (string, maxLength) => {
  if (string.length > maxLength) {
    let idx = maxLength - 3;
    string = `${string.slice(0, idx)}...`;
  }
  return string;
};