import { InterfaceSearchableRepository } from '../../shared/domain/repository/repository-interface';
import { SearchParams } from '../../shared/domain/repository/search-params';
import { SearchResult } from '../../shared/domain/repository/search-result';
import { Uuid } from '../../shared/domain/value-objects/uuid.vo';
import { Category } from './category.entity';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICategoryRepository
  extends InterfaceSearchableRepository<
    Category,
    Uuid,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}
