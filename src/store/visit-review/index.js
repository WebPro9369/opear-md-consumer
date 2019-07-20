/* eslint-disable import/no-named-as-default */
/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const VisitReviewStore = types
  .model("VisitReviewStore", {
    id: types.maybeNull(types.number),
    visit_id: types.maybeNull(types.number),
    rating: types.maybeNull(types.number),
    body: types.maybeNull(types.string)
  })
  .actions(self => ({
    clear() {
      self = {
        id: null,
        stars: null,
        body: null
      };
      return self;
    },
    setRating(value) {
      self.rating = value;
      return self;
    },
    setBody(value) {
      self.body = value;
      return self;
    }
  }));

export default VisitReviewStore;
