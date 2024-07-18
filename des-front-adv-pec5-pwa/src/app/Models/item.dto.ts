export class ProfileImageDTO {
  small!: string;
  medium!: string;
  large!: string;
}

export class LinksDTO {
  self!: string;
  html!: string;
  photos!: string;
  likes!: string;
  portfolio!: string;
}

export class UrlsDTO {
  raw!: string;
  full!: string;
  regular!: string;
  small!: string;
  thumb!: string;
  small_s3!: string;
}

export class UserDTO {
  id!: string;
  username!: string;
  name!: string;
  portfolio_url!: string;
  bio!: string;
  location!: string;
  total_likes!: number;
  total_photos!: number;
  total_collections!: number;
  instagram_username!: string;
  twitter_username!: string;
  profile_image!: ProfileImageDTO;
  links!: LinksDTO;
}

export class SponsorDTO {
  username!: string;
  links!: LinksDTO;
}

export class SponsorshipDTO {
  tagline!: string;
  sponsor!: SponsorDTO;
}

export class ItemDTO {
  id!: string;
  description!: string;
  alt_description!: string;
  url!: string;
  username!: string;
  user_link!: string;
  updated_at!: Date;
  likes!: number;

  constructor(
    id: string = "",
    description: string = "",
    alt_description: string = "",
    url: string = "",
    username: string = "",
    user_link: string = "",
    updated_at: Date = new Date(2000, 0, 1),
    likes: number = 0
  ) {
    this.id = id;
    this.description = description;
    this.alt_description = alt_description;
    this.url = url;
    this.username = username;
    this.user_link = user_link;
    this.updated_at = updated_at;
    this.likes = likes;
  }

  static from(item: ItemRawDTO): ItemDTO {
    return new ItemDTO(
      item.id,
      item.alt_description,
      item.alt_description,
      item.urls.raw,
      item.sponsorship?.sponsor.username,
      item.sponsorship?.sponsor.links.html
    );
  }

  static fromItems(items: ItemRawDTO[]): ItemDTO[] {
    return items.map((item) => this.from(item));
  }
}

export class ItemRawDTO {
  id!: string;
  created_at!: string;
  updated_at!: string;
  width!: number;
  height!: number;
  color!: string;
  blur_hash!: string;
  likes!: number;
  liked_by_user!: boolean;
  description!: string;
  alt_description!: string;
  user!: UserDTO;
  urls!: UrlsDTO;
  sponsorship!: SponsorshipDTO;

  constructor(
    id: string = "",
    created_at: string = "",
    updated_at: string = "",
    width: number = 0,
    height: number = 0,
    color: string = "",
    blur_hash: string = "",
    likes: number = 0,
    liked_by_user: boolean = false,
    description: string = "",
    alt_description: string = "",
    user: UserDTO,
    urls: UrlsDTO,
    sponsorship: SponsorshipDTO
  ) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.width = width;
    this.height = height;
    this.color = color;
    this.blur_hash = blur_hash;
    this.likes = likes;
    this.liked_by_user = liked_by_user;
    this.description = description;
    this.user = user;
    this.urls = urls;
    this.sponsorship = sponsorship;
  }
}
