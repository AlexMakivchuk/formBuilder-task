import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from 'src/app/app.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { environment } from 'src/environments/environment';
import { reducers } from 'src/app/core/reducers';
import { AuthModule } from 'src/app/auth/auth.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { CoreEffects } from 'src/app/core/effects';
import { AuthInterceptor } from 'src/app/shared/interceptors/auth-interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    AuthModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ CoreEffects ]),
    HttpClientModule
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
