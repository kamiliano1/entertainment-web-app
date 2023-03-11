export interface MoviesInterface {
  title: string;
  thumnailSmall: string;
  thumnailMedium?: string;
  thumnailLarge: string;
  thumbnail: {
    trending?: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookMarked: boolean;
  isTrending: boolean;
  isHovered?: boolean;
}
