import { inject, TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { User } from 'src/app/shared/models/user';
import { HttpErrorResponse } from '@angular/common/http';

describe('UserService', () => {
  const mockNewUser: User = {
    email: 'aasa@aa.aa',
    name: 'aasaa',
    surname: 'sasasa',
    password: 'aaaaaa',
    agree: true
  };

  const mockUser = {
    email: 'aasa@aa.aa',
    password: 'aaaaaa',
  };

  const mockToken = 'askjnfkwndqwendlwneflwemflwmflwmflkwemeflznsxcuiwujk';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ UserService ],
      imports: [ HttpClientTestingModule ]
    });
  });

  it('should be created', inject([ UserService ], (service: UserService) => {
    expect(service).toBeTruthy();
  }));

  it('#createNewUser return token', inject(
    [ UserService, HttpTestingController ],
    (service: UserService, backend: HttpTestingController) => {

      service.createNewUser(mockNewUser).subscribe(token => {
          expect(token).toEqual(mockToken);
        }
      );

      backend.expectOne(
        (req) => req.body === mockNewUser
      ).flush({ accessToken: mockToken });

    }));

  it('#userLogin return token', inject(
    [ UserService, HttpTestingController ],
    (service: UserService, backend: HttpTestingController) => {

      const url = 'http://localhost:3000/login';

      service.userLogin(mockUser).subscribe(token => {
        expect(token).toEqual(mockToken);
      });

      backend.expectOne(
        (req) => JSON.stringify(req.body) === JSON.stringify(mockUser) && req.url === url
      ).flush({ accessToken: mockToken });
    }));

  it('#createNewUser with error', inject(
    [ UserService, HttpTestingController ],
    (userService: UserService, backend: HttpTestingController) => {
      const emsg = '500 error Bad Gateway';
      userService.createNewUser(mockNewUser).subscribe(
        () => fail('should fail with 502 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(502, 'status');
          expect(error.error).toEqual(emsg, 'message');
        });

      backend.expectOne(req => req.body !== {}).flush(
        emsg, { status: 502, statusText: 'Bad Gateway'});
      backend.verify();
    })
  );

  it('#userLogin with error', inject(
    [ UserService, HttpTestingController ],
    (userService: UserService, backend: HttpTestingController) => {
      const emsg = '500 error Bad Gateway';
      userService.userLogin(mockUser).subscribe(
        () => fail('should fail with 502 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(502, 'status');
          expect(error.error).toEqual(emsg, 'message');
        });

      backend.expectOne(req => req.body !== {}).flush(
        emsg, { status: 502, statusText: 'Bad Gateway'});
      backend.verify();
    })
  );

});
