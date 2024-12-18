import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { KendoModule } from './modules/kendo/kendo.module';
import { MainPageModule } from './components/main-page/main-page.module';
import { SharedModule } from './shared/shared.module';
import { DataExplorerModule } from './components/features/data-explorer/data-explorer.module';
import { CookieService } from 'ngx-cookie-service';
import { IdpModule } from './components/features/create-idp/idp.module';
import { RequestAccessModule } from './components/features/request-access/request-access.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MainPageModule, KendoModule, SharedModule,  IdpModule, DataExplorerModule, RequestAccessModule],
  providers:[CookieService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GIP';
}
