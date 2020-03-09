import { Injectable, OnInit } from '@angular/core';
import { Router, PRIMARY_OUTLET, NavigationEnd, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, map, pluck, buffer, distinctUntilChanged } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .pipe(map(() => this.activatedRoute))
    // .pipe(map((route) => {
    //   while (route.firstChild) { route = route.firstChild; }
    //   return route;
    // }))
    // .pipe(filter(route => route.outlet === PRIMARY_OUTLET))

    // .subscribe(route => {

    //   let snapshot = this.router.routerState.snapshot;
    //   this.breadcrumbs = [];
    //   let url = snapshot.url;
    //   let routeData = route.snapshot.data;

    //   console.log(routeData);

    //   let label = routeData['breadcrumb'];
    //   let params = snapshot.root.params;

    //   // this.breadcrumbs.push({
    //   //   url: url,
    //   //   label: label,
    //   //   params: params
    //   // });

    //   this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute, '', []);

    // });

    // this.router.events
    // .pipe(filter(event => event instanceof NavigationEnd))
    // .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root));

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

          if (!skip) {

            urls.push(...url);

            this.breadcrumbs.push({
              label,
              url: urls.join('/')
            });
          }

          this.breadcrumbs = this.breadcrumbs.filter((item, index) => this.breadcrumbs.indexOf(item) >= index);
        }

        console.log(this.breadcrumbs);
      });
  }

  breadcrumbs = [];

}
