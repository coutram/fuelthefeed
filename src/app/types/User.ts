export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  walletId: string;
  twitterHandle: string;
  role: string;
  interests: string[];
  popularTweets: { id: string; text: string; likes: number }[];
  // Add other user fields as needed
};


export function getName(user: { firstName?: string; lastName?: string }) {
  return [user.firstName, user.lastName].filter(Boolean).join(' ');
}