interface PageInfo {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

interface Link {
  href: string;
}

interface Links {
  self: Link;
  update?: Link;
  delete?: Link;
}

export interface PaginatedResponse<T, K extends string> {
  _embedded: {
    [key in K]: (T & { _links: Links })[];
  };
  _links: {
    self: Link;
  };
  page: PageInfo;
}
