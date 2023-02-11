import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private UserService: UserService) { }
  isConnected: boolean = false;
  user: string | undefined = undefined
  loginMethod: string = "login";

  ngOnInit(): void {
    //this.UserService.addUser("hargoze")
    this.user = this.UserService.getUser()
    if (this.user) {
      this.isConnected = true
    }
  }

  setLoginMethod(value: string): void {
    console.log("new login method: " + value)
    this.loginMethod = value
  }

  @ViewChild('username') username?: ElementRef;
  @ViewChild('password') password?: ElementRef;
  @ViewChild('confirm_password') confirm_password?: ElementRef;

  submit(): void {
    let username = this.username!.nativeElement.value
    let password = this.password!.nativeElement.value

    if (!username || !password) {
      alert("please fill the required fields")
      return
    }

    if (this.loginMethod === "register") {
      let confirm_password = this.confirm_password!.nativeElement.value
      if (!username || !password || !confirm_password) {
        alert("please fill the required fields")
        return
      }
      if (password != confirm_password) {
        alert("password and confirm password fields must be the same")
        return
      } else {
        const payload = {
          UserName: username,
          UserPassword: password
        }
        //console.log("payload: ", payload)
        fetch('http://localhost:8080/db/addUser', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
          .then(response => response.json())
          .then(data => {
            this.UserService.addUser(this.username!.nativeElement.value)
            alert("user : " + username + " has been created !")
          }).catch((error) => console.log(error));
      }
    } else if (this.loginMethod === "login") {
      const payload = {
        UserName: username,
        //UserPassword: password
      }
      //console.log("payload: ", payload)
      fetch('http://localhost:8080/db/getUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          //console.log("results is : ", data)
          this.UserService.addUser(this.username!.nativeElement.value)
          this.isConnected = true
          alert("connected as : " + username)
        }).catch((error) => console.log(error));
    }

  }

  logout(): void {
    this.isConnected = false
    this.UserService.removeUser()
  }
}
