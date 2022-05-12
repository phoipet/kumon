import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            create: jest.fn().mockImplementation((body: CreateTaskDto) => body),
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockImplementation((id: string) => ({ id })),
            update: jest
              .fn()
              .mockImplementation((id: string, body: UpdateTaskDto) => ({
                id,
                ...body,
              })),
            remove: jest.fn().mockImplementation((id: string) => ({ id })),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of tasks', async () => {
      expect(await service.findAll()).toStrictEqual([]);
    });
  });

  describe('create', () => {
    it('should be able to create', async () => {
      expect(await controller.create({ title: '' })).toStrictEqual({
        title: '',
      });
    });
  });

  describe('findOne', () => {
    it('should be able to find a single record by its ID', async () => {
      expect(await controller.findOne('1')).toStrictEqual({
        id: 1,
      });
    });
  });

  describe('update', () => {
    it('should be able to update a record', async () => {
      expect(await controller.update('1', { isDone: true })).toStrictEqual({
        id: 1,
        title: '',
        isDone: true,
      });
    });
  });

  describe('remove', () => {
    it('should be able to remove a single record by its ID', async () => {
      expect(await controller.remove('1')).toStrictEqual({
        id: 1,
      });
    });
  });
});
