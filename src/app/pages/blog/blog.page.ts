import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.page.html',
	styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
	public postList: Array<any>;
	public html: any;

	constructor() {}

	async ngOnInit() {
		// TODO: don't rely on external source (rss2json) to convert this data
		const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@devavmeister');
		const data = await res.json();
		this.postList = data.items;
		// const posts = resArr.filter(item => item.categories.length > 0); // filter out comments
		// this.html = this.postList[0].content;
	}
}
