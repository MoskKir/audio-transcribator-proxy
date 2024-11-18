import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Module({
  imports: [MulterModule.register({
    storage: memoryStorage(),
  })],

  // imports: [
  //   MulterModule.register({
  //     storage: diskStorage({
  //       destination: (req, file, cb) => {
  //         cb(null, uploadDir);
  //       },
  //       filename: (req, file, cb) => {
  //         const ext = extname(file.originalname);
  //         const filename = `${Date.now()}${ext}`;
  //         cb(null, filename);
  //       },
  //     }),
  //     fileFilter: (req, file, cb) => {
  //       if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  //         cb(null, true);
  //       } else {
  //         cb(new Error('Only images are allowed...'), false);
  //       }
  //     },
  //   }),
  // ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
