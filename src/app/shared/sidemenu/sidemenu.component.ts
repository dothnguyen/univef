import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { finalize, map, filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  menuData: any[];

  menuData$: Observable<any>;

  @Input('isCollapse') isCollapsed: boolean;

  constructor(private router: Router, private http: HttpClient) {

  }

  ngOnInit() {

    const router$ = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd),
    );

    this.menuData$ = combineLatest(router$,
      this.http.get("http://localhost:3000/side-menu").pipe(
        map(obj => obj as any[])
      )
    ).pipe(
      map(([_, data]) => {

        // const parentItems = data.filter(
        //   i => i.items && i.items.length > 0
        // );

        // const children = data.filter(i => !i.items || i.items.length == 0);


        // parentItems.map(i => i.selected = false);

        // for (const parent of parentItems) {

        //   parent.selected = false;
        //   parent.items.map(i => i.selected = false);

        //   if (parent.match) {
        //     const reg = new RegExp(parent.match);
        //     const match = reg.test(this.router.url);

        //     if (match) {
        //       parent.selected = true;
        //     }
        //   } else {
        //     if (parent.url === this.router.url)
        //       parent.selected = true;
        //   }

        //   const match = parent.items.filter(i => {

        //     if (i.match) {
        //       const reg = new RegExp(i.match);
        //       return reg.test(this.router.url);
        //     }

        //     return i.url === this.router.url;
        //   });

        //   if (match && match.length > 0) {
        //     match.map(i => i.selected = true);
        //     parent.open = true;
        //   }
        // }

        for(let item of data) {
          this.checkItem(null, item);
        }

        return data;
      }),
    );
  }

  checkItem(parent, item) {
    item.selected = false;
    if (item.items && item.items.length > 0)
      item.open = false;

    if (!item.items || item.items.length == 0) {
      let match = false;
      if (item.match) {
        const reg = new RegExp(item.match);
        match = reg.test(this.router.url);
      } else {
        match = item.url === this.router.url;
      }

      if (match) {
        item.selected = true;
        if (parent) parent.open = true
      }

    } else {
      for (let child of item.items) {
        this.checkItem(item, child);
      }
    }
  }
}
