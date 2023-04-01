export class BannerDto {
  username: string;
  title: string;
  description: string;
  isActive: boolean;

  constructor(
    data: {
      username: string,
      title: string,
      description: string,
      isActive: boolean,
    }
  ) {
    this.username = data.username;
    this.title = data.title;
    this.description = data.description;
    this.isActive = data.isActive;
  }
}
