import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReclamationComponent } from '../../reclamation.component';
import { ReclamationService } from '../../reclamation.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  
  
})
export class AddComponent implements OnInit {
  priority: any;
  type: any;
  data: any;
  optionalfirstFormGroup: FormGroup=Object.create(null);
	optionalsecondFormGroup: FormGroup=Object.create(null);
	isOptional = true;
  id :number = 1;

  constructor(private _formBuilder: FormBuilder, private parent: ReclamationComponent, private reclamationService: ReclamationService) { 
  }

  ngOnInit() {
    // optional
    this.optionalfirstFormGroup = this._formBuilder.group({
      description: ['', Validators.required],
    });
    this.optionalsecondFormGroup = this._formBuilder.group({
      type: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  Submit(){
    if(this.optionalfirstFormGroup.valid){
      this.data = {
        description: this.optionalfirstFormGroup.value.description,
        type: this.optionalsecondFormGroup.value.type,
        priorite: this.optionalsecondFormGroup.value.priority
      }
    }
    //console.log("data", this.data);
    this.reclamationService.AddReclamation(1,this.data).subscribe(res => {
      console.log('res',res);
      this.optionalsecondFormGroup.reset();
      this.optionalfirstFormGroup.reset();
    })
    this.parent.tabGroup.selectedIndex = 0;

  };

}
