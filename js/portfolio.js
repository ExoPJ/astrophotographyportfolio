/*
 * Portfolio data. To add a new image:
 *   1. Put the image file in the /images folder.
 *   2. Copy one of the entries below and fill in the details.
 * Any field in `facts` or `capture` can be added, removed or renamed;
 * leave `capture` empty ({}) to hide that section.
 */
const PORTFOLIO = [
  {
    id: "m33",
    image: "images/m33.webp",
    title: "Triangulum Galaxy",
    catalog: "M33 · NGC 598",
    category: "Galaxy",
    type: "Spiral galaxy",
    description:
      "The Triangulum Galaxy is the third-largest member of the Local Group, after the Andromeda Galaxy and our own Milky Way. " +
      "Seen almost face-on, its loose, flocculent spiral arms are dotted with pink star-forming regions and blue clusters of young, hot stars. " +
      "Among them is NGC 604, one of the largest known H II regions, roughly 40 times the size of the Orion Nebula. " +
      "Under very dark skies M33 is one of the most distant objects visible to the naked eye.",
    facts: {
      Constellation: "Triangulum",
      Distance: "~2.7 million light-years",
      Diameter: "~60,000 light-years",
      "Apparent magnitude": "5.7",
      "Apparent size": "70.8′ × 41.7′",
      "Right ascension": "01h 33m 51s",
      Declination: "+30° 39′ 37″",
      Discovered: "Before 1654, Giovanni Battista Hodierna",
    },
    capture: {
      // Fill these in with your own details, e.g.
      // Telescope: "",
      // Camera: "",
      // Mount: "",
      // Filters: "",
      // "Total integration": "",
      // Location: "",
      // Date: "",
    },
  },
];
