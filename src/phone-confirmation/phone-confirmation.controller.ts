import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PhoneConfirmationService } from './phone-confirmation.service';
import { CreatePhoneConfirmationDto } from './dto/create-phone-confirmation.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UsersService } from 'src/users/users.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';
import { User, UserDocument } from 'src/users/models/_user.model';
import { FilterQuery } from 'mongoose';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserRepository } from 'src/users/users.repository';

@ApiBearerAuth()
@ApiTags('PHONE-CONFIRMATION')
@Controller('phone-confirmation')
export class PhoneConfirmationController {
  constructor(
    private readonly phoneConfirmationService: PhoneConfirmationService,
    private readonly userRepository: UserRepository,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post()
  async sendSMS(
    @Body() createPhoneConfirmationDto: CreatePhoneConfirmationDto,
  ): Promise<VerificationInstance> {
    return await this.phoneConfirmationService.sendSMS(
      createPhoneConfirmationDto,
    );
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('verify')
  async verificationCode(
    @Body() verifyData: VerifyPhoneDto,
  ): Promise<UserDocument> {
    await this.phoneConfirmationService.verificationCode(verifyData);
    return await this.userRepository.updateOne(
      { phone: verifyData.phone } as FilterQuery<UserDocument>,
      { enabled: true } as UpdateUserDto,
    );
  }
}
