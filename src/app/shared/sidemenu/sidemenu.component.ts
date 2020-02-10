import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  menuData: any[];

  @Input('isCollapse') isCollapsed = true;

  constructor(private router: Router) {
    router.events.subscribe(val => {
      this.checkMenuCollapse();
    });
  }

  ngOnInit() {
    this.menuData = [
      {
        name: 'Home',
        url: '/welcome'
      },{
        name: 'Groups',
        url: '/super-admin/groups'
      },
      {
        name: 'User Management',
        open: false,
        items: [
          {
            name: 'Users',
            url: '/super-admin/users'
          }
        ]
      },
      {
        name: 'System Settings',
        open: false,
        items: [
          {
            name: 'System Settings',
            url: '/super-admin/system-settings'
          }
        ]
      }
    ];

    this.checkMenuCollapse();
  }

  checkMenuCollapse() {
    const parentItems = this.menuData.filter(
      i => i.items && i.items.length > 0
    );
    parentItems.forEach(parent => {
      const match = parent.items.filter(i => i.url === this.router.url);
      if (match && match.length > 0) {
        parent.open = true;
        return;
      }
    });
  }
}
