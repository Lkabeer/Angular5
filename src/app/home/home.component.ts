import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, stagger, keyframes, query, style, transition, animate } from "@angular/animations";
import { DataService } from "../services/data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: .3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))
        ]), {optional: true}),
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item Mahmoud';
  goalText: string = 'My first life goal';
  goals = [];

  constructor(private data: DataService) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this.data.goal.subscribe(res => this.goals = res);
    console.log(this.goals);
    this.data.changeGoal(this.goals);
  }

  addItem() {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this.data.changeGoal(this.goals);
  }

  removeItem(i) {
    this.goals.splice(i, 1);
    this.data.changeGoal(this.goals);
  }
}
