import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatList } from "./componants/chat-list/chat-list";
import { TopBar } from "./componants/top-bar/top-bar";
import { Dashboard } from "./dashboard/dashboard";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('loopinClient');
}
