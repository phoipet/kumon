import { LoggerService as ILoggerService } from '@nestjs/common';
import { logger } from 'firebase-functions';

export class LoggerService implements ILoggerService {
  public log(message: any, ...optionalParams: any[]) {
    logger.log(message, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]) {
    logger.error(message, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]) {
    logger.warn(message, ...optionalParams);
  }

  public debug(message: any, ...optionalParams: any[]) {
    logger.debug(message, ...optionalParams);
  }
}
