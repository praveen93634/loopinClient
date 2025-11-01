import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Socket } from '../../shared/service/socket';
import { SecureStorageService } from '../../shared/service/secure-storage-service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../dashboard/service/user-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule,CommonModule],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.scss',
})
export class ChatWindow implements OnInit, OnDestroy,AfterViewChecked {
  newMessage: string = '';
  message?: string;
  selectedUser: any = null;
  messages: any[] = [];
  loggedinUserid: any;
  currentuser: any;
  toUserid: any;
  fromuser: any;
  private socketSubscription!: Subscription;
  private routeSubscription!: Subscription;

  constructor(
    private socketService: Socket,
    private securestorageservice: SecureStorageService,
    private route: ActivatedRoute,
    private userservice: UserService
  ) {
    const userid = this.securestorageservice.getItem('user');
    this.loggedinUserid = userid?._id;
    this.currentuser = userid;
  }

  ngOnInit(): void {
    this.socketService.connect();
    // 👇 Listen for query param changes and re-join chat each time
    this.routeSubscription = this.route.queryParams.subscribe((params) => {
      this.toUserid = params['_id'];
      console.log('✅ Target user:', this.toUserid);

      if (this.toUserid && this.loggedinUserid) {
        this.socketService.emit('joinChat', {
          Userid: this.loggedinUserid,
          targetid: this.toUserid,
        });
      }
    });

    // 👇 Listen for new messages
    this.socketSubscription = this.socketService
      .listen('messeageReceived')
      .subscribe((event: any) => {
        console.log('📨 Event received:', event);
        this.messages.push(event);
      });
    document.body.style.overflow = 'hidden';
    this.getAllMyConnections();
  }

  sendMessage() {
    if (!this.message?.trim()) return;
    this.socketService.emit('sendMessege', {
      name: this.currentuser.name,
      Userid: this.loggedinUserid,
      targetid: this.toUserid,
      text: this.message,
    });
    this.message = '';
  }

  getAllMyConnections() {
    this.userservice.getmyconnections().subscribe(
      (res: any) => {
        this.fromuser = res.result[0];
      },
      (err) => console.log(err)
    );
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) this.socketSubscription.unsubscribe();
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    this.socketService.disconnect();
     document.body.style.overflow = 'auto';
  }
ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
  }
}
