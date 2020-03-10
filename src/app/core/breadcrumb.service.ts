import { Injectable, OnInit } from '@angular/core';
import { Router, PRIMARY_OUTLET, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, map, pluck, buffer, distinctUntilChanged } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    const navigationEnd$ = this.router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    );

    this.router.events
      .pipe(
        filter(evt => evt instanceof ActivationEnd),
        pluck('snapshot'),
        buffer(navigationEnd$),
        map((bcData: any[]) => bcData.reverse()),
      ).subscribe(data => {

        this.breadcrumbs = [];

        const urls = [];

        for(const snap of data) {

          const url = snap.url;
          const label = snap.data.breadcrumb;
          const skip = snap.data.skip;

          urls.push(...url);

          if (!skip) {

            this.breadcrumbs.push({
              label,
              url: urls.join('/')
            });
          }
        }
      });
  }

  breadcrumbs = [];

}
