import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-characterfilter',
  standalone: true,
  templateUrl: './characterfilter.html',
  styleUrls: ['./characterfilter.css'] // Check this matches your css file name!
})
export class CharacterfilterComponent {
  @Output() houseSelected = new EventEmitter<string>();

  onHouseChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.houseSelected.emit(selectElement.value);
  }
}