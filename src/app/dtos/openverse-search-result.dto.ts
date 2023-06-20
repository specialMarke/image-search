export interface OpenverseSearchResultDto {
  results: ResultDto[];
}

export interface ResultDto {
  id: string;
  height: number;
  width: number;
  title: string;
  url: string;
  creator: string;
  creator_url: string;
  tags: TagDto[];
  license: string;
  license_url: string;
  license_version: string;
}

interface TagDto {
  name: string;
}
