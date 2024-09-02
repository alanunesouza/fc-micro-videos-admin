import { InterfaceRepository } from "../../shared/domain/repository/repository-interface";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { Category } from "./category.entity";

export interface CategoryRespository extends InterfaceRepository<Category, Uuid> {}