import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'lrn-introducing-kvizo',
    templateUrl: './introducing-kvizo.component.html',
    styleUrls: ['./introducing-kvizo.component.scss']
})
export class IntroducingKvizoComponent implements OnInit {

    public answer = null
    public submitted = null

    public regexA = /^\s*a\s*$/i
    public regexZ = /^\s*z\s*$/i

    public isCorrectWord(word: string): boolean {
        return word.length == 9 && word.charAt(0).toLowerCase() == 'l'
    }

    public multipleChoiceAnswer1 = null

    constructor() {
    }

    ngOnInit() {
    }

}
