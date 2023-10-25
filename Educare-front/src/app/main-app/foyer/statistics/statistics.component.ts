import { Component, OnInit } from '@angular/core';
import { BookingService } from "../get-all-booking/booking.service";
import { ChartItem } from 'chart.js';
// import { Chart, LinearScale, CategoryScale, BarController } from 'chart.js';
Chart.register(LinearScale, CategoryScale, BarController);
import { Chart, LinearScale, CategoryScale } from 'chart.js';
import { BarController, BarElement, LinearScale as BarLinearScale, CategoryScale as BarCategoryScale } from 'chart.js';

Chart.register(LinearScale, CategoryScale, BarController, BarElement, BarLinearScale, BarCategoryScale);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  startDate: string = '';
  endDate: string = '';
  statistics: any;

  constructor(private bookingService: BookingService) { }

  ngOnInit(): void {
    // Set default start and end dates to the current month
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    this.startDate = new Date(`${year}-${month}-01`).toISOString().substr(0, 10);
    this.endDate = new Date(`${year}-${month}-${new Date(year, month, 0).getDate()}`).toISOString().substr(0, 10);

    this.getStatistics();
  }

  getStatistics(): void {
    this.bookingService.getStatistics(this.startDate, this.endDate)
      .subscribe(statistics => {
        this.statistics = statistics;
        this.renderCharts();
      });
  }

  renderCharts(): void {
    const ctx = document.getElementById('numBookingsPerRoomChart');
    if (ctx) {
      const chart = new Chart(ctx as ChartItem, { // cast to ChartItem
        type: 'bar', // Use the 'bar' chart type here
        data: {
          labels: ['slim.derouich.8b7@gmail.com', 'slim.derouich.8b7@gmail.com', 'slim.derouich.8b7@gmail.com', 'slim.derouiche@esprit.tn', 'slim.derouich.8b7@gmail.com', 'slim.derouiche@esprit.tn'],
          datasets: [{
            label: '# of Bookings',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
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
    }
  }
  // renderCharts(): void {
  //   const ctx = document.getElementById('numBookingsPerRoomChart');
  //   if (ctx && this.statistics.rooms) {
  //     const chart = new Chart(ctx as ChartItem, { // cast to ChartItem
  //       type: 'bar', // Use the 'bar' chart type here
  //       data: {
  //         labels: this.statistics.rooms.map((foyer: any) => foyer.name),
  //         datasets: [{
  //           label: '# of Bookings',
  //           data: this.statistics.rooms.map((foyer: any) => foyer.numBookings),
  //           backgroundColor: [
  //             'rgba(255, 99, 132, 0.2)',
  //             'rgba(54, 162, 235, 0.2)',
  //             'rgba(255, 206, 86, 0.2)',
  //             'rgba(75, 192, 192, 0.2)',
  //             'rgba(153, 102, 255, 0.2)',
  //             'rgba(255, 159, 64, 0.2)'
  //           ],
  //           borderColor: [
  //             'rgba(255, 99, 132, 1)',
  //             'rgba(54, 162, 235, 1)',
  //             'rgba(255, 206, 86, 1)',
  //             'rgba(75, 192, 192, 1)',
  //             'rgba(153, 102, 255, 1)',
  //             'rgba(255, 159, 64, 1)'
  //           ],
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         scales: {
  //           y: {
  //             beginAtZero: true
  //           }
  //         }
  //       }
  //     });
  //   }
  // }

}
