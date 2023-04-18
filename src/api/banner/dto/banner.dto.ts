export class BannerDto {
  id: number;
  username: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    data: {
      id: number,
      username: string,
      title: string,
      description: string,
      isActive: boolean,
      createdAt: Date,
      updatedAt: Date,
    }
  ) {
    this.id = data.id;
    this.username = data.username;
    this.title = data.title;
    this.description = data.description;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

