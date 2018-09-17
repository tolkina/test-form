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
  test: Test;
  error: any;
  result = '';
  checked = false;

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.getTest();
  }


  getTest(): void {
    this.httpService.getTest()
      .subscribe(data => this.test = data,
        error => this.error = error.message);
  }

  checkAnswers() {
    let sum = 0;
    this.test.questions.forEach((question: Question) => {
      if (question.ans.correct) {
        sum++;
      }
    });
    this.result = sum + '/' + this.test.questions.length + ' верно';
    this.checked = true;
  }

  getCorrectAnswer(question: Question) {
    let correctAnswer = '';
    question.answers.forEach((answer: Answer) => {
      if (answer.correct) {
        correctAnswer += (question.answers.indexOf(answer) + 1).toString() + ' ';
      }
    });
    return correctAnswer;
  }

  clear() {
    this.checked = false;
    this.result = '';
    this.test.questions.forEach((question: Question) => question.ans = null);
  }
}
