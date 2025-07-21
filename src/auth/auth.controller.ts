import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Res,
    Req,
    Put,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { Request, Response } from 'express';
  
  import { AuthService } from './auth.service';
  import { CreateAuthDto } from './dto/create-auth.dto';
  import { ConfirmOtpDto } from './dto/confirm-otp.dto';
  import { SendResetDto } from './dto/request-password-reset.dto';
  import { ResetPasswordDto } from './dto/recover-password.dto';
  import { UpdateAuthRoleDto } from './dto/change-user-role.dto';
  
  import { Roles } from 'src/common/decorators/roles.decorator';
  import { Role } from './role.enum';
  import { AuthGuard } from '@nestjs/passport';
  import { RolesGuard } from 'src/common/guards/roles.guard';
  
  @ApiTags('Auth')
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('register')
    @ApiOperation({ summary: 'Foydalanuvchini ro‘yxatdan o‘tkazish' })
    @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
    @ApiResponse({ status: 409, description: 'Email allaqachon ro‘yxatda bor' })
    async register(@Body() dto: CreateAuthDto) {
      await this.authService.register(dto);
      return { message: 'Tasdiqlash kodi emailingizga yuborildi!' };
    }
  
    @Post('verify_otp')
    @ApiOperation({ summary: 'OTP orqali emailni tasdiqlash' })
    @ApiResponse({ status: 200, description: 'Email tasdiqlandi' })
    async verifyOtp(@Body() dto: ConfirmOtpDto) {
      await this.authService.verifyOtp(dto.email, dto.otp);
      return { message: 'Email tasdiqlandi!' };
    }
  
    @Post('login')
    @ApiOperation({ summary: 'Tizimga kirish' })
    @ApiResponse({ status: 200, description: 'Kirish muvaffaqiyatli' })
    async login(
      @Body() dto: CreateAuthDto,
      @Res({ passthrough: true }) res: Response,
    ) {
      return this.authService.login(dto, res);
    }
  
    @Post('refresh')
    @ApiOperation({ summary: 'Tokenni yangilash' })
    async refresh(@Req() req: Request) {
      return this.authService.refreshToken(req);
    }
  
    @Post('logout')
    @ApiOperation({ summary: 'Tizimdan chiqish' })
    async logout(@Res({ passthrough: true }) res: Response) {
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        path: '/',
      });
      return { message: 'Tizimdan chiqdingiz' };
    }
  
    @Get('all')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.SUPERADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish (SuperAdmin)' })
    async getAllUsers() {
      return this.authService.getAllUsers();
    }
  
    @Put(':id/role')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.SUPERADMIN)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Foydalanuvchining rolini yangilash' })
    async updateUserRole(
      @Param('id') id: string,
      @Body() dto: UpdateAuthRoleDto,
    ) {
      return this.authService.updateUserRole(id, dto);
    }
  
    @Post('forgot_password')
    @ApiOperation({ summary: 'Parol tiklash uchun kod yuborish' })
    async sendResetCode(@Body() dto: SendResetDto) {
      return this.authService.sendResetCode(dto);
    }
  
    @Post('reset_password')
    @ApiOperation({ summary: 'Parolni tiklash' })
    async resetPassword(@Body() dto: ResetPasswordDto) {
      return this.authService.resetPassword(dto);
    }
  }
  