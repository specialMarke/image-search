import {
  OpenverseSearchResultDto,
  ResultDto,
} from '../dtos/openverse-search-result.dto';
import { SearchResult } from '../models/search-result';

export class SearchResultMapper {
  static toSingle(dto: ResultDto): SearchResult {
    return {
      id: dto.id,
      creator: dto.creator,
      creator_url: dto.creator_url,
      height: dto.height,
      width: dto.width,
      license: dto.license,
      license_url: dto.license_url,
      license_version: dto.license_version,
      tags: dto.tags.map((tag) => tag.name),
      url: dto.url,
      title: dto.title,
    };
  }

  static toMultiple(dto: OpenverseSearchResultDto): SearchResult[] {
    const hasNoResults = dto.results.length === 0;

    if (hasNoResults) return [];

    return dto.results.map((result) => {
      return this.toSingle(result);
    });
  }
}
