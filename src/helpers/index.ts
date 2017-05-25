export const timeFromNow = (date: string) : string => {
  let durationsInSeconds: object = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1
  };

  let ms: number = Math.floor((Number(new Date()) - Number(new Date(date))) / 1000);
  let types: string[] = ['year', 'month', 'day', 'hour', 'minute', 'second'];

  for (let idx = 0; idx < types.length; idx++) {
    let num: number = Math.floor(ms / durationsInSeconds[types[idx]]);
    if (num >= 1) {
      let type: string = types[idx];
      if (num > 1) type += 's';
      return `${num} ${type} ago`;
    }
  }

  return 'Just now';
};

export const shortenString = (string: string, maxLength: number) : string => {
  if (string.length > maxLength) {
    let idx: number = maxLength - 3;
    string = `${string.slice(0, idx)}...`;
  }
  return string;
};

export const capitalize = (string: string) : string => {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export const searchParams = (query: string, category: string) => {
  let sort_by = "Posting Date";
  let polarity = -1;
  let page_idx = 1;

  return {query, category, sort_by, polarity, page_idx};
};

export const getCategory = (location) => {
  let category = location.pathname.slice(1);

  if (category === "recent") {
      category = "All";
  } else {
    if (category === "lostandfound") {
      category = "Lost & Found";
    } else if (category === "coursematerial") {
      category = "Course Material";
    } else {
      category = capitalize(category);
    }
  }

  return category;
}