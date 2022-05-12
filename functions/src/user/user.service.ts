import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/task/entities/task.entity';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.insert(createUserDto);

    return createUserDto;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);

    return updateUserDto;
  }

  async remove(id: number) {
    await this.userRepository.delete(id);

    return {
      id,
    };
  }

  async getTasksOfUser(id: number): Promise<Task[]> {
    const user: User = await this.userRepository.findOne({
      where: { id: id },
      relations: ['tasks'],
    });
    return user.tasks;
  }
}
