// Age in whole years on the given day, from a birth date written as YYYY-MM-DD.
export function computeAge(birthDate: string, today: Date): number {
  const [year, month, day] = birthDate.split("-").map(Number) as [number, number, number];
  let age = today.getFullYear() - year;
  const hasHadBirthday =
    today.getMonth() + 1 > month || (today.getMonth() + 1 === month && today.getDate() >= day);
  if (!hasHadBirthday) {
    age -= 1;
  }
  return age;
}

// Fills the "{age}" placeholder of a content line with the age on the given day.
export function fillAge(template: string, birthDate: string, today: Date): string {
  return template.replace("{age}", String(computeAge(birthDate, today)));
}
