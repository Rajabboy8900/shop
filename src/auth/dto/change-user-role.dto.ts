import { IsEnum, IsOptional } from 'class-validator';
import { Role } from '../role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthRoleDto {
  @ApiProperty({ example: "admin" })
  @IsOptional()
  @IsEnum(Role, { message: "Noto‘g‘ri role qiymati!" })
  role: Role;
}
