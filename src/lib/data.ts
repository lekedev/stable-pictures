export type ServiceGroup = {
  id: string;
  name: string;
  line: string;
  items: [name: string, description: string][];
};

export const GROUPS: ServiceGroup[] = [
  {
    id: "capture",
    name: "Capture",
    line: "The stills and spatial assets every listing is built on.",
    items: [
      ["Architectural photography", "Lines held straight, light balanced, every room composed for the listing."],
      ["Twilight images", "The exterior at blue hour with windows glowing. The image that stops the scroll."],
      ["Drone film", "Aerial approach, plot and neighbourhood context in 4K."],
      // ["Floor plan", "Measured, labelled plans that make the layout clear before a viewing."],
      ["3D tour", "A walk-through in the browser, at any hour, from any phone."],
    ],
  },
  {
    id: "story",
    name: "Story",
    line: "Film that shows how the property feels to live in.",
    items: [
      ["Cinematic walkthrough", "Slow, stabilised movement through the property, set to music."],
      ["60-second property story", "The full narrative: location, design, lifestyle and a clear call to action."],
      ["Agent presenter video", "Your agent on camera, scripted and lit, guiding the viewer through."],
    ],
  },
  {
    id: "social",
    name: "Social",
    line: "Cuts built for the feed, Stories and WhatsApp.",
    items: [
      ["30-second Instagram Reel", "Fast, paced to sound and made to be watched with the volume off."],
      ["Vertical video", "Shot and framed 9:16 for Stories, TikTok and WhatsApp Status."],
      ["Social media cutdowns", "The main film re-cut into short clips for weeks of posting."],
    ],
  },
  {
    id: "launch",
    name: "Launch",
    line: "Everything ready for the day the listing goes live.",
    items: [
      ["Teaser campaign", "A short run of clips that builds interest before the listing appears."],
      ["Launch-day content", "Photos, films and captions ready to publish the hour you go live."],
      ["Website assets", "Hero video, gallery and images sized and compressed for your site."],
    ],
  },
];

export const ALL_SERVICES = GROUPS.flatMap((g) => g.items.map((i) => i[0]));

const ESS = ["Architectural photography", "Twilight images", "Floor plan"];
const SIG_ADD = ["Cinematic walkthrough", "Drone film", "30-second Instagram Reel"];
const FULL_ADD = [
  "3D tour",
  "60-second property story",
  "Agent presenter video",
  "Social media cutdowns",
  "Vertical video",
  "Teaser campaign",
  "Launch-day content",
  "Website assets",
];

export type Pkg = {
  id: string;
  price: string;
  turn: string;
  turnLong: string;
  blurb: string;
  adds: string[];
  inherit: string | null;
  set: string[];
  highlight?: boolean;
};

// Sample prices in GBP. Replace with real rates.
export const PACKAGES: Pkg[] = [
  {
    id: "Essentials",
    price: "£450",
    turn: "48 hours",
    turnLong: "Delivered in 48 hours",
    blurb: "For a property that is ready to list.",
    adds: ESS,
    inherit: null,
    set: ESS,
  },
  {
    id: "Signature",
    price: "£1,250",
    turn: "5 working days",
    turnLong: "Delivered in 5 working days",
    blurb: "For a listing that needs film to stand out.",
    adds: SIG_ADD,
    inherit: "Everything in Essentials, plus",
    set: [...ESS, ...SIG_ADD],
    highlight: true,
  },
  {
    id: "Full Launch",
    price: "£2,950",
    turn: "10 working days",
    turnLong: "Delivered in 10 working days",
    blurb: "For developments and launches that need every channel covered.",
    adds: FULL_ADD,
    inherit: "Everything in Signature, plus",
    set: ALL_SERVICES,
  },
];

export const PROPERTY_TYPES = ["House", "Flat or apartment", "Development or estate", "Commercial space", "Land"];
export const BUDGETS = ["Under £500", "£500 to £1,500", "£1,500 to £3,500", "Above £3,500", "Not sure yet"];

export const QUESTIONS = [
  { q: "Where is the property right now?", o: ["Ready to list this week", "Launching within the next month", "Off-plan, or a multi-unit development"] },
  { q: "Where will most buyers first see it?", o: ["Rightmove, Zoopla and agent listings", "Instagram and WhatsApp", "Everywhere, including our own website"] },
  { q: "How soon do you need the content?", o: ["Within a few days", "Within two weeks", "A launch date is already planned"] },
];

export const REASONS: Record<string, string> = {
  Essentials: "Photography, twilight images and a floor plan cover a listing that needs to look right and go live fast.",
  Signature: "Add a cinematic walkthrough, drone film and a Reel so the listing carries video on the portals and on Instagram.",
  "Full Launch": "A launch needs every channel ready at once: teaser, launch-day content, 3D tour, website assets and cutdowns.",
};

// Edit these as real availability changes.
export const SLOTS = { left: 4, total: 10, month: "October" };
