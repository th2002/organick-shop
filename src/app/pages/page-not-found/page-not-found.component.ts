import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageNotFoundSVGComponent } from '~/components/svg/404/page-not-found-svg.component';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterLink, PageNotFoundSVGComponent],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.scss'
})
export class PageNotFoundComponent {}
