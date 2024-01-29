import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-oder-list',
  standalone: true,
  imports: [ButtonModule, TableModule],
  templateUrl: './oder-list.component.html',
  styleUrl: './oder-list.component.scss'
})
export class OderListComponent {
  customers = [
    {
      Name: 'James Butt',
      Country: 'Algeria',
      Company: 'Benton, John B Jr',
      Representative: 'Ioni Bowcher'
    },
    {
      Name: 'Josephine Darakjy',
      Country: 'Egypt',
      Company: 'Chanay, Jeffrey A Esq',
      Representative: 'Amy Elsner'
    },
    {
      Name: 'Art Venere',
      Country: 'Panama',
      Company: 'Chemel, James L Cpa',
      Representative: 'Asiya Javayant'
    },
    {
      Name: 'Lenna Paprocki',
      Country: 'Slovenia',
      Company: 'Feltz Printing Service',
      Representative: 'Xuxue Feng'
    },
    {
      Name: 'Donette Foller',
      Country: 'South Africa',
      Company: 'Printing Dimensions',
      Representative: 'Asiya Javayant'
    },
    {
      Name: 'Simona Morasca',
      Country: 'Egypt',
      Company: 'Chapman, Ross E Esq',
      Representative: 'Ivan Magalhaes'
    },
    {
      Name: 'Mitsue Tollner',
      Country: 'Paraguay',
      Company: 'Morlong Associates',
      Representative: 'Ivan Magalhaes'
    },
    {
      Name: 'Leota Dilliard',
      Country: 'Serbia',
      Company: 'Commercial Press',
      Representative: 'Onyama Limba'
    },
    {
      Name: 'Sage Wieser',
      Country: 'Egypt',
      Company: 'Truhlar And Truhlar Attys',
      Representative: 'Ivan Magalhaes'
    },
    {
      Name: 'Kris Marrier',
      Country: 'Mexico',
      Company: 'King, Christopher A Esq',
      Representative: 'Onyama Limba'
    }
  ];
}
