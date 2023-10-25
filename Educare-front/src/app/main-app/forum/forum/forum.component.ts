import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { ForumserviceService } from './forumservice.service';
import { Comment } from './comment';
import { TokenStorageService } from 'src/app/core/service/token/token-storage.service';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/service/user/user.service';
import { profile } from './profile';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
  
})
export class ForumComponent implements OnInit {
  connectedUserinfo: any;
  user: any;
  profile:profile | undefined;
  connectedUser: any;
  public comments: Comment[] = [];
  replyText: string = '';
  subComments :Comment[] = [];
  showSubCommentsFlag = false;
  users: User[]=[];
  constructor(private route: ActivatedRoute, private router: Router,private forumService: ForumserviceService,private authservice :TokenStorageService,private cdr: ChangeDetectorRef,private userservice: UserService) { this.showSubCommentsFlag = false; this.connectedUser = this.authservice.getUser();const { access_token } = this.connectedUser;this.connectedUserinfo=this.userservice.getUserProfile(access_token);}
  
  getComments() {
    this.forumService.retrieveAllComments().subscribe(
      comments => {
        comments = comments;
      },
      error => {
        console.log('Error retrieving comments:', error);
      }
    );
  }
  showSubComments(commentId: number) {
    this.comments.forEach(comment => {
      if (comment.idComm === commentId) {
        comment.showSubCommentsFlag = !comment.showSubCommentsFlag;
        // Toggle the flag for the clicked comment
      } else {
        comment.showSubCommentsFlag = false;
        // Set the flag to false for all other comments
      }
    });
  
    this.forumService.getComment(commentId).subscribe((subComments) => {
      this.subComments = subComments as [];
      console.log(subComments );
    });
  }
  addComment(sujet: string, description: string) {
    this.forumService.ajout(sujet, description,this.connectedUserinfo.id).subscribe(
      data => {
        console.log(data); // check if the comment data is logged
        this.ngOnInit(); // refresh the comments list
      },
      error => console.log(error)
    );
  }
  voteComment(commentId: number, type: string) {
    this.forumService.voteComment(commentId, type).subscribe(
      data => {
        const comment = this.comments.find(comment => comment.idComm === commentId);
        if (comment) {
          comment.upvotes = data?.upvotes;
          comment.downvotes = data?.downvotes;
          this.ngOnInit();
        }
      },
      error => console.log(error)
    );
  }
  toggleReplyInput(commentId: number) {
    const comment = this.comments.find(comment => comment.idComm === commentId);
    if (comment) {
      comment.showReplyInput = !comment.showReplyInput;
      this.replyText = '';
    }
  }
  togglesubReplyInput(commentId: number) {
    const subcomment = this.subComments.find(subcomment => subcomment.idComm === commentId);
    if (subcomment) {
      subcomment.showReplyInput = !subcomment.showReplyInput;
      this.replyText = '';
    }
  }
// In the ForumComponent class
replytocomment( description: string,idparent:number) {
  this.forumService.replyToComment(description, idparent,this.connectedUserinfo.id).subscribe(
    data => {
      console.log(data); // check if the comment data is logged
      this.ngOnInit(); // refresh the comments list
    },
    error => console.log(error)
  );
 }
 getUser() {
  const { access_token } = this.connectedUser; // Replace with the actual access token

  this.userservice.getUserProfile(access_token).subscribe(
    (response) => {
      this.connectedUserinfo  = response;
      console.log(this.connectedUserinfo); // User object retrieved from the API
      // Access the user's access token
      const userAccessToken = this.connectedUserinfo.access_token;
      console.log(userAccessToken);
      this.forumService.getProfileByUserId(this.connectedUserinfo.id)
      .subscribe(
        (profile: profile) => {
          this.profile = profile;
          if (!this.profile) {
            this.router.navigate(['/make-profile']); // Redirect to "make a profile" page
          }
        },
        (error) => {
          const queryParams = {
            user: JSON.stringify(this.connectedUserinfo) // Pass the connectedUser object as a query parameter
          };
          this.router.navigate(['/make-profile'], { queryParams });
          // Handle error
        }
      );
      // Perform further actions with the access token
    },
   

  );
  
}
getProfileByUserId(userId: string) {
  this.forumService.getProfileByUserId(this.connectedUserinfo.id)
    .subscribe(
      (profile: profile) => {
        this.profile = profile;
        if (!this.profile) {
          this.router.navigate(['/make-profile']); // Redirect to "make a profile" page
        }
      },
      (error) => {
        console.error(error);
      }
    );
}
getUsername(userId: number): string {
  const user = this.users.find(user => user.id === userId);
  return user ? user.username : '';
}
fetchUsers() {
  // Logic to fetch users
  this.userservice.getUsers().subscribe(
    (users: User[]) => {
      this.users = users;
    },
    (error) => {
      console.log('Error fetching users:', error);
    }
  );
}
  ngOnInit(): void {
    this.forumService.retrieveAllComments().subscribe(
      data => {
        console.log(data); // check if this logs the comments data
        this.comments = data as [];
        
      },
      error => console.log(error)
    );
    const { access_token } = this.connectedUser;
   this.getUser();
   this.fetchUsers();
 
  }
  
}
