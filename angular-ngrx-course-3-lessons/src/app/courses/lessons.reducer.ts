import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Course } from './model/course';
import { Lesson } from './model/lesson';
import { CourseActions, CourseActionTypes } from './course.actions';

export interface LessonsState extends EntityState<Lesson> {
  loading: boolean;
}

function sortByCourseAndSeqNo(l1: Lesson, l2: Lesson) {
  const compare = l1.courseId - l2.courseId;

  return compare !== 0
    ? compare
    : l1.seqNo - l2.seqNo;
}

export const adapter: EntityAdapter<Lesson> =
  createEntityAdapter<Lesson>({
    sortComparer: sortByCourseAndSeqNo
  });

const initialLessonsState = adapter.getInitialState({
  loading: false
});

export function lessonsReducer(state = initialLessonsState, action: CourseActions): LessonsState {
  switch (action.type) {
    case CourseActionTypes.LessonsPageCancelled:
      return {
        ...state,
        loading: false
      };

    case CourseActionTypes.LessonsPageRequested:
      return {
        ...state,
        loading: true
      };

    case CourseActionTypes.LessonsPageLoaded:
      return adapter.addMany(action.payload.lessons, { ...state, loading: false });

    default:
      return state;
  }
}

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
