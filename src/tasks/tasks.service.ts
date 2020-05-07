import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
const { v1: uuidv1 } = require('uuid');

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks():Task[] {
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }
}
