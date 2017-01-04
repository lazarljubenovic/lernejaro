import {LessonIcon} from '../lesson-navigator/lesson-icon.enum';
import {LessonColor} from '../lesson-navigator/lesson-color.enum';
import {Lesson} from '../lesson-navigator/lesson';

export const LESSONS: Lesson[] = [
    {
        id: '1',
        name: 'Introduction',
        color: LessonColor.Orange,
        icon: LessonIcon.Flask,
        isUnlocked: true,
    },
    {
        id: '2',
        name: 'Markdown',
        color: LessonColor.Green,
        icon: LessonIcon.Circle,
        isUnlocked: true,
    },
    {
        id: '3',
        name: 'Presentation',
        color: LessonColor.Purple,
        icon: LessonIcon.Cog,
    },
    {
        id: '4',
        name: 'Flowcharts',
        color: LessonColor.Blue,
        icon: LessonIcon.Magnet,
        isUnlocked: true,
    },
    {
        id: '5',
        name: 'Tables',
        color: LessonColor.DeepOrange,
        icon: LessonIcon.Lock,
    },
    {
        id: '6',
        name: 'Bitmaps',
        color: LessonColor.LightBlue,
        icon: LessonIcon.Trophy,
    },
    {
        id: '7',
        name: 'Graphs',
        color: LessonColor.Indigo,
        icon: LessonIcon.Wrench,
    },
    {
        id: '8',
        name: 'Networks',
        color: LessonColor.Yellow,
        icon: LessonIcon.Star,
    },
    {
        id: '9',
        name: 'Geometry',
        color: LessonColor.Lime,
        icon: LessonIcon.Flask,
    },
];
