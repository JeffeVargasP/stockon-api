import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateCardDto } from './dto/update-card-dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(): object {
    return this.cardService.findAll();
  }

  @Get(':cardId')
  @UseGuards(JwtAuthGuard)
  findCardById(@Param('cardId') cardId: string): object {
    return this.cardService.findCardsById(cardId);
  }

  @Get('user/id/:userId')
  @UseGuards(JwtAuthGuard)
  findCardByUserId(@Param('userId') userId: string): object {
    return this.cardService.findCardsByUserId(userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCardDto: CreateCardDto,): object {
    return this.cardService.create(createCardDto);
  }

  @Patch(':cardId')
  @UseGuards(JwtAuthGuard)
  update(@Param('cardId') cardId: string, @Body() updateCardDto: UpdateCardDto): object {
    return this.cardService.update(cardId, updateCardDto);
  }

  @Delete(':cardId')
  @UseGuards(JwtAuthGuard)
  remove(@Param('cardId') cardId: number): object {
    return this.cardService.remove(cardId);
  }
}
