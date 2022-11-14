export type newsItem = {
  name: string;
  url: string;
  image: { thumbnail: { contentUrl: string } };
};

export type newsData = {
  newsItemList: newsItem[];
  time: string;
};
