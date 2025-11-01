import { Component } from '@angular/core';
import { SecureStorageService } from '../../shared/service/secure-storage-service';
import { Router, RouterLink } from "@angular/router";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink,NgbDropdownModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
})
export class TopBar {
   activeItem: string = 'home';
    user?:any;
  setActive(item: string): void {
    this.activeItem = item;
  }
  constructor(private storageservice: SecureStorageService,private router:Router) { }
    ngOnInit(): void {
      this.user=this.storageservice.getItem('user');
      console.log('Logged in user:',this.user);
    }

    logout(){
      this.storageservice.clear();
      this.router.navigate(['/login']);
    }
}
