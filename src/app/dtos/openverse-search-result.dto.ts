export interface OpenverseSearchResultDto {
  results: Result[];
}

export interface Result {
  id: string;
  height: number;
  width: number;
  title: string;
  url: string;
  creator: string;
  creator_url: string;
  tags: Tag[];
  license: string;
  license_url: string;
  license_version: string;
}

interface Tag {
  name: string;
}
