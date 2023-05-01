export class AboutDto {
  id: number;
  description: string;
  skills: string[];
  photo: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.id;
    this.description = data.description;
    this.skills = data.skills;
    this.photo = data.photo;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
