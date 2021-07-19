export interface EventDataInterface {
  eventName: string;
  screen: string;
  user: string;
  platform?: string;
  params?: { [key: string]: unknown };
  create: Date;
}
