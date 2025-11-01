import { Component } from '@angular/core';
import { TopBar } from "../../componants/top-bar/top-bar";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-mainlayout',
  imports: [TopBar, RouterModule],
  templateUrl: './mainlayout.html',
  styleUrl: './mainlayout.scss',
})
export class Mainlayout {

}
