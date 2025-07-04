export const formatDateWithSuffix = (dateInput: string | Date): string => {
  if (!dateInput || isNaN(new Date(dateInput).getTime())) {
    return "Unknown release date";
  }

  const date = new Date(dateInput);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );

  const getOrdinalSuffix = (n: number): string => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  return `${day}${getOrdinalSuffix(day)} of ${month}`;
};
