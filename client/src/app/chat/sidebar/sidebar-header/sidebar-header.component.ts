import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import ISearchParams from '../../../interfaces/search-params.interface';
import IUserFriend from 'src/app/interfaces/user-friend.interface';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar-header.component.html',
  styleUrls: ['./sidebar-header.component.scss']
})
export class SidebarHeaderComponent implements OnInit {

  @Output() searchParams: EventEmitter<ISearchParams> = new EventEmitter();

  private type: string = 'public';
  private searchString: string = '';

  constructor(private userService: UserService) { }

  ngOnInit() { }

  private searchDeeply(): void {
    this.userService.getUsers(this.searchString)
        .subscribe((users: IUserFriend[]) => {
          this.sendSearchParams(users);
        });
  }

  private sendSearchParams(deepResult: IUserFriend[]): void {

    this.searchParams.emit({
      type: this.type,
      string: this.searchString,
      deepResult,
    });
  }
}
