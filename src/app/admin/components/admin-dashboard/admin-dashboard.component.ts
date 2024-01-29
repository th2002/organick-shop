import { Component } from '@angular/core';
import { StatsComponent } from '@admin/components/stats/stats.component';
import { RevenueChartComponent } from '@admin/components/revenue-chart/revenue-chart.component';
import { OderListComponent } from '@admin/components/oder-list/oder-list.component';
import { OderChartComponent } from '@admin/components/oder-chart/oder-chart.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    StatsComponent,
    RevenueChartComponent,
    OderListComponent,
    OderChartComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {}
