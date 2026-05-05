export type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  price?: number;
  overview?: string;
  cast?: string[];
  release_date?: string;
};

const movies: Movie[] = [
  {
    id: 1,
    title: "Star Wars: Episode I - The Phantom Menace",
    poster_path: "/assets/episode1.jpg",
    price: 19.95,
    overview:
      "Two Jedi Knights discover a young boy who may bring balance to the Force.",
    cast: ["Liam Neeson", "Ewan McGregor", "Natalie Portman", "Jake Lloyd"],
    release_date: "1999-05-19"
  },
  {
    id: 2,
    title: "Star Wars: Episode II - Attack of the Clones",
    poster_path: "/assets/episode2.jpg",
    price: 39.95,
    overview:
      "Anakin Skywalker and Padmé Amidala fall in love while a new threat rises.",
    cast: ["Hayden Christensen", "Natalie Portman", "Ewan McGregor"],
    release_date: "2002-05-16"
  },
  {
    id: 3,
    title: "Star Wars: Episode III - Revenge of the Sith",
    poster_path: "/assets/episode3.jpg",
    price: 9.95,
    overview:
      "Anakin Skywalker becomes Darth Vader as the Republic falls.",
    cast: ["Hayden Christensen", "Ewan McGregor", "Natalie Portman"],
    release_date: "2005-05-19"
  },
  {
    id: 4,
    title: "Star Wars: Episode IV - A New Hope",
    poster_path: "/assets/episode4.jpg",
    price: 14.95,
    overview:
      "Luke Skywalker begins his journey to become a Jedi and fight the Empire.",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    release_date: "1977-05-25"
  },
  {
    id: 5,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    poster_path: "/assets/episode5.jpg",
    price: 29.95,
    overview:
      "The Empire pursues the Rebels while Luke trains with Yoda.",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    release_date: "1980-05-21"
  },
  {
    id: 6,
    title: "Star Wars: Episode VI - Return of the Jedi",
    poster_path: "/assets/episode6.jpg",
    price: 24.95,
    overview:
      "The Rebels launch a final attack on the Empire while Luke confronts Vader.",
    cast: ["Mark Hamill", "Harrison Ford", "Carrie Fisher"],
    release_date: "1983-05-25"
  },
  {
    id: 7,
    title: "Rogue One: A Star Wars Story",
    poster_path: "/assets/rogue-one.jpg",
    price: 29.95,
    overview:
      "A group of rebels attempt to steal the Death Star plans.",
    cast: ["Felicity Jones", "Diego Luna", "Ben Mendelsohn"],
    release_date: "2016-12-16"
  },
  {
    id: 8,
    title: "Solo: A Star Wars Story",
    poster_path: "/assets/solo.jpg",
    price: 29.95,
    overview:
      "Young Han Solo meets Chewbacca and Lando Calrissian on an early adventure.",
    cast: ["Alden Ehrenreich", "Donald Glover", "Emilia Clarke"],
    release_date: "2018-05-25"
  }
];

export default movies;
