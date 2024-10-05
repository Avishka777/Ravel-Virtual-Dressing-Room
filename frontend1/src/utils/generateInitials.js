import _ from "lodash";

export const getInitials = (name) => {
  name = _.upperCase(name);
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) return names[0].charAt(0);
  return names[0].charAt(0) + names[names.length - 1].charAt(0);
};
