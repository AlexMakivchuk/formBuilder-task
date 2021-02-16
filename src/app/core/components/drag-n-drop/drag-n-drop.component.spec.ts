import { TestBed } from '@angular/core/testing';

import { DragNDropComponent } from './drag-n-drop.component';
import { StylesService } from 'src/app/shared/services/styles.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilderService } from 'src/app/shared/services/form-builder.service';

class MockStylesService {

}

class MockFormBuilderService {

}

describe('DragNdropComponent', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        DragNDropComponent,
        Router,
        ChangeDetectorRef,
        Store,
        { provide: FormBuilderService, useClass: MockFormBuilderService },
        { provide: StylesService, useClass: MockStylesService }
      ]
    });
    // inject both the component and the dependent service.
    const comp = TestBed.inject(DragNDropComponent);
    const stylesService = TestBed.inject(StylesService);

    it('should create', () => {
      expect(comp).toBeTruthy();
    });

    it('should not have welcome message after construction', () => {
      expect(comp.builder).toBeUndefined();
    });

  });

});
