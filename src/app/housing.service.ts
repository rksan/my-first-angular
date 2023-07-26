import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  constructor() {}

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    try {
      const data = await fetch(this.url);
      return (await data.json()) ?? [];
    } catch (err) {
      const data = await import('../assets/db.json');
      return data.locations ?? [];
    }
  }

  async getHousingLocationById(
    id: number
  ): Promise<HousingLocation | undefined> {
    try {
      const data = await fetch(`${this.url}/${id}`);
      return (await data.json()) ?? {};
    } catch (err) {
      const data = await import('../assets/db.json');
      const location = data.locations.find((location) => location.id == id);
      return location;
    }
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
