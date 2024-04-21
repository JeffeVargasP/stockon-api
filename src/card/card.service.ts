import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCardDto } from './dto/create-card-dto';
import multer from 'multer';
import { UserService } from 'src/user/user.service';
import { UpdateCardDto } from './dto/update-card-dto';

@Injectable()
export class CardService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService) { }

  async findAll(): Promise<object> {
    const cards = await this.prismaService.card.findMany();

    return {
      cards,
    };
  }

  async findCardsById(cardId: string): Promise<object> {
    const cards = await this.prismaService.card.findFirst({
      where: {
        id: parseInt(cardId),
      },
    })

    if (!cards) {
      return {
        message: 'Card not found',
      }
    }

    return {
      cards,
    };
  }

  async findCardsByUserId(userId: string): Promise<object> {
    const cards = await this.prismaService.card.findMany({
      where: {
        userId: userId,
      },
    });

    if (!cards || cards.length == 0) {
      return { message: 'This user has no cards' }
    }

    return {
      cards,
    };
  }

  async create(createCardDto: CreateCardDto): Promise<object> {

    if (!createCardDto) {
      return {
        message: 'Card data is required',
      }
    }

    const user = await this.userService.findOne(createCardDto.userId);

    if (createCardDto.state != 'Finished' && createCardDto.state != 'InUse' && createCardDto.state != 'Stock' && createCardDto.state != 'ShoppingList') {
      return {
        message: 'Invalid state',
      }
    }

    const newCard = this.prismaService.card.create({
      data: createCardDto,
    });

    return newCard;

  }

  async update(cardId: string, updateCardDto: UpdateCardDto): Promise<object> {

    const card = await this.prismaService.card.findFirst({
      where: {
        id: parseInt(cardId),
      },
    });

    if (!card) {
      return {
        message: 'Card not found',
      }
    }

    await this.prismaService.card.update({
      where: {
        id: parseInt(cardId),
      },
      data: updateCardDto,
    });

    return {
      message: 'Card updated',
      name: updateCardDto.name,
    }

  }

  async remove(cardId: number): Promise<object> {

    const card = await this.prismaService.card.findFirst({
      where: {
        id: cardId,
      },
    });

    if (!card) {
      return {
        message: 'Card not found',
      }
    }

    await this.prismaService.card.delete({
      where: {
        id: cardId,
      },
    });

    return {
      message: 'Card deleted',
      name: card.name,
    }

  }
}
