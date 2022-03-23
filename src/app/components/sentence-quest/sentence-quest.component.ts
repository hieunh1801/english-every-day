import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Sentence} from 'src/app/core/services/model/sentence';
import {SentenceService} from 'src/app/core/services/sentence.service';

@Component({
  selector: 'app-sentence-quest',
  templateUrl: './sentence-quest.component.html',
  styleUrls: ['./sentence-quest.component.css'],
})
export class SentenceQuestComponent implements OnInit {
  sentence?: Sentence;
  questForm = this.formBuilder.group({
    sentence: [''],
  });

  checkResult?: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sentenceService: SentenceService
  ) {
  }

  ngOnInit(): void {
    this.loadSentence();
  }

  loadSentence(): void {
    this.sentenceService
      .getRandomSentence({pack: 2})
      .subscribe((response) => {
        console.log(response);
        this.sentence = response;
      });
  }

  updateSentence(): void {
    if (this.sentence) {
      this.sentenceService
        .updateSentence({
          ...this.sentence,
          repeat: this.sentence?.repeat + 1,
        }).subscribe((response) => {
        console.log(response);
        this.loadSentence();
      });
    }
  }

  onEnter()
    :
    void {
    console.log(this.questForm.value);
    this.checkResult =
      this.sentence?.english === this.questForm?.value?.sentence;

    if (this.checkResult
    ) {
      setTimeout(() => {
        this.checkResult = undefined;

        this.loadSentence();
      }, 500);
    }
  }
}
