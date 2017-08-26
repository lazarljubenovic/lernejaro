import {Component, OnInit} from '@angular/core'
import {format} from '../../code/code'

@Component({
  selector: 'lrn-introducing-notebook',
  templateUrl: './introducing-notebook.component.html',
  styleUrls: ['./introducing-notebook.component.scss'],
})
export class IntroducingNotebookComponent implements OnInit {

  public structuralDirectives = {
    noSugar: format`
      <ng-template [ngIf]="!!user">
        <span>Welcome, {{ user.name }}</span>
      </ng-template>
    `,
    partialSugar: format`
      <span template="ngIf !!user">Welcome, {{ user.name }}</span>
    `,
    microSyntax: format`
      <span *ngIf="!!user">Welcome, {{ user.name }}</span>    
    `,
  }

  constructor() {
  }

  ngOnInit() {
  }

}
