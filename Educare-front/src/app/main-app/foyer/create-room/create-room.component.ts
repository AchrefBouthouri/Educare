import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Room, RoomType } from '../get-all-rooms/room';
import {RoomService} from '../get-all-rooms/room.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  roomTypes = Object.values(RoomType);
  roomForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomNumber: ['', Validators.required],
      roomType: ['', Validators.required],
      description: ['', Validators.required],
      surface: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const room: Room = {
      id: null,
      roomNumber: this.roomForm.get('roomNumber')?.value,
      roomType: this.roomForm.get('roomType')?.value,
      description: this.roomForm.get('description')?.value,
      surface: this.roomForm.get('surface')?.value,
      price: this.roomForm.get('price')?.value
    };
    this.roomService.createRoom(room).subscribe(() => {
      this.router.navigate(['/rooms']);
    });
  }
}
