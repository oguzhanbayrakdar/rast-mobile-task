import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
		CommonModule
	],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
	show = true;
	leftValue = 'px';

	showSideMenu(){
		this.leftValue = '0px';
	}
	hideSideMenu(){
		this.leftValue = '-100vw'
	}
}
