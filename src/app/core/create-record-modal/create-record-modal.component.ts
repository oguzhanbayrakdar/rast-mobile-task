import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService, SocialMediaInfo } from '../../services/data.service';

@Component({
	selector: 'app-create-record-modal',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule
	],
	templateUrl: './create-record-modal.component.html',
	styleUrl: './create-record-modal.component.css'
})
export class CreateRecordModalComponent {
	_showModal: { value: boolean } = { value: false };
	@Input()
	set showModal(data: any) {
		this._showModal = {value: data === undefined ? false : data.newValue};
	}
	get showModal(): any {
		return this._showModal;
	}

	@Output() addedRecord = new EventEmitter<SocialMediaInfo>();

	socialMediaForm: FormGroup;

	constructor(private dataService: DataService) {
		this.socialMediaForm = new FormGroup({
			name: new FormControl('', Validators.required),
			url: new FormControl('', Validators.required),
			description: new FormControl('', Validators.required),
		});
	}

	/**
	 * Formu save ettikten sonra bir üst komponente event emit eder ve o komponentte tablo verilerine ekler.
	 */
	saveForm() {
		const isValid = this.socialMediaForm.valid
		if (!isValid) return;

		this.dataService.add(this.socialMediaForm.value)
		this.addedRecord.emit(this.socialMediaForm.value)
		this.socialMediaForm.reset();
		this.closeModal();
	}

	closeModal(): void {
		this.socialMediaForm.reset();
		this.showModal = !this.showModal;
	}

}
