type projectLink = {
  id: number;
  name: string;
  link: string;
};

type projectLabel = {
  id: number;
  name: string;
};

type imageInfo = {
  id: number;
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
