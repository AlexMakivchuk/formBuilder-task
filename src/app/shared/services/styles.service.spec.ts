import { TestBed } from '@angular/core/testing';

import { StylesService } from './styles.service';

describe('StylesService', () => {
  let service: StylesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shuld create object for styles', () => {
    expect(service.createStyleObject({
      width: { value: '450', units: 'px' },
      height: { value: '450', units: 'px' }
    })).toEqual({ width: '450px', height: '450px' });
  });
});
