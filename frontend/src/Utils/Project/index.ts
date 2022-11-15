export type projectLink = {
  id?: number;
  name: string;
  url: string;
};

type projectLabel = {
  id?: number;
  name: string;
};

type imageInfo = {
  id?: number;
  originName: string;
  imageUrl: string;
};

export type project = {
  id: number;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  projectLinks: projectLink[];
  projectLabels: projectLabel[];
  imageInfo: imageInfo;
};

export type link = {
  name: string;
  url: string;
};
export type inputs = {
  title: string;
  content: string;
  labels: string[];
  links: projectLink[];
  startDate: Date | string;
  endDate: Date | string;
};
