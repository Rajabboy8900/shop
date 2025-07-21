import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Foydalanuvchining elektron pochta manzili',
  })
  @IsEmail({}, { message: "Email manzili to‘g‘ri formatda bo‘lishi kerak!" })
  @IsNotEmpty({ message: "Email kiriting — bu maydon talab qilinadi!" })
  @IsString({ message: "Email faqat matn ko‘rinishida bo‘lishi kerak!" })
  email: string;

  @ApiProperty({
    example: 'MySecurePassword123',
    description: 'Kirish uchun parol',
  })
  @IsString({ message: "Parol matn ko‘rinishida bo‘lishi zarur!" })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lmasligi shart!" })
  password: string;
}
