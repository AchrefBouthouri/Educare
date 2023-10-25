import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/core/service/token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private router: Router,
    private tokenStorageService: TokenStorageService
  ) {
  }
  logout(): void {
    this.tokenStorageService.signOut();
    setTimeout(() => { this.router.navigate(["/login"]) }, 1000,)
    setTimeout(() => { console.log("logout completed") }, 1000)

  }
}
