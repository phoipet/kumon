import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { Like, Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    await this.taskRepository.insert(createTaskDto);

    return createTaskDto;
  }

  findAll() {
    return this.taskRepository.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.taskRepository.findOne(id);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);

    return updateTaskDto;
  }

  async remove(id: number) {
    await this.taskRepository.delete(id);

    return {
      id,
    };
  }

  async getTasksByFilter(query: string) {
    const task: Task = await this.taskRepository.findOne({
      where: { title: Like(`%${query}%`) },
    });
    return task;
  }
}
