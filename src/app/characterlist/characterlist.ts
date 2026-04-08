import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../api';
import { Character } from '../character';
import { CharacterfilterComponent } from '../characterfilter/characterfilter';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-characterlist',
  standalone: true,
  imports: [
    CommonModule, 
    CharacterfilterComponent, 
    RouterLink, 
    MatCardModule, 
    MatToolbarModule, 
    MatButtonModule
  ],
  templateUrl: './characterlist.html',
  styleUrls: ['./characterlist.css']
})
export class CharacterlistComponent implements OnInit {
  characters: Character[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef // 1. Injecting the tool to force screen updates
  ) {}

  ngOnInit(): void {
    this.fetchCharacters('');
  }

  onFilterChanged(house: string): void {
    this.fetchCharacters(house);
  }

  private fetchCharacters(house: string): void {
    if (house === 'nohouse') {
      // Custom logic for "No House"
      this.apiService.getAllCharacters().subscribe({
        next: (data) => {
          // Filter locally: only keep characters where house is an empty string
          this.characters = data.filter(character => !character.house);
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Error fetching characters', err)
      });
    } else if (house) {
      // Standard logic for Gryffindor, Slytherin, etc.
      this.apiService.getCharactersByHouse(house).subscribe({
        next: (data) => {
          this.characters = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Error fetching by house', err)
      });
    } else {
      // Standard logic for "All Houses"
      this.apiService.getAllCharacters().subscribe({
        next: (data) => {
          this.characters = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Error fetching characters', err)
      });
    }
  }
}