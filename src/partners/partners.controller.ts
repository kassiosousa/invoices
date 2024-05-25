import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnerDto } from './dto/partner.dto';

@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  async create(@Body() createPartnerDto: PartnerDto) {
    try {
      const partnerCreated =
        await this.partnersService.create(createPartnerDto);
      return partnerCreated;
    } catch (error) {
      throw new BadRequestException('can not create a partner', error);
    }
  }

  // @Post('partner-project')
  // async createPartnerProject(
  //   @Body() createPartnerProject: { partnerId: number; projectId: number },
  // ) {
  //   await this.partnersService.createPartnerProject(createPartnerProject);
  // }

  @Get()
  async findAll() {
    try {
      const partnersAll = await this.partnersService.findAll();
      return partnersAll;
    } catch (error) {
      throw new BadRequestException('can not create a partner');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnersService.remove(+id);
  }
}
