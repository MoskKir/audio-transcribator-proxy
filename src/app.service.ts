import { Injectable } from '@nestjs/common';
import fetch from "node-fetch";

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // Old version
  // async getAudioTranscribation(file: Express.Multer.File) {
  //   const formData = new FormData();
  //   formData.append("file", file.buffer, file.originalname);

  //   return fetch(`http://localhost:5008/transcribe`, {
  //     method: "POST",
  //     headers: { Accept: "application/json" },
  //     body: formData,
  //   })
  //     .then((result) => {
  //       return result.json();
  //     })
  //     .catch(console.log);
  // }

}
