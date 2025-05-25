export type JobType = {
  id: number;
  slug: string;
  title: string;
  company: string;
  location: string;
  category: string;
  tags: string[];
  description: string;
  postedAt: string;
};

export type JobsResponse = {
  results: JobType[];
  total: number;
  page: number;
  pageSize: number;
};

export type Filter = {
  slug: string;
  label_en: string;
  label_el: string;
};

export type JobFilters = {
  locations: Filter[];
  categories: Filter[];
};
