import { Subject } from 'rxjs';
import {Injectable} from '@angular/core';
import {TestKit} from './testKit.model';

import {HttpClient} from '@angular/common/http';

import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})

export class TestKitsService{
  private testKits: TestKit[] = [];
  private testKitsUpdated = new Subject<TestKit[]>();

  constructor(private http: HttpClient, private router: Router) {}

  // to fetch a post
  getTestKit(id: string){
    //fetch the object from posts array
    return{...this.testKits.find(p => p.id === id)}; //check if post id is equal to id parameter
  }

  // testkitName:string;
  // testKitStock: string;

  getTestKitsUpdateListener(){
    return this.testKitsUpdated.asObservable();
  }

  addTestKit(testKitName: string, testKitStock: string){
    const testKit: TestKit = {id: null, testkitName: testKitName, testKitStock: testKitStock};
    this.http
    .post<{message:string, postId: string}> ('http://localhost:3000/api/testkits', testKit)
    .subscribe((responseData) => {
      const id = responseData.postId;
      testKit.id = id;
      console.log(responseData.message);
      this.testKits.push(testKit);
      this.testKitsUpdated.next([...this.testKits]);
      // this.router.navigate(['/']);
    });
  }

  // to make changes to a testkit and save those changes
  updateTestKit(id: string, testkitname: string, testkitstock:string){
    const testKit: TestKit = {id: id, testkitName: testkitname, testKitStock: testkitstock};
    this.http.put('http://localhost:3000/api/testkits/' + id, testKit)
      .subscribe(response => {
        console.log(response);
        // this.router.navigate(['/']);
      });
  }

  // to retrieve the post
  getTestKits() {
    this.http.get<{message: string, testKits: any}>('http://localhost:3000/api/testkits/')
      .pipe(map((testkitData) => {
        return testkitData.testKits.map(testKit => {
          return {
            testkitName: testKit.testkitName,
            testkitStock: testKit.testkitStock,
            id: testKit._id
          };
        });
      }))
      .subscribe(transformedTestKits => {
        this.testKits = transformedTestKits;
        this.testKitsUpdated.next([...this.testKits]);
      })
  }

  deletePost(testKitId: string){
    this.http.delete('http://localhost:3000/api/testkits/' + testKitId)
    .subscribe(() => {
      const updatedTestkits = this.testKits.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      console.log('Deleted');
    });
  }

}
