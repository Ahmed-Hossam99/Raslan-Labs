import { Injectable } from '@nestjs/common';
import
  {
    MulterModuleOptions,
    MulterOptionsFactory,
  } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import * as cloudinaryStorage from 'multer-storage-cloudinary';
import * as cloudinary from 'cloudinary';

@Injectable()
export class UploadCloudinary implements MulterOptionsFactory
{
  constructor(private readonly configService: ConfigService) { }
  createMulterOptions(): MulterModuleOptions
  {
    (cloudinary as any).config({
      cloud_name: this.configService.get('cloud_name'),
      api_key: this.configService.get('api_key'),
      api_secret: this.configService.get('api_secret'),
    });
    return {
      storage: cloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          resource_type: 'auto',
        },
      }),
    };
  }
}
