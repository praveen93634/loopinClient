import { AfterViewChecked, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Socket } from '../../shared/service/socket';
import { SecureStorageService } from '../../shared/service/secure-storage-service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../dashboard/service/user-service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Chatservice } from '../service/chatservice';

@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, CommonModule],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.scss',
})
export class ChatWindow implements OnInit, OnDestroy, AfterViewChecked {
  newMessage: string = '';
  message?: string;
  selectedUser: any = null;
  messages: any[] = [];
  loggedinUserid: any;
  currentuser: any;
  toUserid: any;
  fromuser: any;
  isMine?: boolean;
  private socketSubscription!: Subscription;
  private routeSubscription!: Subscription;

  constructor(
    private socketService: Socket,
    private securestorageservice: SecureStorageService,
    private route: ActivatedRoute,
    private userservice: UserService,
    private chatservice: Chatservice,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
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
      this.getChats()
    });

    // 👇 Listen for new messages
    this.socketSubscription = this.socketService
      .listen('messeageReceived')
      .subscribe((event: any) => {
        console.log('📨 Event received:', event);
        this.ngZone.run(() => {
          this.messages = [...this.messages, event];
        });
        console.log("this message", event)
      });
    // this.cdr.detectChanges();
    document.body.style.overflow = 'hidden';
    this.getAllMyConnections();
  }

  sendMessage() {
    if (!this.message?.trim()) return;
    const data = {
      name: this.currentuser.name,
      Userid: this.loggedinUserid,
      targetid: this.toUserid,
      text: this.message,
    }
    this.socketService.emit('sendMessege', data);
    // this.ngZone.run(() => {
    //   this.messages = [...this.messages, data];
    // });
    this.message = '';
    // this.cdr.detectChanges();
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


  getChats() {
    this.chatservice.getAllchat(this.toUserid).subscribe((res: any) => {
      this.messages = res.result.messages;
      console.log("getAllchat", this.messages)
    })
  }

}
