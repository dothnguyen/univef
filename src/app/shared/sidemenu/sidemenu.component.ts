import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
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
    this.menuData$ = this.http.get("http://localhost:3000/side-menu").pipe(
      map((data: any) => {

        const parentItems = data.filter(
          i => i.items && i.items.length > 0
        );

        parentItems.map(i => i.selected = false);

        for (const parent of parentItems) {

          parent.items.map(i => i.selected = false);

          const match = parent.items.filter(i => {

            if (i.match) {
              const reg = new RegExp(i.match);
              return reg.test(this.router.url);
            }

            return i.url === this.router.url;
          });

          if (match && match.length > 0) {
            match.map(i => i.selected = true);
            parent.open = true;
          }
        }

        return data;
      }),
    );
  }
}
