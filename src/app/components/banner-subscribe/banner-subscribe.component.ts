import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-banner-subscribe',
  standalone: true,
  imports: [InputTextModule, ButtonModule],
  templateUrl: './banner-subscribe.component.html',
  styleUrl: './banner-subscribe.component.scss'
})
export class BannerSubscribeComponent {}
