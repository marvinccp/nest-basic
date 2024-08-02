import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async createClient(client: CreateClientDto) {
    try {
      const clientCreated = await this.prisma.client.create({ data: client });
      return clientCreated;
    } catch (error) {
      throw error;
    }
  }

  getClients() {
    return this.prisma.client.findMany({
      include: { projects: true },
    });
  }

  findOne(id: string) {
    return this.prisma.client.findUnique({
      where: { id },
    });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: string) {
    const clientToDelete = await this.findOne(id);
    if (!clientToDelete) {
      throw new NotFoundException(`client with ID ${id} not found`);
    }
    await this.prisma.client.delete({
      where: { id },
    });
    return { message: `Client with ID ${id} was deleted` };
  }
}
