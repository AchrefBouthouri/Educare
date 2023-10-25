export class Room {
  id!: any;
  roomNumber!: any;
  roomType!: RoomType;
  description!: any;
  surface!: any;
  price!: any;
}

export enum RoomType {
  STUDENT_M = 'STUDENT_M',
  STUDENT_F = 'STUDENT_F',
  PROFESSOR_M = 'PROFESSOR_M',
  PROFESSOR_F = 'PROFESSOR_F'
}
