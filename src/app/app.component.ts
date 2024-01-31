import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from "./core/top-menu/top-menu.component";
import { DataGridComponent } from "./core/data-grid/data-grid.component";

@Component({
	selector: 'app-root',
	standalone: true,
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	imports: [
		RouterOutlet,
		TopMenuComponent,
		DataGridComponent,
	]
})
export class AppComponent {
	title = 'rast-mobile-task';
}
