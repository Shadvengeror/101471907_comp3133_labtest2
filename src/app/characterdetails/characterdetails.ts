import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api'; // Adjust this path if your api.ts is in a different folder
import { Character } from '../character'; // Adjust this path too if needed
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-characterdetails',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './characterdetails.html',
  styleUrl: './characterdetails.css',
})
export class CharacterDetailsComponent implements OnInit {
  character: Character | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    // Grab the ID from the URL (e.g., details/856f747e-...)
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.apiService.getCharacterById(id).subscribe({
        next: (data) => {
          // The HP API always returns an array, even for a single ID search
          this.character = data[0]; 
        },
        error: (err) => console.error('Error fetching character details', err)
      });
    }
  }
}