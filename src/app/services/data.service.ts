import { Injectable } from '@angular/core';
import 'devextreme/data/odata/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { mockData } from './mockdata'

@Injectable()
export class DataService {
	private socialMediaInfoData: SocialMediaInfo[] = []
	constructor() {}

	/**
	 * @returns Local Storage'e kaydedilmiş veri varsa onları döndürür yoksa önceden oluşturduğumuz mock datayı döndürür.
	 */
	get():Observable<SocialMediaInfo[]> {
		let localData = this.getLocalStorageData();
		if(localData){
			return of(localData)
		}
		this.socialMediaInfoData = mockData.map(d => new SocialMediaInfo(d)) 
		const returnData = mockData.map(d => new SocialMediaInfo(d))
		return of(returnData)
	}

	/**
	 * Yeni bir sosyal medya eklemeye yarar.
	 * Yeni eklenen bir veriye id atamak için Local storage'de veri var ise onun array length'ini alır, yoksa mock datanın length'ini alır. 
	 * @param newSocialMediaInfo 
	 */
	add(newSocialMediaInfo: ISocialMediaInfo) {
		const localData = this.getLocalStorageData();
		let id = this.socialMediaInfoData.length;
		if(localData){
			id = localData.length
			this.socialMediaInfoData = localData;
		}

		// Yeni bir model oluşturulur
		const created = new SocialMediaInfo({
			id: ++id,
			name: newSocialMediaInfo.name,
			url: newSocialMediaInfo.url,
			description: newSocialMediaInfo.description
		})

		// Mock dataya kayıt yapılır ve verileri stringfy yaparak local storage'e kaydeder.
		this.socialMediaInfoData.push(created)
		localStorage.setItem('socialMediaInfoData',JSON.stringify(this.socialMediaInfoData))
	}

	/**
	 * Local storage'den verinin olup olmadığını sorgular ve varsa verileri parse edip return eder.
	 * @returns 
	 */
	private getLocalStorageData(): SocialMediaInfo[] | null{
		let localData = localStorage.getItem('socialMediaInfoData');
		if(localData){
			let _localdata = JSON.parse(localData);
			_localdata = _localdata.map((f: any)=> new SocialMediaInfo(f))
			return _localdata
		}

		return null;
	}
}

export class SocialMediaInfo implements ISocialMediaInfo {
	id!: number
	url!: string
	name!: string
	description!: string
	
	constructor(details: SocialMediaInfo) {
		Object.assign(this, details);
	}
}
export interface ISocialMediaInfo{
	url: string
	name: string
	description: string
}