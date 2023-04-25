import { Component } from '@angular/core';

export interface Hacker {
  dataSize: number;
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Coding challenge';
  hackers: Hacker[] = [];

  fileChanged(e: any) {
    const file = e.target.files[0];

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      const fileContent = JSON.stringify(fileReader.result)
        .replace('"', '')
        .replace('"', '')
        .split('\\r\\n\\r\\n');

      fileContent.forEach((element, index) => {
        let hackerData = element
          .split('\\r\\n')
          .reduce((total, num) => total + Number(num), 0);

        const hacker = { dataSize: hackerData, id: index };

        this.hackers.push(hacker);
      });

      this.hackers.sort((a, b) => {
        return b.dataSize - a.dataSize;
      });
    };
    fileReader.readAsText(file);
  }

  playSound() {
    let audio = new Audio();
    audio.src = 'assets/gyongyos.mp3';
    audio.load();
    audio.play();
  }
}
