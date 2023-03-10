export interface MovieItemInterface {
  title: string;
  thumnailSmall: string;
  thumnailMedium: string;
  thumnailLarge: string;
  thumbnail: {
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
  isTrending: false;
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
