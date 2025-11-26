import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components/components.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Highlight } from './directives/highlight';
import { CurrencyFormatPipe } from './pipes/currency-format-pipe';
import { HighlightDirective } from './directives/highlight.directive';
import { CurrencyFormatPipePipe } from './pipes/currency-format.pipe';



@NgModule({
  declarations: [
    ComponentsComponent,
    NavbarComponent,
    SidebarComponent,
    Highlight,
    CurrencyFormatPipe,
    HighlightDirective,
    CurrencyFormatPipePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
