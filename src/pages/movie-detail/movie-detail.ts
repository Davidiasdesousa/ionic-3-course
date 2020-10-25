import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
  providers: [MovieProvider]
})
export class MovieDetailPage {
  public movie;
  public loader;
  public refresher;
  public isRefreshing;
  public movieId;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public movieProvider: MovieProvider,
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

  ionViewDidEnter() {
    this.loadMovies();
  }


  loadMovies() {

    this.presentLoading();
    this.movieId = this.navParams.get("movie_id")
    this.movieProvider.getMovieDetail(this.movieId).subscribe(
      data => {
        const response = (data as any);
        response.poster_path = "https://image.tmdb.org/t/p/w500/" + response.poster_path;
        response.backdrop_path = "https://image.tmdb.org/t/p/w500/" + response.backdrop_path
        console.log(response);

        this.movie = response;

        this.hideLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      }, error => {
        console.log(error);
        this.hideLoading();
      });

  }

}
