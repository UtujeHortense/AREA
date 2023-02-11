import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  user: string | undefined = undefined

  addUser(user: string) {
    this.user = user
  }

  removeUser() {
    this.user = undefined
  }

  getUser(): string | undefined {
    return this.user
  }
}
