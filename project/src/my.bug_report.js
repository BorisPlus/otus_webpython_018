'use strict;'
// Just for test Webpack bundling
import { BugReport } from './bug_report';
//
let example_bug_report = new BugReport(
    'example',
    'Патлумачце дадаткова і пакажыце кантактныя дадзеныя, калі хочаце.'
);
//
let my_bug_report = new BugReport(
    'my',
    'Leave a comment and contact to contact you if you want.'
);
// redeclare promptMessage
my_bug_report.promptMessage = 'Yo, put your contact here, bro...'
