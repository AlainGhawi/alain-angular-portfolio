import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { CvComponent } from './cv/cv.component';
import { SafePipe } from './pipes/safe.pipe';

import { RevealDirective } from './directives/reveal.directive';
import { CursorComponent } from './cursor/cursor.component';
import { NavComponent } from './nav/nav.component';
import { HeroComponent } from './hero/hero.component';
import { MarqueeComponent } from './marquee/marquee.component';
import { ClientsComponent } from './clients/clients.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { OpenSourceComponent } from './open-source/open-source.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { CtaComponent } from './cta/cta.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ContactComponent,
        FooterComponent,
        CvComponent,
        SafePipe,
        RevealDirective,
        CursorComponent,
        NavComponent,
        HeroComponent,
        MarqueeComponent,
        ClientsComponent,
        AboutComponent,
        ProjectsComponent,
        OpenSourceComponent,
        TestimonialsComponent,
        CtaComponent,
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
