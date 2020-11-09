import { Component, OnInit } from "@angular/core";
import { UserInterface } from "src/app/services/user/interface";
import { UserService } from "src/app/services/user/user.service";

@Component({
  selector: "navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  user: UserInterface;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    UserService.user.subscribe((user: UserInterface) => {
      this.user = user;
    });
  }
}
