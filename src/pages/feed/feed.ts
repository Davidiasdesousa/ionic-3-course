import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { concat } from 'rxjs/observable/concat';
import { MovieProvider } from '../../providers/movie/movie';
import { MovieDetailPage } from '../movie-detail/movie-detail';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  moviesList = new Array<any>();
  public page = 1;
  public userName = "Davi Dias"
  public loader;
  public refresher;
  public isRefreshing;
  public infiniteScroll;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movieProvider: MovieProvider,
    public loadingCtrl: LoadingController
  ) {
  }
  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde, carregando..."
    });
    this.loader.present();
  }
  hideLoading() {
    this.loader.dismiss();
  }
  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.loadMovies();

  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.loadMovies(true);
  }

  ionViewDidEnter() {
    this.loadMovies();
  }
  openDetail(id: number) {
    this.navCtrl.push(MovieDetailPage, { movie_id: id });
  }
  loadMovies(newPage: boolean = false) {
    this.presentLoading();
    this.movieProvider.getPopular(this.page).subscribe(data => {
      const response = (data as any).results;
      response.forEach(res => {
        res.poster_path = "https://image.tmdb.org/t/p/w500/" + res.poster_path
        res.backdrop_path = "https://image.tmdb.org/t/p/w500/" + res.backdrop_path
        res.overview = res.overview.substring(0, 90) + "..."
      });
      if (newPage) {
        this.moviesList = this.moviesList.concat(response);
        this.infiniteScroll.complete();
      } else {
        this.moviesList = response;
      }
      this.hideLoading();
      if (this.isRefreshing) {
        this.refresher.complete();
        this.isRefreshing = false;
      }
    }, error => {
      console.log(error);
      this.hideLoading();
    }
    )
  }
}
