import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('videoEl', { static: true })
  videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('pinContainer', { static: true }) pinRef!: ElementRef<HTMLElement>;
  @ViewChild('stickyEl', { static: true }) stickyRef!: ElementRef<HTMLElement>;

  private duration = 0;
  private fps = 60; // match your encode fps
  private minStep = 1 / this.fps; // ~41.7ms increments
  private lastTime = -1;
  private running = false;
  private visible = true; // toggled by IntersectionObserver
  private primed = false;

  private viewportH = 0;
  private containerTop = 0;
  private containerHeight = 0;

  ngOnInit(): void {
    this.updateMetrics();
    this.observeVisibility();
    this.startLoop();
  }

  ngAfterViewInit(): void {
    // Ensure sources are parsed and ready
    this.videoRef.nativeElement.load();
  }

  ngOnDestroy(): void {
    this.running = false;
  }

  @HostListener('window:resize') onResize() {
    this.updateMetrics();
  }
  @HostListener('window:scroll') onScroll() {
    /* we read scrollY in loop */
  }

  onLoadedMetadata() {
    const v = this.videoRef.nativeElement;
    this.duration = v.duration || 0;
    try {
      v.currentTime = 0.001;
    } catch {}
  }

  onCanPlay() {
    this.syncStickyTopToToolbar();
    this.primeOnce(); // Arc/Chromium needs a user-gesture-ish prime
  }

  private primeOnce() {
    if (this.primed) return;
    this.primed = true;
    const v = this.videoRef.nativeElement;
    v.play()
      .then(() => v.pause())
      .finally(() => this.seekFromScroll());
  }

  private startLoop() {
    if (this.running) return;
    this.running = true;
    const tick = () => {
      if (!this.running) return;
      if (this.visible) this.seekFromScroll();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  private seekFromScroll() {
    const v = this.videoRef.nativeElement;
    if (!this.duration || !this.containerHeight) return;

    const scrollY = window.scrollY || window.pageYOffset;
    const usable = Math.max(1, this.containerHeight - this.viewportH);
    const raw = (scrollY - this.containerTop) / usable;
    const progress = Math.min(Math.max(raw, 0), 1);
    const eased = 1 - Math.pow(1 - progress, 1.3);
    const target = eased * this.duration;

    // Coalesce seeks to frame-size steps
    if (this.lastTime < 0 || Math.abs(target - this.lastTime) >= this.minStep) {
      this.lastTime = target;
      try {
        v.currentTime = target;
        if ('requestVideoFrameCallback' in v) {
          // @ts-ignore
          v.requestVideoFrameCallback(() => {});
        }
      } catch {}
    }
  }

  private updateMetrics() {
    const container = this.pinRef?.nativeElement;
    const toolbar = document.querySelector('mat-toolbar') as HTMLElement | null;
    this.viewportH =
      window.innerHeight || document.documentElement.clientHeight;

    if (container) {
      const rect = container.getBoundingClientRect();
      const pageTop = (window.scrollY || window.pageYOffset) + rect.top;
      this.containerTop = pageTop;
      this.containerHeight = container.offsetHeight;
    }

    const sticky = this.stickyRef?.nativeElement;
    if (sticky) {
      const toolbarH = toolbar
        ? Math.ceil(toolbar.getBoundingClientRect().height)
        : 64;
      sticky.style.top = `${toolbarH}px`;
    }
  }

  private observeVisibility() {
    const container = this.pinRef?.nativeElement;
    if (!('IntersectionObserver' in window) || !container) return;
    const io = new IntersectionObserver(
      (entries) => {
        this.visible = entries.some((e) => e.isIntersecting);
      },
      { root: null, threshold: 0 }
    );
    io.observe(container);
  }

  private syncStickyTopToToolbar() {
    const toolbar = document.querySelector('mat-toolbar') as HTMLElement | null;
    const sticky = this.stickyRef?.nativeElement;
    if (!sticky) return;
    const toolbarH = toolbar
      ? Math.ceil(toolbar.getBoundingClientRect().height)
      : 64;
    sticky.style.top = `${toolbarH}px`;
  }
}
