import { Injectable, OnInit } from '@angular/core';
import { Router, PRIMARY_OUTLET, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
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

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root));
  }

  breadcrumbs = [];

  private createBreadcrumbs(route: ActivatedRoute, url: string = '#', breadcrumbs: any[] = []): any[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];
      if (!isNullOrUndefined(label)) {
        breadcrumbs.push({label, url});
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

}
