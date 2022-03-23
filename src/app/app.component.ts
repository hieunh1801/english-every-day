import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, concat, Subscription, tap } from 'rxjs';
import { Sentence } from './core/services/model/sentence';
import { SentenceService } from './core/services/sentence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'english-sentences';

  sentenceList$ = new BehaviorSubject<Sentence[]>([]);

  subscriptions$ = new Subscription();

  constructor(private sentenceService: SentenceService) {}

  // maxPack: number;

  ngOnInit(): void {
    this.subscribeSentenceList();
    // this.loadMaxPack();
    this.loadSentenceList();

    this.sentenceService
      .getRandomSentence({ pack: 2 })
      .subscribe((response) => {
        console.log(response);
      });
  }
  ngOnDestroy(): void {
    this.sentenceList$.unsubscribe();
  }

  loadMaxPack(): void {
    this.sentenceService.getMaxPack().subscribe((response) => {
      console.log(response);
    });
  }

  loadSentenceList(): void {
    this.sentenceService.getAllSentences().subscribe((response) => {
      this.sentenceList$.next(response);
    });
  }

  subscribeSentenceList(): void {
    const sub = this.sentenceList$.subscribe((sentenceList) => {
      const updateSubList = [];
      for (const sentence of sentenceList) {
        sentence.repeat = 0;
        sentence.pack = Math.round(sentence.id / 10);
        const updateSub = this.sentenceService.updateSentence(sentence);
        // .pipe(tap(console.log));
        updateSubList.push(updateSub);
      }

      // concat(...updateSubList).subscribe();
    });

    this.subscriptions$.add(sub);
  }
}
