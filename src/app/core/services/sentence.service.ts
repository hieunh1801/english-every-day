import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import QueryParam from './model/query-param';
import { Sentence } from './model/sentence';
import { map, Observable, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SentenceService {
  baseUrl = environment.backendUrl;

  constructor(private httpClient: HttpClient) {}

  getAllSentences(queryParam: QueryParam = {}): Observable<Sentence[]> {
    const queryString = new URLSearchParams(queryParam as any).toString();
    const url = this.baseUrl + '/sentences?queryString' + queryString;

    return this.httpClient.get<Sentence[]>(url);
  }

  getRandomSentence({ pack }: { pack: number }): Observable<Sentence> {
    const queryParams: RandomSentenceParams = {
      pack: pack,
      _limit: 1,
      _sort: 'repeat',
      _order: 'asc',
    };

    const url =
      this.baseUrl +
      '/sentences?' +
      new URLSearchParams(queryParams as any).toString();
    return this.httpClient
      .get<Sentence[]>(url)
      .pipe(map((sentences) => sentences[0]));
  }

  getSentenceById(id: number) {}
  createSentence(sentence: Sentence) {}
  updateSentence(sentence: Sentence): Observable<Sentence> {
    const url = this.baseUrl + '/sentences/' + sentence.id;
    return this.httpClient.put<Sentence>(url, sentence);
  }
  deleteSentence(id: number) {}
  getMaxPack(): Observable<number> {
    const query: QueryParam = {
      _sort: 'pack',
      _order: 'desc',
      _limit: 1,
    };
    const url =
      this.baseUrl +
      '/sentences?' +
      new URLSearchParams(query as any).toString();
    return this.httpClient
      .get<Sentence[]>(url)
      .pipe(map((sentences) => sentences[0]?.pack));
  }
}

interface RandomSentenceParams extends QueryParam {
  pack?: number;
}
