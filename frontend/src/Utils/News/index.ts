export type NewsItem = {
  name: string;
  url: string;
  image: { thumbnail: { contentUrl: string } };
};

export type NewsData = {
  newsItemList: NewsItem[];
  time: string;
};
