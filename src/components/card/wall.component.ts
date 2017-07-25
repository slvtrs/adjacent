import { Component, Input } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import { WallProvider } from '../../providers/wall/wall';

@Component({
  selector: 'wall-component',
  templateUrl: 'wall-component.html'
})
export class WallComponent {
  @Input() card_id: string;
  // @Input() prependComment: any;
  comments: any[] = [];
  loading: boolean;

  constructor(public http: Http, private wall: WallProvider) {}

  ngOnInit() {
    this.loading = true;
    this.wall.getWall(this.card_id)
      .subscribe(
        comments => {this.comments = comments; console.log(this.comments)},
        error => console.log(error),
        () => this.loading = false
      );
  }

  prependComment(item){
    this.comments.unshift(item);
  }

  doInfinite(e){
    console.log(e);
    setTimeout(function(){
      e.complete();
    }, 1000);
    // this.service.getCard()
    // .subscribe(
    //   data => this.comments.push(...data.results),
    //   err => console.log(err),
    //   () => e.complete()
    // );
  }
}
