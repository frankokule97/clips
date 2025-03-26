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

      // Define a function to play the video
      const playVideo = () => {
        if (videoEl.paused) {
          videoEl.play().catch(error => {
            console.error('Error attempting to play video:', error);
          });
        }
      };

      // Listen for the video being ready to play
      videoEl.addEventListener('canplay', playVideo);

      // As a fallback, try playing after a slight delay (e.g., 500ms)
      setTimeout(() => {
        playVideo();
      }, 500);
    }
  }
}

