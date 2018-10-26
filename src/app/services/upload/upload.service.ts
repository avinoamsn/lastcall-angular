import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
	providedIn: 'root'
})
export class UploadService {
	private uploadTask: firebase.storage.UploadTask;
	private basePath = '/uploads';

	constructor(

	) {}

	// executes uploading to firebase
	async pushUpload(upload: any) {
		const storageRef = firebase.storage().ref();
		this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

		// listen to the upload task
		this.uploadTask.on(
			firebase.storage.TaskEvent.STATE_CHANGED,
			(snap) => {
			upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100; // realtime upload status, converted to percentage (for display)
		}, (error) => {
			// upload failed
			console.log(error);
		}, () => {
			// upload success
			upload.url = this.uploadTask.snapshot.downloadURL;
			upload.name = upload.file.name;
			// TODO: write upload info to DB
		});
	}

	// remove file data from db
	private deleteFileData(key: string) {
		return this.db.list(`${this.basePath}/`).remove(key);
	}
}
