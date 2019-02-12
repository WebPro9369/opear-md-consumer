import { observable, action, computed, extendObservable } from 'mobx';
import { create, persist } from 'mobx-persist';
import { AsyncStorage } from 'react-native';


class ApplicationState {
  constructor(){};

  /*
    Our application global state.
    It's observable, so can be updated with mobx.
  */
  @observable AppGlobalState = {
    SplashShowing : true,
    DemostrationVariable  : false
  }

  @persist('object') @observable persistedUserData = {
	name : 'Some Data',
    count : 0
  };

}

const hydrate = create({
  storage: AsyncStorage, // Choose our storage medium, ensure it's imported above
  jsonify: true  // if you use AsyncStorage, this needs to be true
})

const singleton = new ApplicationState();
export default singleton;

hydrate('persistedUserData', singleton).then(()=>{
	console.log("Hydrated: persistedUserData")
});