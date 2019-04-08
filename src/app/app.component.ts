import {Component, OnInit} from '@angular/core';
import {HttpService} from './service/http.service';
import {Test} from './domain/test';
import {Question} from './domain/question';
import {Answer} from './domain/title';
import {shuffle} from 'lodash';
import {MatSelectChange} from '@angular/material/typings/select';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  testForm: Test;
  tests = [] as Test[];
  error: any;
  testResult = '';
  testIsChecked = false;
  selected = '2';

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getTest('1');
    this.getTest('2');
  }

  onChangeTest(matSelectChange: MatSelectChange) {
    this.selected = matSelectChange.value;
    this.testForm = this.tests[matSelectChange.value === '1' ? 0 : 1];
    this.clearAnswers();
  }

  getTest(selected: string): void {
    this.httpService.getTest(selected)
      .pipe(first())
      .subscribe(data => {
          this.tests.push(this.shuffleTest(data));
          this.testForm = data;
        },
        error => this.error = error.message);
  }

  shuffleTest(testForm: Test) {
    testForm.questions = shuffle(testForm.questions);
    testForm.questions.forEach(question => question.answers = shuffle(question.answers));
    return testForm;
  }

  checkAnswers() {
    const sum = this.testForm.questions.filter((question: Question) => question.ans.correct).length;
    this.testResult = sum + ' из ' + this.testForm.questions.length + ' верно';
    this.testIsChecked = true;
  }

  getCorrectAnswer(answers: Answer[]) {
    let correctAnswer = '';

    answers.filter((answer: Answer) => answer.correct)
      .forEach((answer: Answer) => correctAnswer += answers.indexOf(answer) + 1 + ' ');

    return correctAnswer;
  }

  clearAnswers() {
    this.testIsChecked = false;
    this.testResult = '';
    this.testForm.questions.map((question: Question) => question.ans = null);
    this.testForm = this.shuffleTest(this.testForm);
  }
}
