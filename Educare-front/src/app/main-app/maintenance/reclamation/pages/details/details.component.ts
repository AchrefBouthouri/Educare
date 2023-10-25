import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ReclamationComponent } from '../../reclamation.component';
import { ReclamationService } from '../../reclamation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() reclamation?: any;
  //reclamation: any;
  FormGroup: FormGroup = Object.create(null);
  range = new FormGroup({
    start: new FormControl(null),
    end: new FormControl(null),
  });

  constructor(public snackBar: MatSnackBar, private _formBuilder: FormBuilder, private parent: ReclamationComponent, private reclamationService: ReclamationService) { }

  ngOnInit() {
    console.log(this.reclamation.description)
    this.FormGroup = this._formBuilder.group({
      createdAt: new FormControl({ value: this.reclamation.createdAt, disabled: true }),
      updatedAt: new FormControl({ value: this.reclamation.updatedAt, disabled: true }),
      type: new FormControl(),
      priorite: new FormControl(),
      progress: new FormControl(),
      description: new FormControl()
    });
    this.FormGroup.controls['priorite'].setValue(this.reclamation.priorite);
    this.FormGroup.controls['progress'].setValue(this.reclamation.progress);
    this.FormGroup.controls['type'].setValue(this.reclamation.type);
    this.FormGroup.controls['description'].setValue(this.reclamation.description);
  }
  update() {
    const data = {
      createdAt: this.FormGroup.value.createdAt, 
      updatedAt: this.FormGroup.value.updatedAt,
      type: this.FormGroup.value.type,
      priorite: this.FormGroup.value.priorite,
      progress: this.FormGroup.value.progress,
      description: this.FormGroup.value.description,
      date_debut: this.FormGroup.value.start,
      date_fin: this.FormGroup.value.end
    }
    this.reclamationService.UpdateReclamation(this.reclamation.id,data).subscribe(response => {
      console.log("update",response);
      this.openSnackBar("complaint modify","successfully")
      this.parent.tabGroup.selectedIndex = 0;
    })


  }
  cancel() {
    this.parent.tabGroup.selectedIndex = 0;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
