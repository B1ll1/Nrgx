import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';

import { AppState } from '../../reducers';
import { PageQuery } from '../course.actions';
import { selectLessonsLoading } from '../course.selectors';
import { Course } from '../model/course';
import { LessonsDataSource } from '../services/lessons.datasource';

@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: [ './course.component.css' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;
  dataSource: LessonsDataSource;
  displayedColumns = [ 'seqNo', 'description', 'duration' ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.course = this.route.snapshot.data[ 'course' ];
    this.dataSource = new LessonsDataSource(this.store);
    this.loading$ = this.store.pipe(select(selectLessonsLoading));

    const initialPage: PageQuery = {
      pageIndex: 0,
      pageSize: 3
    };

    this.dataSource.loadLessons(this.course.id, initialPage);
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(this.loadLessonsPage.bind(this))
      ).subscribe();
  }

  loadLessonsPage() {
    const newPage: PageQuery = {
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };

    this.dataSource.loadLessons(this.course.id, newPage);
  }
}
