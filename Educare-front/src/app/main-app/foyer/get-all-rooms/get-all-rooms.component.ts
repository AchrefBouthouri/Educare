import { Component, OnInit } from '@angular/core';
import { Room, RoomType } from '../get-all-rooms/room';
import {RoomService} from "./room.service";
import {DeleteRoomComponent} from "../delete-room/delete-room.component";
import { MatDialog } from '@angular/material/dialog';
import { CreateBookingComponent } from '../create-booking/create-booking.component';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-get-all-rooms',
  templateUrl: './get-all-rooms.component.html',
  styleUrls: ['./get-all-rooms.component.css']
})
export class GetAllRoomsComponent implements OnInit {
  rooms: Room[] = [];
  roomTypes = Object.values(RoomType);
  selectedRoom: Room | undefined;
  filteredRooms: Room[] = [];
  searchTerm: string = '';
  searchOption: string = '';
  constructor(private roomService: RoomService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms().subscribe((rooms) => {
      this.rooms = rooms;
      this.filteredRooms = rooms; // store all rooms in a separate array
    });
  }
  updateRoom(roomNumber: string, room: Room): void {
    this.roomService.updateRoom(roomNumber, room).subscribe(() => {
      this.getRooms();
    });
  }
  onSelect(room: Room): void {
    this.selectedRoom = room;
  }
  filterRooms(): void {
    if (!this.searchTerm) {
      this.filteredRooms = this.rooms;
    } else {
      switch (this.searchOption) {
        case 'roomNumber':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.roomNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'roomType':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.roomType.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'description':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.description.toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'surface':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.surface.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        case 'price':
          this.filteredRooms = this.rooms.filter((room: Room) =>
            room.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
          break;
        default:
          this.filteredRooms = this.rooms;
          break;
      }
    }
  }  createBooking(roomId: number): void {
    this.router.navigate(['/createBooking', roomId]);
  }
  openBookingForm(room: Room): void {
    console.log('Room ID:', room.id); // add this line
    const dialogRef = this.dialog.open(CreateBookingComponent, {
      width: '500px',
      height: '600px',
      data: {roomId: room.id}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getRooms();
    });
    dialogRef.componentInstance.booking.roomId = room.id; // add this line to set the value

  }

}
