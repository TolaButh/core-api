import { Controller, Get } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common/rmq/rmq.service';

@Controller()
export class WorkerController {
  constructor(private readonly workerService: WorkerService,
    private readonly rmqService: RmqService,
  ) { }

  @Get()
  getHello() {
    return this.workerService.serviceUpdate();
  }

  @EventPattern('placeOrder')
  placeOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    this.rmqService.ack(context);
    return this.workerService.placeOrder(data);
  }
}
