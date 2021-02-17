import { format, parseISO  } from "date-fns";

export const formatDateTime = (date) => {
  return format(parseISO(date), "dd MMM yyyy hh:mm aaaa");
};

export const formatDate = (date) => {
  return format(parseISO(date), "dd MMM yyyy");
};

export const formatTime = (date) => {
  return format(parseISO(date), "hh:mm aaaa");
};

export const lightBlue = '#019fd1'
export const darkBlue = '#005392'
export const backgroundGrey = '#e5e5e5'