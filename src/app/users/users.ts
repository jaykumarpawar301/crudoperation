
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class UsersComponent {

  users: User[] = [
    {
      id: 1,
      name: 'Rahul Patil',
      email: 'rahul@example.com',
      mobile: '9876543210'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya@example.com',
      mobile: '9876501234'
    }
  ];

  user: User = this.emptyUser();
  isEdit = false;
  nextId = 3;

  emptyUser(): User {
    return {
      id: 0,
      name: '',
      email: '',
      mobile: ''
    };
  }

  addUser(): void {
    if (
      !this.user.name.trim() ||
      !this.user.email.trim() ||
      !this.user.mobile.trim()
    ) {
      alert('Please fill all fields');
      return;
    }

    if (this.isEdit) {
      const index = this.users.findIndex(
        u => u.id === this.user.id
      );

      if (index !== -1) {
        this.users[index] = { ...this.user };
      }

      this.isEdit = false;
    } else {
      this.users.push({
        ...this.user,
        id: this.nextId++
      });
    }

    this.user = this.emptyUser();
  }

  editUser(selectedUser: User): void {
    this.user = { ...selectedUser };
    this.isEdit = true;
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(u => u.id !== id);
    }
  }

  cancelEdit(): void {
    this.user = this.emptyUser();
    this.isEdit = false;
  }
}
