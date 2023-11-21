import { Controller, Get, Param, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { join } from 'path';

@Controller('uploads')
export class FileController {

    @Get(':filename')
    serveFile(@Param('filename') fileName: string, @Res() res: Response, @Req() req: Request) {
        const filePath = join(__dirname, '../../..', 'uploads', fileName);
        return res.sendFile(filePath);
    }
}
