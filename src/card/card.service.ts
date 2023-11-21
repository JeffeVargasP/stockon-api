import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateCardDto } from './dtos/create-card-dto';
import multer from 'multer';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CardService {
  constructor(private readonly prismaService: PrismaService, private readonly userService: UserService) {}

  getUserCards(): object {
    const cards = this.prismaService.card.findMany({
      include: {
        user: true,
      },
    });

    return cards;
  }

  getCardById(): object {
    return {
      status: 'ok!',
    };
  }

  async createCard(email: string, file: any, data: CreateCardDto): Promise<object> {

    const user = await this.userService.findUserByEmail(email);

    const newCard = this.prismaService.card.create({
        data: {
            name: data.name,
            thumb: file.path,
            brand: data.brand,
            color: data.color,
            model: data.model,
            validity: data.validity,
            amount: data.amount,
            weight: data.weight,
            state: data.state,
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    });

    return newCard;

  }

  updateCard(): object {
    return {
      status: 'ok!',
    };
  }

  deleteCard(): object {
    return {
      status: 'ok!',
    };
  }
}
