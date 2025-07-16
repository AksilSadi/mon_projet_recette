import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const path = join(process.cwd(), 'uploads', filename);

    if (!existsSync(path)) {
      throw new NotFoundException('Fichier non trouvé');
    }

    const file = createReadStream(path);
    file.pipe(res);
  }
}
