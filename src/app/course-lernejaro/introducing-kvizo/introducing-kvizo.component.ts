import {Component, OnInit} from '@angular/core'

@Component({
    selector: 'lrn-introducing-kvizo',
    templateUrl: './introducing-kvizo.component.html',
    styleUrls: ['./introducing-kvizo.component.scss']
})
export class IntroducingKvizoComponent implements OnInit {

    public answer1 = null
    public submitted1 = null

    public answer2 = null
    public submitted2 = null

    public muAnswer = null
    public muSubmitted = null
    public muCorrectAnswer = null
    public muCorrectSubmitted = null
    public muWrongAnswer = null
    public muWrongSubmitted = null

    public regexA = /^\s*a\s*$/i
    public regexZ = /^\s*z\s*$/i

    public isCorrectWord(word: string): boolean {
        return word.length == 9 && word.charAt(0).toLowerCase() == 'l'
    }

    public isPalindrome(word: string): boolean {
        const normalizedWord = word.toLowerCase().split('').filter(x => x != ' ').join('')
        const satisfiesLength = normalizedWord.length > 10
        const isPalindrome = normalizedWord == normalizedWord.split('').reverse().join('')
        return satisfiesLength && isPalindrome
    }

    public multipleChoice1 = {answer: null, submitted: null}


    public whatDoesTheFoxSay = {current: null, submitted: null}

    public t1
    public t2
    public t3
    public t4
    public t = []

    constructor() {
    }

    ngOnInit() {
    }

}
