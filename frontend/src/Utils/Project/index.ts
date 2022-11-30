export type ProjectLink = {
  id?: number;
  name: string;
  url: string;
};

type ProjectLabel = {
  id?: number;
  name: string;
};

type ImageInfo = {
  id?: number;
  originName: string;
  imageUrl: string;
};

export type Project = {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  projectLinks: ProjectLink[];
  projectLabels: ProjectLabel[];
  imageInfo: ImageInfo;
};

export type Link = {
  name: string;
  url: string;
};
export type Inputs = {
  title: string;
  content: string;
  labels: string[];
  links: ProjectLink[];
  startDate: Date | string;
  endDate: Date | string;
};
