import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-page',
  standalone: true,
  imports: [NgClass],
  templateUrl: './banner-page.component.html',
  styleUrl: './banner-page.component.scss'
})
export class BannerPageComponent {
  @Input({ required: true }) name_page!: string;
  @Input({ required: true }) background_url!: string;
  @Input({ required: true }) pattern_url!: string;
}
