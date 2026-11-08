export type CommunityEvent = {
  /** Unique number, just increase it for each new event. */
  id: number;
  name: string;
  /** Format: YYYY-MM-DD */
  date: string;
};

/**
 * Add, edit or delete events here, then commit and push.
 * Events whose date has passed move to "Past events" automatically.
 */
export const events: CommunityEvent[] = [
  { id: 1, name: "BYD Meetup Nicosia", date: "2026-12-12" },
  { id: 2, name: "Beach Drive Limassol", date: "2027-01-17" },
];
