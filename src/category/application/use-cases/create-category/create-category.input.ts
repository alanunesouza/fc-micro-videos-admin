import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export type CreateCategoryInputConstructorProps = {
  name: string;
  description?: string | null;
  is_active?: boolean;
}

export class CreateCategoryInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  constructor(props: CreateCategoryInputConstructorProps) {
    if (!props) return;
    
    Object.assign(this, props);
  }
}