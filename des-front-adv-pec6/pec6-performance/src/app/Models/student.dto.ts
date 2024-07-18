export class StudentDTO {
  id?: number;
  name?: string;
  surname?: string;
  gender?: string;
  mark?: number;
  absences?: number;

  constructor(
    name: string,
    surname: string,
    gender: string,
    mark: number,
    absences: number
  ) {
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.mark = mark;
    this.absences = absences;
  }
}
