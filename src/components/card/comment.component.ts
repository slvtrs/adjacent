import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../../pages/profile/profile';
import { ShowCardPage } from '../../pages/card/show';
import { WallProvider } from '../../providers/wall/wall';

@Component({
  selector: 'comment-component',
  templateUrl: 'comment-component.html'
})
export class CommentComponent {
  @Input() item: {
    timestamp: any,
    message: string,
    likes?: number[],
    dislikes?: number[],
    score?: number,
  	user: {
      fir_name: string, 
      las_name: string, 
      photo_url: string
    }
  };
  @Input() showVotes: boolean = true;
  vote: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private wall: WallProvider) {}

  ngOnInit() {
    let user_id = 1;
    
    if(!this.item.score)
      this.item.score = 0;

    if(this.item.likes)
      for (let liker_id of this.item.likes)
        if(liker_id == user_id)
          this.vote = 1;
    if(this.item.dislikes)
      for (let disliker_id of this.item.dislikes)
        if(disliker_id == user_id)
          this.vote = -1;
  }

  goToProfile(event, user_id) {
  	event.stopPropagation();
  	this.navCtrl.push(ProfilePage, {
  		user_id: user_id
  	});
  }

  goToComment(event, item) {
    event.stopPropagation();
    this.navCtrl.push(ShowCardPage, {
      item: item
    });
  }

  upvote (e, item) {
    if (this.vote == 1) return;
    e.stopPropagation();
    let user_id = 1;
    let data = {post_id: item.id, card_id: item.card_id, user_id: user_id, score: 1};
    this.wall.vote(data).subscribe(
      success => console.log('like success', success),
      error => console.log(error)
    );
    // dangerous optimism!
    if(this.vote==-1) item.score++;
    this.vote = 1;
    item.score++;
  }

  downvote (e, item) {
    if (this.vote == -1) return;
    e.stopPropagation();
    let user_id = 1;
    let data = {post_id: item.id, card_id: item.card_id, user_id: user_id, score: -1};
    this.wall.vote(data).subscribe(
      success => console.log('dislike success', success),
      error => console.log(error)
    );
    // dangerous optimism!
    if(this.vote==1) item.score--;
    this.vote = -1;
    item.score--;
  }

}
