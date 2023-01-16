import {Component, HostListener, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-miniature-slow-increment-number',
  templateUrl: './miniature-slow-increment-number.component.html',
  styleUrls: ['./miniature-slow-increment-number.component.scss']
})

export class MiniatureSlowIncrementNumberComponent implements OnInit {

  @Input() number = 100;
  initStart = 0;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.startIncrement();
  }

  startIncrement() {
    let timerId = setInterval(() => {
        if(this.initStart > this.number) {
          clearInterval(timerId);
        } else {
          this.initStart++;
        }
      },
      100);
  }

}
