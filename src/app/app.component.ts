import {Component, OnInit} from '@angular/core';
import {HttpService} from './service/http.service';
import {Test} from './domain/test';
import {Question} from './domain/question';
import {Answer} from './domain/title';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  testForm: Test;
  error: any;
  testResult = '';
  testIsChecked = false;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getTest();
  }


  getTest(): void {
    this.httpService.getTest()
      .subscribe(data => this.testForm = data,
        error => this.error = error.message);
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
  }
}
