import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import Chart from 'chart.js/auto';



interface MealStats {
  [mealName: string]: number;
}
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  stat: MealStats = {};
  sortedStats: [string, number][] = [];




  constructor(private orderservice: OrderService) {}

  ngOnInit(): void {
    this.orderservice.statisticmeal().subscribe(
      mealNames => {
        this.stat = mealNames.reduce((stats: any, mealName) => {
          if (stats[mealName]) {
            stats[mealName]++;
          } else {
            stats[mealName] = 1;
          }
          return stats;
        }, {});

        this.sortedStats = Object.entries(this.stat)
          .sort((a, b) => b[1] - a[1]);

        const mealChart = new Chart('mealChart', {
          type: 'bar',
          data: {
            labels: this.sortedStats.map(stat => stat[0]),
            datasets: [{
              label: 'Orders',
              data: this.sortedStats.map(stat => stat[1]),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

      },

    );
  }}
