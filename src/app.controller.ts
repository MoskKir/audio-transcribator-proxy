import {
  Get,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post("transcribation")
  // @UseInterceptors(FileInterceptor("file"))
  // async uploadAudio(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new HttpException("File not found", HttpStatus.BAD_REQUEST);
  //   }

  //   try {
  //     const response = await this.appService.getAudioTranscribation(file);
  //     return response;
  //   } catch (error) {
  //     throw new HttpException(
  //       "Error sending audio to Whisper server",
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  @Post("transcribation")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileAndForward(@UploadedFile() file: Express.Multer.File) {
    // Теперь file.buffer содержит содержимое файла
    // const fileContent = file.buffer.toString('utf-8'); // Преобразование буфера в строку
    const fileContent = file.buffer; // Преобразование буфера в строку
    const audioBlob = new Blob([fileContent])

    console.log('fileContent: ', fileContent);

    const formData = new FormData();
    // formData.append('file', audioBlob, {
    //   filename: "bububu file name",
    //   contentType: file.mimetype,
    // });
    formData.append('file', audioBlob);

    try {
      // return "Ok"
      const response = await fetch('http://localhost:5008/transcribe', {
        method: 'POST',
        body: formData,
        headers: { Accept: "application/json" },
        // headers: formData.getHeaders(),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error forwarding file to API B:', error);
      throw error;
    }

    // Дальнейшая обработка файла
    return {
      message: 'File received and processed',
      filename: file.originalname,
      content: fileContent,
    };
  }

}
