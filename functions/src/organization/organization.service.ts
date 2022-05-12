import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    await this.organizationRepository.insert(createOrganizationDto);
    return CreateOrganizationDto;
  }

  findAll(): Promise<Organization[]> {
    return this.organizationRepository.find();
  }

  findOne(id: number) {
    return this.organizationRepository.findOne(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    await this.organizationRepository.update(id, updateOrganizationDto);
    return updateOrganizationDto;
  }

  async remove(id: number) {
    await this.organizationRepository.delete(id);
    return {
      id,
    };
  }

  async getUsersOfOrganization(id: number): Promise<User[]> {
    const organization: Organization =
      await this.organizationRepository.findOne({
        where: { id: id },
        relations: ['users'],
      });
    return organization.users;
  }
}
