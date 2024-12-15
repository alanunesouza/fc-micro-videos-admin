import { CastMember } from '../../../domain/cast-member.entity';

import { CastMemberTypes } from '../../../domain/cast-member-type.vo';

export type CastMemberOutput = {
  id: string;
  name: string;
  type: CastMemberTypes;
  created_at: Date;
};

export class CastMemberOutputMapper {
  static toOutput(entity: CastMember): CastMemberOutput {
    const { cast_member_id, ...other_props } = entity.toJSON();
    return {
      id: cast_member_id,
      ...other_props,
    };
  }
}
