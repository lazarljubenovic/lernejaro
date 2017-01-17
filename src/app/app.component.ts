import {Component} from '@angular/core';
import {Point} from './planimetryts/geometry-objects/point';
import {Line} from './planimetryts/geometry-objects/line';
import {Segment} from './planimetryts/geometry-objects/segment';
import {Circle} from './planimetryts/geometry-objects/circle';
import {Point3D} from './stereometryts/objects/point-3d';
import {MaterialColor} from './planimetryts/geometry-objects/material-colors';

const n = 3;
const colors = [MaterialColor.RED, MaterialColor.GREEN, MaterialColor.BLUE];
let colorIndex = -1;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public points = Array(n).fill(null).map((_, y) => {
        colorIndex++;
        return Array(n).fill(null).map((_, x) => {
            return Array(n).fill(null).map((_, z) => {
                const [i, j, k] = [x - n / 2, y - n / 2, z - n / 2].map(_ => 50 * _);
                return Point3D.FromCartesianCoordinates(i, j, k).strokeColor(colors[colorIndex]);
            });
        }).reduce((acc, curr) => acc.concat(curr), []);
    }).reduce((acc, curr) => acc.concat(curr), []);

    public choices = [
        'red',
        'green',
        'blue',
        'cyan',
        'magenta',
        'yellow',
    ];

    public onAnswerChoose(value: {correct: boolean, answer: string}) {
        this.givenAnswer = value.answer;
        this.correct = value.correct;
    }

    public givenAnswer: string;
    public correct: boolean;

    // public test = {
    //     a: 2,
    //     b: 3,
    //     c: 4,
    // };
    //
    // public n = 1;
    //
    // public point = Point.FromCartesianCoordinates(1, 2);
    // public point2 = Point.FromCartesianCoordinates(2, 1);
    // public line = Line.FromExplicitForm(1, 1);
    // public segment = Segment.FromTwoPoints(this.point, this.point2);
    // public circle = Circle.FromCenterAndRadius(this.point, 3);

    public pointLeft = Point.FromCartesianCoordinates(-100, 0);
    public pointRight = Point.FromCartesianCoordinates(100, 0);
    public segment = Segment.FromTwoPoints(this.pointLeft, this.pointRight);
    public bisector = this.segment.getBisector();

    private slidesText = [
        `It's very easy to make some words **bold**
and other words *italic* with Markdown.
You can even [link to Google](http://google.com)!
`,
        `Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
  - Like this
  - And this
`,
        `If you want to embed images, this is how you do it:

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)
`,
        `# Structured documents

Sometimes it's useful to have different levels
of headings to structure your documents.
Start lines with a \`#\` to create headings.
Multiple \`##\` in a row denote smaller heading sizes.

### This is a third-tier heading

You can use one \`#\` all the way up to \`######\`
six for different heading sizes.

If you'd like to quote someone, use the \`>\`
character before the line:

> Coffee. The finest organic suspension
> ever devised... I beat the Borg with it.
> - Captain Janeway
`,
        `There are many different ways to style code with GitHub's markdown.
If you have inline code blocks, wrap them in backticks:
\`var example = true\`.  If you've got a longer block of code,
you can indent with four spaces:

    if (isAwesome){
      return true
    }

GitHub also supports something called code fencing, which allows
for multiple lines without indentation:

\`\`\`
if (isAwesome){
    return true
}
\`\`\`

And if you'd like to use syntax highlighting, include the language:

\`\`\`javascript
if (isAwesome){
    return true
}
\`\`\`
`,
//         `GitHub supports many extras in Markdown that help you
// reference and link to people. If you ever want to direct
// a comment at someone, you can prefix their name with
// an @ symbol: Hey @kneath — love your sweater!
//
// But I have to admit, tasks lists are my favorite:
//
// - [_x] This is a complete item
// - [ ] This is an incomplete item
//
// When you include a task list in the first comment of an Issue, you will see a helpful progress bar in your list of issues. It works in Pull Requests, too!
//
// And, of course emoji! :sparkles: :camel: :boom:
// `,
    ];

    public slides = this.slidesText.map(text => {
        return {
            text,
            code: '```\n' + text + '\n```',
        };
    })

}
