import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UnauthorizedGuard } from 'src/app/shared/guards/unauthorized.guard';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { HttpClientModule } from '@angular/common/http';
import { first } from 'rxjs/operators';

describe('Logged in guard should', () => {
  let unauthorizedGuard: UnauthorizedGuard;
  let store: MockStore;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const initialState = {
    core: {
      isAuth: false
    }
  };

  // async beforeEach
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, CommonModule, HttpClientModule ],
      providers: [
        UnauthorizedGuard,
        provideMockStore({ initialState }),
        { provide: Router, useValue: router }
      ]
    })
      .compileComponents(); // compile template and css
    unauthorizedGuard = TestBed.inject(UnauthorizedGuard);
    store = TestBed.inject(MockStore);
  });

  it('be able to hit route when user is logged in', () => {
    store.setState({
      core: {
        isAuth: true
      }
    });
    expect(unauthorizedGuard.canActivate()).toBe(true);
  });

  it('not be able to hit route when user is not logged in', () => {
    store.setState({
      core: {
        isAuth: false
      }
    });
    expect(unauthorizedGuard.canActivate()).toBe(false);
  });
});
