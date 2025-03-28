import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('backgroundVideo', { static: false })
  backgroundVideo!: ElementRef<HTMLVideoElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const videoEl = this.backgroundVideo.nativeElement;
      // Ensure the video is muted
      videoEl.muted = true;

      videoEl.addEventListener('canplay', () => {
        videoEl.play().catch(error => {
          console.error('Error attempting to play video:', error);
        });
      });

      // Fallback delay if needed
      setTimeout(() => {
        videoEl.play().catch(error => {
          console.error('Error attempting to play video after delay:', error);
        });
      }, 500);
    }
  }

  playVideo(): void {
    if (isPlatformBrowser(this.platformId)) {
      const videoEl = this.backgroundVideo.nativeElement;
      videoEl.muted = true;
      videoEl.play().catch(error => {
        console.error('Error attempting to play video on user interaction:', error);
      });
    }
  }


}

