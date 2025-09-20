import { Component, AfterViewInit } from '@angular/core';
import { createIcons, icons } from "lucide"; 



@Component({
  selector: 'app-recipients',
  imports: [],
  templateUrl: './recipients.html',
  styleUrl: './recipients.css'
})
export class Recipients implements AfterViewInit {
  ngAfterViewInit() {
    createIcons({ icons });
  }
}