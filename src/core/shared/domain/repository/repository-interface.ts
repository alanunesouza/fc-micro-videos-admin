import { Entity } from '../entity';
import { ValueObject } from '../value-object';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export interface InterfaceRepository<
  E extends Entity,
  EntityId extends ValueObject,
> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entity_id: EntityId): Promise<void>;

  findById(entity_id: EntityId): Promise<E | null>;
  findAll(): Promise<E[]>;
  findByIds(ids: EntityId[]): Promise<E[]>;
  existsById(ids: EntityId[]): Promise<{
    exists: EntityId[];
    not_exists: EntityId[];
  }>;

  getEntity(): new (...args: any[]) => E;
}

export interface InterfaceSearchableRepository<
  E extends Entity,
  EntityId extends ValueObject,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult,
> extends InterfaceRepository<E, EntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
