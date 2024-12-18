import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    const value = 10;
    service.log("logger message",value);
    expect(console.log).toBeDefined();
  });

  it('should log message with console.log', () => {
    const logSpy= spyOn(console, 'log');
    const message = "Please log this msg";
    const value = 10;
    service.log(message,value);
    expect(logSpy).toHaveBeenCalledWith(message, value);
  });

  it('should log message with console.warn', () => {
    const logSpy= spyOn(console, 'warn');
    const message = "Please warn this msg";
    const value = 10;
    service.warn(message,value)
    expect(logSpy).toHaveBeenCalledWith(message, value);
  });

  it('should log message with console.error', () => {
    const logSpy= spyOn(console, 'error');
    const message = "Please error this msg";
    const value = 10;
    service.error(message,value);
    expect(logSpy).toHaveBeenCalledWith(message, value);
  });

  it('should log message with console.debug', () => {
    const logSpy= spyOn(console, 'debug');
    const message = "Please debug this msg";
    const value = 10;
    service.debug(message,value);
    expect(logSpy).toHaveBeenCalledWith(message, value);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});