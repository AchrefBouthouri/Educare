import { Component, OnInit } from '@angular/core';
import { ForumserviceService } from '../forum/forumservice.service';
import { profile } from '../forum/profile';
import { User } from 'src/app/core/model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup,FormBuilder,FormsModule } from '@angular/forms';

@Component({
  selector: 'make-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
 
  connectedUser: any;
  imageFile!: File;
  biography:string;
  constructor(private router: Router,private forumService: ForumserviceService, private route: ActivatedRoute,private formBuilder: FormBuilder) {
    this.profileForm = this.formBuilder.group({
      biography: '',
    
    });
    
    this.connectedUser = '';
    this.biography ='';
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: { [x: string]: string }) => {
      if (params?.user) {
        this.connectedUser = JSON.parse(params.user);
        console.log(this.connectedUser); // Access the connectedUser object
      } else {
        // Handle the case when the 'user' parameter is missing or undefined
        console.error("'user' parameter is missing");
      }
    });
  }

  createProfile(): void {
    const profile: profile = {
      biography: this.biography,
      idUser :this.connectedUser.id
    };

    this.forumService.createProfile(profile).subscribe(
      (response) => {
        // Profile created successfully
        console.log('Profile created:', response);
        this.router.navigate(['/forum']);
      },
      (error) => {
        // Error occurred while creating profile
        console.error('Error creating profile:', error);
      }
    );
  }

}
