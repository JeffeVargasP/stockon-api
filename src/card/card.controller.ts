import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dtos/create-card-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getUserCards(): object {
    return this.cardService.getUserCards();
  }

  @Get(':cardId')
  getCardById(): object {
    return this.cardService.getCardById();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('thumb', {
      dest: './uploads',
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './uploads');
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  )
  createCard(
    @UploadedFile() file: Express.Multer.File,
    @Body() CreateCardDto,
    @Body('email') email: string,
  ): object {
    return this.cardService.createCard(email, file, CreateCardDto);
  }

  @Patch(':cardId')
  updateCard(): object {
    return this.cardService.updateCard();
  }

  @Delete(':cardId')
  deleteCard(): object {
    return this.cardService.deleteCard();
  }
}
