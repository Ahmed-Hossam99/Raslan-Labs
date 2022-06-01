import { HttpException, Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import * as crypto from 'crypto';
import * as mime from 'mime';
import * as multer from 'multer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadLocal implements MulterOptionsFactory {
  //   public options: any = 'local';
  constructor(private readonly configService: ConfigService) {}
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './upload');
        },
        filename: (req, file, cb) => {
          console.log(this.configService.get<string>('api_key'));
          crypto.pseudoRandomBytes(16, (err, raw) => {
            if (err) {
              throw new HttpException('error in upload', 500);
            }
            const fileName =
              raw.toString('hex') +
              Date.now() +
              '.' +
              mime.extension(file.mimetype);
            cb(null, fileName);
          });
        },
      }),
    };
  }
}
