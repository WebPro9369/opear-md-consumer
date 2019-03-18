/* eslint-disable no-param-reassign */
import { types } from "mobx-state-tree";

export const ApplicationStore = types
  .model("ApplicationStore", {
    SplashShowing: types.boolean
  })
  .views(self => ({
    getSplashShowing() {
      return self.SplashShowing;
    }
  }))
  .actions(self => ({
    hideSplash() {
      self.SplashShowing = false;
    }
  }));

// class ApplicationState {
//   constructor() {
//     // TODO: make constructor valid
//     // eslint-disable-next-line no-console
//     console.log("Constructor");
//   }

//   /*
//     Our application global state.
//     It's observable, so can be updated with mobx.
//   */
//   @observable AppGlobalState = {
//     SplashShowing: true,
//     DemostrationVariable: false
//   };

//   @persist("object") @observable persistedUserData = {
//     name: "Some Data",
//     count: 0
//   };
// }

// const hydrate = create({
//   storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
//   jsonify: true // if you use AsyncStorage, this needs to be true
// });

// const singleton = new ApplicationState();
// export default singleton;

// hydrate("persistedUserData", singleton).then(() => {
//   // eslint-disable-next-line no-console
//   console.log("Hydrated: persistedUserData");
// });
