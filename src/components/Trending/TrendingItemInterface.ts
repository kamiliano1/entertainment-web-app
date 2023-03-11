export interface TrendingItemInterface {
  title: string;
  thumnailSmall: string;
  thumnailLarge: string;
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookMarked: boolean;
  isTrending: true;
  isHovered?: boolean;
}
// [
//     {
//       "title": "Beyond Earth",
//       "thumbnail": {
//         "trending": {
//           "small": "./assets/thumbnails/beyond-earth/trending/small.jpg",
//           "large": "./assets/thumbnails/beyond-earth/trending/large.jpg"
//         },
//         "regular": {
//           "small": "./assets/thumbnails/beyond-earth/regular/small.jpg",
//           "medium": "./assets/thumbnails/beyond-earth/regular/medium.jpg",
//           "large": "./assets/thumbnails/beyond-earth/regular/large.jpg"
//         }
//       },
//       "year": 2019,
//       "category": "Movie",
//       "rating": "PG",
//       "isBookmarked": false,
//       "isTrending": true
//     },
export interface MoviesInterface {
  title: string;
  thumnailSmall: string;
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
  isTrending: true;
  isHovered?: boolean;
}
