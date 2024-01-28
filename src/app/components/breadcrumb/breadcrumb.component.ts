import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }
}
