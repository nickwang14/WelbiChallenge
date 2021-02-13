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