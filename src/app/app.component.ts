import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { countries, arr, IPerson, ICountry } from './payloads';
import { findIndexes } from './utils/array';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActionManager } from './common/action-manager';
import { interval, Observable, startWith, takeUntil, takeWhile } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // id 1 stands for Poland
  private static readonly DEFAULT_COUNTRY_ID = 1;
  private static readonly DEFAULT_COUNTRY_NAME = 'Poland';
  private static readonly TEST_DATA = [
    1,
    3,
    8,
    4,
    5,
    0,
    6,
    9,
    -5,
    55,
    5.5,
    Infinity,
    NaN,
    12,
    -4,
    -5.2,
    2,
    1,
    8,
    -5,
    -Infinity,
    8,
    3,
    0,
  ];

  foundIndexes: Array<number> = [];
  innerHtmlToDisplay: SafeHtml = '';
  countriesMap: Map<number, ICountry> = new Map<number, ICountry>(
    countries.map(country => [country.id, country])
  );
  #changeDetectorRef = inject(ChangeDetectorRef);
  domSanitizer = inject(DomSanitizer);
  subscriptionOutputs: [Array<string>, Array<string>] = [[], []];

  ngOnInit(): void {
    // task 1
    this.setInnerHtmlToDisplay();
    // task 2
    this.observeActionManagerEvents();
    // task 3
    this.showResultOfFindIndexes();
    this.#changeDetectorRef.detectChanges();
  }

  setInnerHtmlToDisplay(): void {
    const sortedMembers = this.sortMembers(arr);
    this.innerHtmlToDisplay = this.domSanitizer.bypassSecurityTrustHtml(
      this.transformSortedMembersToHtmlList(sortedMembers)
    );
  }

  private sortByAge(curr: IPerson, prev: IPerson): number {
    return curr.birthday.getTime() - prev.birthday.getTime();
  }

  private sortMembers(arr: Array<IPerson>): Array<IPerson> {
    const clonedArray = structuredClone(arr).sort(this.sortByAge);
    clonedArray.forEach(member => {
      if (!Array.isArray(member.children) || !member.children.length) {
        return;
      }

      member.children = this.sortMembers(member.children);
    });

    return clonedArray;
  }

  private transformSortedMembersToHtmlList(
    sortedMembers: Array<IPerson>,
    indentDegree: number = 0
  ): string {
    const listStyleTypes = ['disc', 'circle', 'square'];
    const defaultListStyleType = 'disc';
    let finalInnerHtml = '';
    sortedMembers.forEach((member, index, arr) => {
      if (index === 0) {
        finalInnerHtml += `<ul style="list-style: ${
          listStyleTypes[indentDegree] ?? defaultListStyleType
        }; padding-left: ${indentDegree}rem">`;
      }

      const country =
        this.countriesMap.get(
          member.coundtryId ?? AppComponent.DEFAULT_COUNTRY_ID
        )?.name ?? AppComponent.DEFAULT_COUNTRY_NAME;
      finalInnerHtml += `<li>${member.name} ${member.surname} | ${
        member.street
      } ${member.houseNumber}${
        member.apartmentNumber !== undefined
          ? ' apart. ' + member.apartmentNumber
          : ''
      }, ${member.zipCode} ${member.city}, ${country}</li>`;

      if (Array.isArray(member.children) && member.children.length) {
        finalInnerHtml += this.transformSortedMembersToHtmlList(
          member.children,
          indentDegree + 1
        );
      }

      if (index === arr.length - 1) {
        finalInnerHtml += `</ul>`;
      }
    });
    return finalInnerHtml;
  }

  private observeActionManagerEvents(): void {
    Array(2)
      .fill(void 0)
      .forEach((_, index) => {
        ActionManager.getInstance().subscribe(data => {
          this.subscriptionOutputs[index].push(
            `Event type: ${data.type}, payload: ${data.payload}`
          );
          this.#changeDetectorRef.detectChanges();
        });
      });

    this.dispatchRandomEvents();
  }

  private showResultOfFindIndexes(): void {
    this.foundIndexes = findIndexes(
      AppComponent.TEST_DATA,
      (item: number) => item > 0
    );
  }

  private dispatchRandomEvents(): void {
    let i = 0;
    interval(500)
      .pipe(
        startWith(0),
        takeWhile(() => i < 5)
      )
      .subscribe(() => {
        ActionManager.getInstance().dispatch({
          type: 'debug',
          payload: 'Random data: ' + (Math.random() * 10).toFixed(3),
        });
        i++;
      });
  }
}
