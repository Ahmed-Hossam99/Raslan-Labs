import { Module } from '@nestjs/common';
import { PhoneConfirmationService } from './phone-confirmation.service';
import { PhoneConfirmationController } from './phone-confirmation.controller';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    UsersModule
  ],
  controllers: [PhoneConfirmationController],
  providers: [PhoneConfirmationService],
  exports: [PhoneConfirmationService],
})
export class PhoneConfirmationModule {}
