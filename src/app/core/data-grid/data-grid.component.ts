import { Component, OnInit } from '@angular/core';
import {
	DxDataGridModule,
	DxBulletModule,
	DxTemplateModule,
	DevExtremeModule,
} from 'devextreme-angular';
import { DataService, ISocialMediaInfo } from '../../services/data.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRecordModalComponent } from '../create-record-modal/create-record-modal.component';
import { SocialMediaInfo } from '../../services/data.service'

@Component({
	selector: 'app-data-grid',
	standalone: true,
	providers: [DataService],
	templateUrl: './data-grid.component.html',
	styleUrl: './data-grid.component.css',
	imports: [
		DxDataGridModule,
		DxTemplateModule,
		DxBulletModule,
		DevExtremeModule,
		ReactiveFormsModule,
		FormsModule,
		CreateRecordModalComponent
	]
})
export class DataGridComponent implements OnInit {
	socialMediaInfoGridData: SocialMediaInfo[] = []
	showPageSizeSelector = true;
	pageSize = 8;
	searchQuery = '';
	showCreateRecordModal: any;

	constructor(private dataService: DataService) { }

	ngOnInit(): void {
		this.dataService.get().subscribe(
			(socialMediaInfoData: SocialMediaInfo[]) => this.socialMediaInfoGridData = socialMediaInfoData
		)
	}

	openCreateRecordModal():void {
		this.showCreateRecordModal = { newValue: true }
	}

	addedRecord(data: ISocialMediaInfo) {
		let newId = this.socialMediaInfoGridData.length
		const newRecord = new SocialMediaInfo({
			id: ++newId,
			name: data.name,
			description: data.description,
			url: data.url
		})
		// Hemen görülebilmesi için veriyi array'in başına yüklüyoruz
		this.socialMediaInfoGridData.unshift(newRecord)
	}
}
