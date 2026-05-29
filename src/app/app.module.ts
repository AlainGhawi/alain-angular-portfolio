import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CvComponent } from './cv/cv.component';
import { SafePipe } from './pipes/safe.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        ServiceComponent,
        HeaderComponent,
        FooterComponent,
        PortfolioComponent,
        CvComponent,
        SafePipe,
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        TranslateModule.forRoot()
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideTranslateHttpLoader({
            prefix: './assets/i18n/',
            suffix: '.json'
        }),
        provideClientHydration(withEventReplay())
    ]
})
export class AppModule { }
